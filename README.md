# Envision Architect

Build a complete, single-page React website for **Envision Creations Pty Ltd**, an Australian architecture 
and building design firm. This must be a single .jsx file using React with hooks, Tailwind CSS utility 
classes for layout/spacing, and Framer Motion for ALL animations. No HTML files. No separate CSS files.

---

## TECH STACK
- React (functional components, hooks)
- Framer Motion for ALL animations and transitions
- Tailwind CSS for layout, spacing, and utility classes only
- Google Fonts: "Comfortaa" (headings/logo) and "Nunito" (body) — inject via useEffect into document.head
- Font Awesome via CDN injected into head for icons
- NO color gradients anywhere
- NO Bootstrap, NO jQuery

---

## FRAMER MOTION ANIMATION PHILOSOPHY
Every section and element should feel alive and soft. Use:
- `motion.div` with `whileInView` + `viewport={{ once: true }}` for scroll-triggered reveals
- `initial={{ opacity: 0, y: 40 }}` → `animate/whileInView={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.7, ease: "easeOut" }}`
- Staggered children using `variants` and `staggerChildren: 0.12` on container
- `whileHover={{ scale: 1.03 }}` on gallery images and cards
- `whileHover={{ y: -4 }}` on buttons
- Hero section: elements animate in sequence on mount using `motion` + `delay`
- Header: `useScroll` + `useTransform` to shrink logo size and add shadow on scroll
- Page-load sequence: logo fades in first, then tagline, then hero content staggered
- Gallery images: stagger fade-in as they enter viewport
- Smooth section transitions with subtle parallax on hero background using `useScroll` + `useTransform`
- Process cards: flip or rise in staggered sequence
- All transitions should feel SOFT, SLOW, and ELEGANT — duration 0.6–1.0s, ease "easeOut" or custom bezier

---

## COLOR PALETTE — soft, pale, flat (NO gradients)
Use inline styles or Tailwind for these exact values:
- Page background: #FAF9F7
- Section alt background: #F2EDE8
- Primary accent: #B5A898
- Secondary accent: #D4C5B5
- Text dark: #2C2C2C
- Text mid: #6B6460
- White: #FFFFFF
- Card shadow: 0 8px 32px rgba(0,0,0,0.10)
- WhatsApp green: #25D366

---

## DESIGN RULES
- border-radius: 20px–32px on ALL images, cards, inputs, buttons
- box-shadow: 0 8px 32px rgba(0,0,0,0.10) on all images and cards
- NO color gradients anywhere — flat solid pale colors only
- Comfortaa for all headings, logo, and buttons
- Nunito for all body text, labels, inputs
- Mobile-first responsive: hamburger nav on mobile, full nav on desktop
- Smooth scroll behavior
- Australian architectural aesthetic throughout

---

## COMPONENT STRUCTURE
Build as one default export with these internal components/sections in order:

### 1. HEADER
- Sticky, uses `useScroll` from Framer Motion to detect scroll position
- At top: large centered "ENVISION CREATIONS" logo in Comfortaa ~52px, taupe color
- Tagline below: "Bringing Ideas & Dreams to Life" — Nunito italic
- Nav links below logo: Home | About | Process | Gallery | Services | Contact
- On scroll: logo shrinks (useTransform), padding reduces, soft shadow appears — all Framer animated
- Mobile: hamburger icon toggles nav with Framer `AnimatePresence` slide-down animation

### 2. HERO SECTION
- Full viewport height
- Background image: https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600
  with a rgba(250,249,247,0.42) overlay
- Subtle parallax on background using `useScroll` + `useTransform` (background moves slower than scroll)
- Desktop layout: circular woman portrait on LEFT, text content on RIGHT
  - Portrait image: https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600
  - Portrait style: border-radius 50%, width 280px, border: 4px solid #D4C5B5, shadow
- Text content:
  - Large "Envision Creations" heading — Comfortaa bold
  - Subheading: "Bringing Ideas & Dreams to Life" — Nunito italic
  - Two CTA buttons side by side:
    1. "Book a Consultation" → scrolls to #contact — taupe bg, white text, rounded pill, Framer whileHover
    2. "WhatsApp Us" → opens https://wa.me/61434182035 in new tab — #25D366 bg, white text, pill
- Framer: hero elements animate in sequence on mount with staggered delays

### 3. ABOUT SECTION (id="about")
- Background: #F2EDE8
- Desktop: two columns — left text, right image
- Right image: https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800 — rounded, shadow
- "BDAA Accredited" pill badge — taupe background, white Nunito text
- Heading: "Our Story & Vision" — Comfortaa
- Full copy:
  "Envision Creations is a BDAA Accredited Building Designer Service.
  At Envision Creations, we believe that art and design have the power to inspire and transform.
  We aim to help people bring their creative visions to life.
  Our vision is to redefine design by merging functionality with artistic expression.
  We believe every space should tell a story and reflect the unique identity of its inhabitants."
- ABN: "ABN 99 689 825 036" — small muted text at bottom
- Framer: text slides in from left, image slides in from right on scroll

### 4. PROCESS SECTION (id="process")
- White background
- "Our Process" heading centered — Comfortaa
- 4 cards in a row (2x2 on tablet, 1 col mobile)
- Each card: #FAF9F7 bg, rounded 24px, shadow, Framer stagger whileInView
- Cards:
  1. 🔍 Initial Consultation — "We listen to your vision, lifestyle, and goals."
  2. ✏️ Concept Design — "Modern elevations, bespoke layouts, tailored to you."
  3. 📋 DA/CDC/CC Approvals — "We handle all planning and approval documentation."
  4. 🏗️ Build Support — "We walk the entire journey with you through to build."
