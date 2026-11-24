import { formatMoney } from "@/shared/utils/format";
import { ProfitHintProps } from "../types/product.types";

export const ProfitHint = ({ sale, purchase }: ProfitHintProps) => {
  if (!(sale > 0 && purchase > 0)) return null;

  const profit = sale - purchase;
  const margin = (profit / sale) * 100;
  const positive = profit >= 0;

  return (
    <p
      className={`text-xs rounded-lg px-3 py-2 ${
        positive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
      }`}
    >
      {positive ? "Ganancia" : "Pérdida"} por unidad:{" "}
      <span className="font-semibold">{formatMoney(Math.abs(profit))}</span> (
      {margin.toFixed(1)}% de margen)
    </p>
  );
};
