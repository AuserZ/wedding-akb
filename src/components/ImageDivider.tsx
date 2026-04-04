'use client'

interface Props {
  src: string
  alt?: string
  topColor: string
  bottomColor: string
  height?: string
  parallax?: boolean
}

export default function ImageDivider({
  src,
  alt = '',
  topColor,
  bottomColor,
  height = '55vh',
  parallax = true,
}: Props) {
  return (
    <div
      className="img-divider"
      style={{ height }}
      data-parallax={parallax ? '' : undefined}
      data-parallax-speed={parallax ? '-3' : undefined}
    >
      <div
        className="img-divider-img"
        style={{ backgroundImage: `url(${src})` }}
        role="img"
        aria-label={alt}
      />
      <div
        className="img-divider-overlay-top"
        style={{ background: `linear-gradient(to bottom, ${topColor}, transparent)` }}
      />
      <div
        className="img-divider-overlay-bottom"
        style={{ background: `linear-gradient(to top, ${bottomColor}, transparent)` }}
      />
    </div>
  )
}