- Pull quote below cards (Framer fade-in):
  "Right from initial concept to DA/CDC/CC approval — we walk the journey with you."

### 5. WHAT TO EXPECT SECTION (id="services")
- Background: #F2EDE8
- "What to Expect" heading — Comfortaa centered
- Intro paragraph (Nunito):
  "With in-depth experience in planning and custom home designing, Envision Creations offers modern 
  house elevations, bespoke layouts, and tailored designs suiting individual's unique lifestyle and 
  choices. Every project receives personal attention."
- 3 feature cards with small rounded images:
  - Image 1: https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600
  - Image 2: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600
  - Image 3: https://images.unsplash.com/photo-1600607687939-ce8a6f349de4?w=600
  - Titles: "Modern House Elevations" | "Bespoke Custom Layouts" | "Tailored Lifestyle Design"
- Framer: cards stagger in from below

### 6. GALLERY SECTION (id="gallery")
- White background
- "Our Work" heading — Comfortaa centered
- CSS grid masonry layout: 3 columns desktop, 2 tablet, 1 mobile
- Gallery images are loaded from an array of imported images
- AT THE TOP of the component, define:
```jsx
  // GALLERY IMAGES — replace these imports with actual uploaded images
  // import img1 from './gallery/img1.jpg'
  // import img2 from './gallery/img2.jpg'
  // ... etc
  // For now, render empty placeholder divs with bg #F2EDE8 and a camera icon
  const galleryImages = [] // Populate with imports when images are provided
```
- If galleryImages is empty, render 12 placeholder cards: #F2EDE8 background, rounded-2xl, 
  height 280px, centered camera emoji 📷 and text "Image coming soon"
- When galleryImages has items, render actual <img> tags with rounded corners and shadow
- Framer: staggered whileInView fade-in for each image/card
- whileHover: scale 1.03, shadow deepens

### 7. HOURS & MAP SECTION
- Two columns: left = info card, right = Google Maps embed
- Info card (#F2EDE8, rounded-3xl, shadow):
  - "Visit Us" heading — Comfortaa
  - 📍 7 Casamia Glade, Tallawong NSW 2762, Australia
  - 📞 +61 434 182 035
  - ✉️ sandhya@envisioncreations.com.au
  - 🕐 Mon–Fri, 09:00 am – 06:00 pm
  - "Get Directions" button → links to Google Maps
- Right: Google Maps iframe for the address — border-radius 24px, shadow, height 380px
  src="https://maps.google.com/maps?q=7+Casamia+Glade+Tallawong+NSW+2762&output=embed"
- Framer: card slides from left, map fades in from right

### 8. BOOKING SECTION (id="booking")
- Background: #F2EDE8
- "Book an Appointment" heading — Comfortaa centered
- Subtext: "Schedule a consultation at your convenience."
- Cal.com iframe embed:
```jsx
  


    
  </div>
  // NOTE: Replace src with actual cal.com booking URL
```

### 9. CONTACT SECTION (id="contact")
- White background
- "Get In Touch" heading — Comfortaa centered
- Subtext: "We'd love to hear about your project."
- Desktop: two columns — left = form, right = contact details card
- CONTACT FORM (dummy — JS prevents default, shows success state via React useState):
  - Fields: Full Name, Email, Phone, Project Type (select: New Home | Renovation | Extension | Other), Message
  - All inputs: rounded-2xl, border #D4C5B5, padding 14px, Nunito, focus ring taupe
  - Submit button: full width, taupe bg, white Comfortaa text, rounded-2xl
  - On submit: useState toggles to show:
    `<motion.div>` "✅ Thank you! We'll be in touch soon." — animate in with Framer
  - Add comment: {/* TODO: Wire to Brevo/Sendinblue API */}
- Right contact card (#F2EDE8, rounded-3xl, shadow):
  - All contact details
  - Large WhatsApp button: #25D366, white text, rounded pill, opens wa.me/61434182035 new tab
  - Framer whileHover on all buttons

### 10. FOOTER
- Background: #2C2C2C, white/light text
- 3 columns: (1) Logo + tagline + ABN, (2) Quick nav links, (3) Contact summary
- Bottom bar: "© 2025 Envision Creations Pty Ltd · ABN 99 689 825 036"
- Social icons (Font Awesome): Facebook, Instagram, LinkedIn — taupe, hover white

---

## FINAL REQUIREMENTS
- Single .jsx file, default export
- All Framer animations soft and elegant: duration 0.6–1.0s, easeOut
- Mobile hamburger nav with Framer AnimatePresence
- All images: rounded corners, shadows
- No gradients anywhere
- Real copy throughout — no Lorem Ipsum
- Gallery renders placeholders when images array is empty, real images when populated
- WhatsApp button on BOTH hero and contact section, always opens in new tab
- Inject Google Fonts and Font Awesome into document.head via useEffect

Generate the complete .jsx file now.

I have attacched the large logo and the assets for the gallery

ALso change the favicon of the site to reffelct somethng architect.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ea89cebd-b2e7-4777-be6b-fb8360adf7e9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
