# Arief & Nadine Wedding Invitation

A modern, interactive wedding invitation web app built with Next.js 16, React 19, Prisma 7, and Neon PostgreSQL.

## Features

- Personalized guest invitations via URL (`/?to=Guest+Name`)
- Animated hero section with countdown timer, parallax, and falling petals
- Our Story timeline
- Masonry photo gallery with lightbox
- Venue location with embedded Google Maps
- Save the Date (ICS calendar download)
- RSVP form with live guest counter
- Wishes / guestbook with like system
- Digital gift section (bank transfer, e-wallet, physical address)
- Background music player with vinyl animation
- Scroll-triggered reveal animations
- Fully responsive (mobile, tablet, desktop)

## Tech Stack

| Layer     | Technology                          |
| --------- | ----------------------------------- |
| Framework | Next.js 16.2 (App Router, Turbopack) |
| Frontend  | React 19, TypeScript 5              |
| Database  | PostgreSQL (Neon Serverless)        |
| ORM       | Prisma 7 with `@prisma/adapter-neon` |
| Styling   | Vanilla CSS (custom properties)     |
| Fonts     | Google Fonts (Great Vibes, Cormorant Garamond, Jost) |

## Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Neon PostgreSQL** account — [console.neon.tech](https://console.neon.tech)

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd wedding
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Neon Postgres — get this from https://console.neon.tech
# Create project > Connection string > copy the pooled connection URL
DATABASE_URL="postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Push database schema

This creates the tables (`Guest`, `Rsvp`, `Wish`) in your Neon database:

```bash
npx prisma db push
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To test with a guest name: [http://localhost:3000/?to=John+Doe](http://localhost:3000/?to=John+Doe)

## Project Structure

```
wedding/
├── prisma/
│   └── schema.prisma          # Database schema (Guest, Rsvp, Wish)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── guests/route.ts   # Guest list management API
│   │   │   ├── rsvp/route.ts     # RSVP submission & counter API
│   │   │   └── wishes/route.ts   # Wishes CRUD & like API
│   │   ├── globals.css           # All styles (CSS custom properties)
│   │   ├── layout.tsx            # Root layout with font loading
│   │   └── page.tsx              # Main page (assembles all sections)
│   ├── components/
│   │   ├── Nav.tsx               # Fixed navbar with mobile burger menu
│   │   ├── Hero.tsx              # Hero with countdown & parallax
│   │   ├── Story.tsx             # Relationship timeline
│   │   ├── Gallery.tsx           # Masonry gallery with lightbox
│   │   ├── Location.tsx          # Venue info & Google Maps embed
│   │   ├── RSVP.tsx              # RSVP form with validation
│   │   ├── Wishes.tsx            # Guestbook with ticker & likes
│   │   ├── Gift.tsx              # Bank cards, QR, e-wallet, address
│   │   ├── MusicPlayer.tsx       # Floating music player
│   │   ├── Footer.tsx            # Footer with animated petals
│   │   └── ScrollReveal.tsx      # Intersection Observer animations
│   ├── generated/prisma/         # Auto-generated Prisma Client (do not edit)
│   └── lib/
│       └── db.ts                 # Prisma singleton instance
├── prisma.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

## API Endpoints

### `GET /api/guests?name=Akbar`
Validate if a guest is on the invite list.

### `POST /api/guests`
Add guest(s): `{ "name": "Akbar" }` or `{ "names": ["Akbar", "Budi", "Citra"] }`

### `DELETE /api/guests?name=Akbar`
Remove a guest from the list.

### `GET /api/rsvp`
Get all RSVPs with confirmed guest count and total attendees.

### `POST /api/rsvp`
Submit RSVP: `{ "name": "...", "phone": "...", "attendance": "hadir", "guests": 2 }`

### `GET /api/wishes`
Get all wishes.

### `POST /api/wishes`
Submit a wish: `{ "name": "...", "message": "..." }`

### `PATCH /api/wishes`
Like/unlike a wish: `{ "id": 1, "action": "like" }` or `{ "id": 1, "action": "unlike" }`

## Customization

### Change couple names & wedding date
- **Couple names**: Edit `Hero.tsx`, `Footer.tsx`, `Nav.tsx`
- **Wedding date**: Edit the `WEDDING_DATE` constant in `Hero.tsx`
- **Venue details**: Edit `Location.tsx`

### Change gift/bank details
- Edit `Gift.tsx` — bank accounts, e-wallet numbers, and physical address

### Add real photos
- Replace the gradient swatches in `Gallery.tsx` with actual `<Image>` tags pointing to your photos in the `/public` folder

## Build for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

1. Push your repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add the `DATABASE_URL` environment variable in Vercel project settings
4. Deploy — Vercel auto-detects Next.js and handles the rest

## License

Private project. All rights reserved.
