/**
 * Card Component
 */

import { cn } from '../../utils'

export default function Card({ children, className, glow = false, ...props }) {
  return (
    <div
      className={cn(
        'bg-dark-card border border-dark-border rounded-2xl overflow-hidden',
        glow && 'shadow-lg shadow-primary/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
