import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Gallery from '@/components/Gallery'
import Location from '@/components/Location'
import RSVP from '@/components/RSVP'
import Wishes from '@/components/Wishes'
import Gift from '@/components/Gift'
import Footer from '@/components/Footer'
import Preloader from '@/components/Preloader'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import AnimationInit from '@/components/AnimationInit'
import ImageDivider from '@/components/ImageDivider'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { to } = await searchParams
  const guestName = typeof to === 'string' ? to : 'Tamu Undangan'

  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <AnimationInit />

      <Nav />
      <Hero guestName={guestName} />

      <Story />

      <ImageDivider
        src="/img/divider1.jpg"
        alt="Romantic couple"
        topColor="var(--bg-cream)"
        bottomColor="#FFFFFF"
      />

      <Gallery />

      <ImageDivider
        src="/img/divider2.jpg"
        alt="Wedding celebration"
        topColor="#FFFFFF"
        bottomColor="var(--bg-cream)"
      />

      <Location />
      <RSVP guestName={guestName} />

      <ImageDivider
        src="/img/divider3.jpg"
        alt="Beautiful scenery"
        topColor="#FFFFFF"
        bottomColor="var(--bg-cream)"
        height="50vh"
      />

      <Wishes />
      <Gift />
      <Footer />
    </>
  )
}
