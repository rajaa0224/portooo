import { useEffect, useRef, useState } from 'react'

/** Scroll-driven two-row image marquee built from the user's own media. */
export default function MarqueeSection({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = ref.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setOffset((window.scrollY - top + window.innerHeight) * 0.3)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  if (images.length === 0) return null

  const half = Math.ceil(images.length / 2)
  const row1 = images.slice(0, half)
  const row2 = images.slice(half).length ? images.slice(half) : row1
  const triple = (arr: string[]) => [...arr, ...arr, ...arr]

  const x1 = offset - 200
  const x2 = -(offset - 200)

  return (
    <section
      ref={ref}
      className="bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: 'clip' }}
    >
      <div className="flex flex-col gap-3">
        <Row images={triple(row1)} x={x1} />
        <Row images={triple(row2)} x={x2} />
      </div>
    </section>
  )
}

function Row({ images, x }: { images: string[]; x: number }) {
  return (
    <div
      className="flex gap-3"
      style={{ transform: `translateX(${x}px)`, willChange: 'transform' }}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          loading="lazy"
          className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
        />
      ))}
    </div>
  )
}
