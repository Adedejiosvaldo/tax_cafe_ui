import { type FC } from 'react'

import { cn } from '@/lib/utils'
import Icon from '@/components/ui/icon'

import { type HeadingProps } from './types'
import { HEADING_SIZES } from './constants'

const Heading: FC<HeadingProps> = ({
  children,
  size,
  fontSize,
  className,
  icon,
  ...props
}) => {
  const HeadingTag = `h${size}` as keyof JSX.IntrinsicElements
  const fontSizeClass = fontSize ? HEADING_SIZES[fontSize] : undefined

  return (
    <HeadingTag
      className={cn(HEADING_SIZES[size], fontSizeClass, className)}
      {...props}
    >
      {icon && <Icon type={icon} size="sm" className="mr-2" />}
      {children}
    </HeadingTag>
  )
}

export default Heading
