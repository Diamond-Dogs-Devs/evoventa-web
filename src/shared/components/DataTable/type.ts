import { ReactNode } from "react";

export interface DataColumn<T> {
  key: string;
  title: ReactNode;
  subtitle?: ReactNode;
  /** * Renderiza el valor de la columna. */
  render: (item: T, index: number) => ReactNode;
  /** * Permite ocultar una columna en mobile. * Por defecto todas aparecen dentro del detalle. */
  hideOnMobile?: boolean;
}

export interface DataResponse<T> {
  data: T[];
  total: number;
}

export interface ResponsiveDataTableProps<T> {
  data?: T[];
  columns: DataColumn<T>[];
  /** * Carga los datos de la página solicitada. */
  onLoad?: (page: number, pageSize: number) => Promise<DataResponse<T>>;
  /** * Cantidad de registros por página. */
  pageSize?: number;
  /** * Texto mostrado cuando no hay información. */
  emptyMessage?: ReactNode;
  /** * Skeletons mostrados durante la carga. */
  skeletonRows?: number;
  className?: string;
  /** * Identificador único de cada fila. */
  getRowId?: (item: T, index: number) => string;
  /** * Permite renderizar acciones al final de cada fila. */
  renderActions?: (item: T, index: number) => ReactNode;
}
