"use client";

import { ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

// Layout pieces for forms rendered in a side modal
// (`open(<X />, { position: "right" })`). The Formik <Form> should be
// `flex h-full flex-col` and contain Header → Body → Footer, so the header
// and footer stay fixed and only the body scrolls.

export const SidePanelHeader = ({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle?: string;
  onClose: () => void;
}) => (
  <header className="flex items-start justify-between gap-4 border-b border-gray-200 px-6 py-5">
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
    <button
      type="button"
      onClick={onClose}
      className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
      aria-label="Cerrar"
    >
      <XMarkIcon className="h-5 w-5" />
    </button>
  </header>
);

export const SidePanelBody = ({ children }: { children: ReactNode }) => (
  <div className="flex-1 overflow-y-auto px-6 py-6">
    <div className="flex flex-col divide-y divide-gray-200">{children}</div>
  </div>
);

export const SidePanelFooter = ({ children }: { children: ReactNode }) => (
  <footer className="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 px-6 py-4">
    {children}
  </footer>
);

export const FormSection = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <section className="flex flex-col gap-4 py-6 first:pt-0 last:pb-0">
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {title}
      </h3>
      {description && (
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      )}
    </div>
    {children}
  </section>
);
