import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Couple from '@/components/Couple'
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
import DesktopCover from '@/components/DesktopCover'
import MusicPlayer from '@/components/MusicPlayer'

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { to } = await searchParams
  const guestName = typeof to === 'string' ? to : 'Tamu Undangan'

  return (
    <div className="app-layout">
      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <AnimationInit />

      {/* Desktop: fixed left photo panel */}
      <DesktopCover />

      {/* Main scrollable content (portrait on desktop) */}
      <main className="content-panel">
        <Nav />
        <Hero guestName={guestName} />

        <Couple />

        <Story />

        <ImageDivider
          src="/img/IMG_4290.JPEG"
          alt="Heart in the sand"
          topColor="var(--bg-cream)"
          bottomColor="#FFFFFF"
        />

        <Gallery />

        <ImageDivider
          src="/img/IMG_4199.JPEG"
          alt="Dina by the rocks"
          topColor="#FFFFFF"
          bottomColor="var(--bg-cream)"
        />

        <Location />
        <RSVP guestName={guestName} />

        <ImageDivider
          src="/img/IMG_4299.JPEG"
          alt="Heart in the sand by the sea"
          topColor="#FFFFFF"
          bottomColor="var(--bg-cream)"
          height="50vh"
        />

        <Wishes />
        <Gift />
        <Footer />
      </main>

      <MusicPlayer />
    </div>
  )
}
