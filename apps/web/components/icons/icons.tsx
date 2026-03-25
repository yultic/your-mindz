import React from 'react'

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number | string
}

export function ChildIcon({ size = 112, className, ...props }: IconProps) {
  return (
    <img 
      src="/icons/child1.svg" 
      alt="Niños"
      width={size}
      height={size}
      className={`w-28 h-28 object-contain ${className || ''}`}
      {...props}
    />
  )
}

export function TeenIcon({ size = 112, className, ...props }: IconProps) {
  return (
    <img 
      src="/icons/teenanger.png" 
      alt="Adolescentes"
      width={size}
      height={size}
      className={`w-28 h-28 object-contain ${className || ''}`}
      {...props}
    />
  )
}

export function AdultIcon({ size = 112, className, ...props }: IconProps) {
  return (
    <img 
      src="/icons/adult.svg" 
      alt="Adultos"
      width={size}
      height={size}
      className={`w-28 h-28 object-contain ${className || ''}`}
      {...props}
    />
  )
}
