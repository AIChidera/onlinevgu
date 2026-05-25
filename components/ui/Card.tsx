interface CardProps {
  children: React.ReactNode
  hoverable?: boolean
  className?: string
  as?: keyof JSX.IntrinsicElements
}

export default function Card({
  children,
  hoverable = false,
  className = '',
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={[
        'bg-white border border-neutral-200 rounded-lg p-6',
        hoverable &&
          'transition-[transform,box-shadow,border-color] duration-200 cursor-pointer ' +
            'hover:-translate-y-1 hover:shadow-md hover:border-transparent',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  )
}
