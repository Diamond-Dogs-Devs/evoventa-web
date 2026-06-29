import { JSXElementConstructor, ReactNode } from 'react';
import cn from 'classnames';

type Variant = 'heading' | 'body' | 'sectionHeading' | 'titleCard' | 'sectionHeadingCard'
export interface HeadingProps {
 variant?: Variant
 className?: string
 children: ReactNode
 color?: 'primary' | 'secondary'
}

export function Heading({
  children,
  variant = 'heading',
  className,
  color
}: HeadingProps) {
  const componentsMap: {
    [P in Variant]: React.ComponentType | string
  } = {
    body: 'div',
    heading: 'h1',
    sectionHeading: 'h2',
    sectionHeadingCard: 'h2',
    titleCard: 'h2'
  }
  const Component:
  | JSXElementConstructor<any>
  | React.ReactElement<any>
  | React.ComponentType<any>
  | string = componentsMap[variant]
  const rootClassName = cn(
    'text-primary-600',
    {
      'text-4xl font-semibold text-title-primary': variant === 'heading',
      'text-lg font-semibold border-b text-center pb-6 mb-6 text-title-secondary': variant === 'titleCard',
      'text-lg font-semibold border-b border-primary-200 py-4 text-title-secondary': variant === 'sectionHeading',
      'text-lg font-semibold py-4 text-title-secondary': variant === 'sectionHeadingCard',
    },
    className
  );
  return (
    <Component className={rootClassName}>{children}</Component>
  );
}

export default Heading;
