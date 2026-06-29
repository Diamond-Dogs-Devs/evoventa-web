import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Spinner from '../spinner/spinner';
import cn from 'classnames';

interface CardSecondaryProps {
  className?: string;
  title?: string;
  variant?: 'warning' | 'info' | 'success' | 'danger';
  color?: 'primary' | 'primaryAlt'
  loading?: boolean;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export function CardSecondary({
  className,
  title,
  variant = 'info',
  color = 'primaryAlt',
  children,
  loading,
  actions,
}: CardSecondaryProps) {
  const rootClassName = cn(className, {
    'rounded-xl bg-background-primaryAlt relative': color === 'primaryAlt',
    'rounded-xl bg-background-primary relative': color === 'primary',
  });
  const titleColor = cn(className, {
    'bg-background-secondary text-title-light': variant === 'info',
    'bg-warning-100 text-title-secondary': variant === 'warning',
    'bg-success-100 text-title-secondary': variant === 'success',
    'bg-error-100 text-title-light': variant === 'danger',
  });

  return (
    <div className={`${rootClassName} `}>
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-white/80">
          <i className="pl-2 m-0 flex">
            <Spinner size={'lg'} />
          </i>
        </div>
      )}
      {title && (
        <div className={`flex justify-center text-sm py-3 px-6 rounded-t-xl font-semibold ${titleColor}`}>
          {variant === 'warning' && <ExclamationTriangleIcon className='w-5 mr-2'/>}
          <div className="">
            {title}
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export default CardSecondary;
