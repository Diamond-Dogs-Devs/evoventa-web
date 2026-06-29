import { FC, useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import cn from 'classnames';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'default'

interface AlertProps{
  className?: string
  message: string
  showIcon?: boolean
  type?: AlertType
  actions?: React.ReactNode
}
const Alert: FC<AlertProps> = ({
  className,
  message,
  showIcon,
  type =  'default',
  actions
}) => {
  const [showAlert, setShowAlert] = useState(true)
  const handleClose = () => {
    setShowAlert(false)
  }
  const rootClassName = cn(
    {
      'bg-background-primaryAlt text-title-primary': type === 'default',
      'bg-success-100 text-title-primary': type === 'success',
      'bg-error-100 text-title-light': type === 'error',
      'bg-warning-100 text-title-primary': type === 'warning',
      'bg-background-secondary text-title-light': type === 'info',
    },
    className
  );
  return (
    showAlert && (

      <div className={`${rootClassName} md:flex md:justify-between p-4 items-center rounded-md overflow-hidden`}>
        <div className="text-sm mb-4 md:mb-0">
          {message}
        </div>
        <div className="flex items-center">
          {actions}
          {showIcon && <button onClick={handleClose} className="ml-4"><XMarkIcon width={14}/></button>}
        </div>
      </div>
    )
  )
}

export default Alert