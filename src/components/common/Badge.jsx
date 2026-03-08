/**
 * Badge Component
 */

import { cn } from '../../utils'

const variants = {
  default: 'bg-gray-500/20 text-gray-300',
  success: 'bg-green-500/20 text-green-400',
  warning: 'bg-amber-500/20 text-amber-400',
  danger: 'bg-red-500/20 text-red-400',
  info: 'bg-blue-500/20 text-blue-400',
}

export default function Badge({ 
  children, 
  variant = 'default', 
  className,
  ...props 
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
