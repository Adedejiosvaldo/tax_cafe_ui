import { type FC } from 'react'

import { cn } from '@/lib/utils'

import { type ParagraphProps } from './types'
import { PARAGRAPH_SIZES } from './constants'

const Paragraph: FC<ParagraphProps> = ({
  children,
  size = 'body',
  className,
  ...props
}) => {
  return (
    <p className={cn(PARAGRAPH_SIZES[size || 'body'], className)} {...props}>
      {children}
    </p>
  )
}

export default Paragraph
