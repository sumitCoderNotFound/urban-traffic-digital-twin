import clsx from 'clsx'

function Card({ children, className, glow = false, ...props }) {
  return (
    <div
      className={clsx(
        glow ? 'card-glow' : 'card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ children, className }) {
  return (
    <div className={clsx('flex items-center justify-between mb-4', className)}>
      {children}
    </div>
  )
}

function CardTitle({ children, className }) {
  return (
    <h3 className={clsx('font-display font-semibold text-white', className)}>
      {children}
    </h3>
  )
}

function CardContent({ children, className }) {
  return (
    <div className={clsx(className)}>
      {children}
    </div>
  )
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Content = CardContent

export default Card
