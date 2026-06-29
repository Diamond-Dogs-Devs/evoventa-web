import Spinner from '../spinner/spinner';
import cn from 'classnames';

interface CardProps {
  className?: string;
  titleClassName?: string;
  title?: string | React.ReactNode;
  subtitle?: string;
  description?: string | React.ReactNode;
  variant?: 'default' | 'file';
  loading?: boolean;
  disabled?: boolean;
  color?: 'blue' | 'white';
  children?: React.ReactNode;
  childrenPadding?: string;
  actions?: React.ReactNode;
  semiTransparent?: boolean;
}

export function Card({
  className,
  titleClassName,
  title,
  subtitle,
  description,
  variant = 'default',
  children,
  childrenPadding = 'p-5',
  loading,
  disabled,
  color = 'blue',
  actions,
  semiTransparent = false,
}: CardProps) {
  const rootClassName = cn(className, {
    'rounded-xl bg-white shadow relative': variant === 'default' && !semiTransparent,
    'rounded-xl bg-white/70 shadow relative': variant === 'default' && semiTransparent,
    'rounded-xl bg-ghost-blue-400 shadow relative': variant === 'file',
  });
  const colorHeader = cn(
    {
      'bg-background-secondary text-title-light': color === 'blue',
      'bg-background-primaryAlt text-title-primary border-b border-gray-200': color === 'white',
    },
    titleClassName
  )

  return (
    <div className={`${rootClassName}`}>
      {disabled && 
         <div className="absolute top-0 left-0 w-full h-full z-50 backdrop-grayscale bg-white/50" />
      }
      {loading && (
        <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-white/80">
          <i className="pl-2 m-0 flex">
            <Spinner size={'lg'} />
          </i>
        </div>
      )}
      {title && (
        <div
          className={`flex justify-between text-2xl py-3 px-6 rounded-t-xl ${colorHeader}`}
        >
          <div>
            {title}
            {subtitle && <div className="text-lg">{subtitle}</div>}
            {description && <div className="text-base">{description}</div>}
          </div>
          {actions}
        </div>
      )}
      {!title && actions && (
        <div className="flex justify-end px-5 pt-5">{actions}</div>
      )}
      <div className={childrenPadding}>{children}</div>
    </div>
  );
}

export default Card;
