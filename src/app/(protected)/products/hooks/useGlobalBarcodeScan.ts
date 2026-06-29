import { useEffect, useRef } from 'react';

const INTERACTIVE_TAGS = ['input', 'textarea', 'select'];

export function useGlobalBarcodeScan(
  onScan: (code: string) => void,
  scanTimeout = 100
) {
  const bufferRef = useRef('');
  const lastCharTimeRef = useRef(0);
  const onScanRef = useRef(onScan);
  onScanRef.current = onScan;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? '').toLowerCase();
      const isEditable =
        document.activeElement?.getAttribute('contenteditable') === 'true';

      if (INTERACTIVE_TAGS.includes(tag) || isEditable) return;

      const now = performance.now();

      if (now - lastCharTimeRef.current > scanTimeout) {
        bufferRef.current = '';
      }

      lastCharTimeRef.current = now;

      if (e.key === 'Enter') {
        const code = bufferRef.current.trim();
        bufferRef.current = '';
        if (code) onScanRef.current(code);
        return;
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        bufferRef.current += e.key;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scanTimeout]);
}
