import clsx from 'clsx'

const variants = {
  green: 'bg-traffic-low/20 text-traffic-low border-traffic-low/30',
  amber: 'bg-traffic-medium/20 text-traffic-medium border-traffic-medium/30',
  red: 'bg-traffic-high/20 text-traffic-high border-traffic-high/30',
  gray: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  primary: 'bg-primary-500/20 text-primary-400 border-primary-500/30',
}

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
}

function Badge({ 
  children, 
  variant = 'gray', 
  size = 'md',
  dot = false,
  className 
}) {
  return (
    <span 
      className={clsx(
        'inline-flex items-center gap-1.5 font-medium rounded-full border',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {dot && (
        <span className={clsx(
          'w-1.5 h-1.5 rounded-full',
          variant === 'green' && 'bg-traffic-low',
          variant === 'amber' && 'bg-traffic-medium',
          variant === 'red' && 'bg-traffic-high',
          variant === 'gray' && 'bg-gray-500',
          variant === 'primary' && 'bg-primary-500',
        )} />
      )}
      {children}
    </span>
  )
}

export default Badge
