'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  delay?: number
  useRandom?: boolean
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}

export default function ScrollAnimation({ 
  children, 
  className = '',
  delay = 0,
  useRandom = true,
  direction
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationDirection, setAnimationDirection] = useState<'up' | 'down' | 'left' | 'right' | 'fade'>('up')
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Set random animation direction on component mount
    if (useRandom && !direction) {
      const directions: ('up' | 'down' | 'left' | 'right' | 'fade')[] = ['up', 'down', 'left', 'right', 'fade']
      const randomDirection = directions[Math.floor(Math.random() * directions.length)]
      setAnimationDirection(randomDirection)
    } else if (direction) {
      setAnimationDirection(direction)
    }
  }, [useRandom, direction])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay * 1000)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay])

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all duration-[800ms] ease-out'
    
    if (!isVisible) {
      switch (animationDirection) {
        case 'up':
          return `${baseClasses} opacity-0 translate-y-[60px]`
        case 'down':
          return `${baseClasses} opacity-0 -translate-y-[60px]`
        case 'left':
          return `${baseClasses} opacity-0 translate-x-[60px]`
        case 'right':
          return `${baseClasses} opacity-0 -translate-x-[60px]`
        case 'fade':
          return `${baseClasses} opacity-0`
        default:
          return `${baseClasses} opacity-0 translate-y-[60px]`
      }
    } else {
      return `${baseClasses} opacity-100 translate-y-0 translate-x-0`
    }
  }

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
    >
      {children}
    </div>
  )
} 