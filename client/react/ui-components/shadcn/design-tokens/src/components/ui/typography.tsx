import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const typographyVariants = cva('text-foreground', {
  variants: {
    variant: {
      // Используем наши новые семантические классы
      h1: 'font-extrabold tracking-tight text-h1',
      h2: 'scroll-m-20 border-b pb-2 text-h2 font-semibold tracking-tight first:mt-0',
      h3: 'scroll-m-20 text-h3 font-semibold tracking-tight',
      p: 'text-p leading-7 [&:not(:first-child)]:mt-6',
      lead: 'text-lead text-muted-foreground',
      large: 'text-large font-semibold',
      small: 'text-small font-medium leading-none',
      muted: 'text-muted text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
})

type VariantPropType = VariantProps<typeof typographyVariants>

const defaultTags: Record<NonNullable<VariantPropType['variant']>, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  p: 'p',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
}

interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  asChild?: boolean
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = 'p', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : defaultTags[variant!] || 'p'

    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }
