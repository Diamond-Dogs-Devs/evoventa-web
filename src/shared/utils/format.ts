/**
 * Display formatting shared by the whole admin, so money and dates read the
 * same everywhere. Locale is es-MX; currency is MXN.
 *
 * formatMoney(10500)        → "$10,500.00"
 * formatNumber(1234.5)      → "1,234.50"
 * formatDate(iso)           → "14 nov 2026"
 * formatDate(iso, "long")   → "14 de noviembre de 2026"
 * formatDateTime(iso)       → "14 nov 2026, 1:09 p.m."
 * formatTime(iso)           → "1:09 p.m."
 */

const LOCALE = "es-MX";

const moneyFormatter = new Intl.NumberFormat(LOCALE, {
  style: "currency",
  currency: "MXN",
});

const numberFormatters = new Map<number, Intl.NumberFormat>();

const dateFormatters = {
  medium: new Intl.DateTimeFormat(LOCALE, { dateStyle: "medium" }),
  long: new Intl.DateTimeFormat(LOCALE, { dateStyle: "long" }),
};

const dateTimeFormatter = new Intl.DateTimeFormat(LOCALE, {
  dateStyle: "medium",
  timeStyle: "short",
});

const timeFormatter = new Intl.DateTimeFormat(LOCALE, { timeStyle: "short" });

type NumberLike = number | string | null | undefined;
type DateLike = Date | string | number | null | undefined;

/** API amounts may arrive as strings (Prisma Decimal); bad values show as 0. */
const toNumber = (value: NumberLike) => {
  const n = Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
};

const toDate = (value: DateLike) => {
  if (value === null || value === undefined || value === "") return null;
  const d = value instanceof Date ? value : new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const formatMoney = (value: NumberLike) =>
  moneyFormatter.format(toNumber(value));

/** Plain number with thousands separators and a fixed number of decimals. */
export const formatNumber = (value: NumberLike, decimals = 2) => {
  let formatter = numberFormatters.get(decimals);
  if (!formatter) {
    formatter = new Intl.NumberFormat(LOCALE, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    numberFormatters.set(decimals, formatter);
  }
  return formatter.format(toNumber(value));
};

/** Missing or invalid dates show as "—". */
export const formatDate = (value: DateLike, style: "medium" | "long" = "medium") => {
  const d = toDate(value);
  return d ? dateFormatters[style].format(d) : "—";
};

export const formatDateTime = (value: DateLike) => {
  const d = toDate(value);
  return d ? dateTimeFormatter.format(d) : "—";
};

export const formatTime = (value: DateLike) => {
  const d = toDate(value);
  return d ? timeFormatter.format(d) : "—";
};
