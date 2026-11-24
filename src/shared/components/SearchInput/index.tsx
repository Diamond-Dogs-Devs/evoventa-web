"use client";

import { useId } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  /** Accessible name and placeholder, e.g. "Buscar por nombre o correo". */
  placeholder: string;
  className?: string;
}

/** Controlled search box with a clear button. Pair it with `useListSearch`. */
export function SearchInput({
  value,
  onChange,
  placeholder,
  className = "",
}: SearchInputProps) {
  const id = useId();

  return (
    <div className={`relative w-full sm:w-80 ${className}`}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
        aria-hidden
      />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape" && value) onChange("");
        }}
        placeholder={placeholder}
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-gray-300 bg-white pl-10 pr-9 text-sm text-gray-900 shadow-xs transition-colors placeholder:text-gray-400 hover:border-gray-400 focus:border-background-secondary focus:outline-none focus:ring-2 focus:ring-background-secondary/15 [&::-webkit-search-cancel-button]:hidden"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-700"
        >
          <XMarkIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
