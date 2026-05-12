import { Activity } from 'lucide-react'
import { cn } from './lib/utils'

type BrandMarkSize = 'sm' | 'lg'

type BrandMarkProps = {
  size?: BrandMarkSize
  productName?: string
  className?: string
}

export function BrandMark({
  size = 'lg',
  productName,
  className,
}: BrandMarkProps) {
  const isSmall = size === 'sm'

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground',
          isSmall ? 'h-7 w-7' : 'h-8 w-8',
        )}
      >
        <Activity className={isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      </div>

      <div className="flex min-w-0 flex-col justify-center">
        <div
          className={cn(
            'font-bold',
            isSmall ? 'text-base leading-4' : 'text-lg leading-5',
          )}
        >
          Medix
        </div>
        {productName ? (
          <div
            className={cn(
              'mt-0.5 font-medium leading-3 text-muted-foreground',
              isSmall ? 'text-[0.625rem]' : 'text-[0.6875rem]',
            )}
          >
            {productName}
          </div>
        ) : null}
      </div>
    </div>
  )
}
