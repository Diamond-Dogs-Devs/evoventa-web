import { ReactNode } from "react";

export type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode | ReactNode[];
};
