"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import { fetcher } from "../api";

import "react-toastify/dist/ReactToastify.css";

type Props = {
  children: ReactNode;
};

export default function SWRProvider({ children }: Props) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      {children}
      <ToastContainer />
    </SWRConfig>
  );
}
