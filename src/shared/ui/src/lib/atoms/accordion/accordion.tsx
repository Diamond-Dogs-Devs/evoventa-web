import { FC, ReactNode, useEffect, useState } from 'react';
import cn from 'classnames';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Spinner from '../spinner/spinner';

type Variant = 'default' | 'big';

interface AccordionProps {
  title?: string | ReactNode;
  description?: string;
  variant?: Variant;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  loading?: boolean;
  contentClassName?: string;
  collapse?: boolean;
  onOpenCollapse?: () => void;
  onCloseCollapse?: () => void;
}

const Accordion: FC<AccordionProps> = ({
  title,
  description,
  children,
  className,
  titleClassName,
  contentClassName,
  variant = 'default',
  collapse = false,
  loading = false,
  onOpenCollapse,
  onCloseCollapse,
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (collapse) {
      setIsActive(true);
      onOpenCollapse && onOpenCollapse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse]);

  const classVariant: { [P in Variant]: string } = {
    default: 'border-b border-light-gray-200 text-primary-600text-lg',
    big: 'text-primary-600 text-lg',
  };

  const rootClassName = cn(
    'flex justify-between py-4 mb-2 items-center font-semibold',
    className,
    classVariant[variant]
  );

  const handleClickCollapse = () => {
    if (isActive) {
      setIsActive(false);
      onCloseCollapse && onCloseCollapse();
    } else {
      setIsActive(true);
      onOpenCollapse && onOpenCollapse();
    }
  };

  if (!children) {
    return (
      <div className={rootClassName}>
        <div className="text-blue-600 font-semibold text-sm">{title}</div>
      </div>
    );
  }

  return (
    <>
      <div
        className={`${rootClassName} cursor-pointer`}
        onClick={handleClickCollapse}
      >
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center bg-white/80">
            <i className="pl-2 m-0 flex">
              <Spinner size={'lg'} />
            </i>
          </div>
        )}
        <div className={`flex justify-between w-full ${titleClassName}`}>
          {typeof title === 'string' ? <span>{title}</span> : title}
          <div className="flex gap-6 items-center">
            {description}
            <ChevronDownIcon
              className={`flex-shrink-0 h-5 w-5 text-gray-400 transition-all ${
                isActive ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {children && isActive && (
        <div className={contentClassName}>{children}</div>
      )}
    </>
  );
};

export default Accordion;
