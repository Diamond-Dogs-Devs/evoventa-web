import { FC, useEffect, useState } from 'react';

type Currency = 'UF' | 'CLP' | 'USD' | 'EUR' | 'PERCENTAGE';
interface AmountProps {
  className?: string;
  currency: Currency;
  amount: string | number;
  hideCurrency?: boolean;
  decimalCount?: number;
}

function formatAmount(number: number, decimals: number): string {
  const options: Intl.NumberFormatOptions = {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  };

  return new Intl.NumberFormat('es-CL', options).format(number);
}

const Amount: FC<AmountProps> = ({
  className = '',
  currency = 'CLP',
  amount,
  decimalCount = 2,
  hideCurrency,
}) => {
  const [newAmount, setNewAmount] = useState<string>('0');

  useEffect(() => {
    const formattedAmount = formatAmount(amount as number, decimalCount);
    setNewAmount(formattedAmount);
  }, [amount, decimalCount]);

  const valueCurrency: { [P in Currency]: string } = {
    UF: 'UF',
    CLP: '$',
    USD: 'USD',
    EUR: '€',
    PERCENTAGE: '%',
  };
  return (
    <div className={`flex ${className}`}>
      <span>
        {!hideCurrency &&
          `${valueCurrency[currency] !== '%' ? valueCurrency[currency] : ''} `}
        {newAmount}{' '}
        {!hideCurrency &&
          `${valueCurrency[currency] === '%' ? valueCurrency[currency] : ''} `}
      </span>
    </div>
  );
};
export default Amount;
