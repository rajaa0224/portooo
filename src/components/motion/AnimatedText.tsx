import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
}

/** Each character brightens from 0.2 → 1 opacity as it scrolls through view. */
export default function AnimatedText({ text, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })

  const chars = text.split('')
  return (
    <p ref={ref} className={className} style={style}>
      {chars.map((char, i) => {
        const start = i / chars.length
        const end = start + 1 / chars.length
        return (
          <Char key={i} range={[start, end]} progress={scrollYProgress}>
            {char}
          </Char>
        )
      })}
    </p>
  )
}

function Char({
  children,
  range,
  progress,
}: {
  children: string
  range: [number, number]
  progress: MotionValue<number>
}) {
  const opacity = useTransform(progress, range, [0.2, 1])
  return (
    <span style={{ position: 'relative' }}>
      <span style={{ opacity: 0.2 }}>{children}</span>
      <motion.span style={{ position: 'absolute', left: 0, top: 0, opacity }}>
        {children}
      </motion.span>
    </span>
  )
}
