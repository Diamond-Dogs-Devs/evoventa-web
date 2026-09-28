import { ReactNode } from "react";

export interface DashboardCardProps {
  title?: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}
