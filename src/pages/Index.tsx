import { useState, useEffect, useRef, FormEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import logoImg from "@/assets/logo.webp";
import galleryImg1 from "@/assets/gallery1.webp";

/* ─── font & icon injection ─── */
const useInjectHead = () => {
  useEffect(() => {
    const gf = document.createElement("link");
    gf.rel = "stylesheet";
    gf.href =
      "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;1,400&display=swap";
    document.head.appendChild(gf);

    const fa = document.createElement("link");
    fa.rel = "stylesheet";
    fa.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
    document.head.appendChild(fa);

    return () => {
      document.head.removeChild(gf);
      document.head.removeChild(fa);
    };
  }, []);
};

/* ─── constants ─── */
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const PROCESS_STEPS = [
  { num: "01", title: "Consultation", desc: "We listen to your vision, understand your lifestyle, and define your goals together." },
  { num: "02", title: "Concept Design", desc: "Modern elevations, bespoke layouts, and spatial concepts tailored entirely to you." },
  { num: "03", title: "Approvals", desc: "DA, CDC, and CC — we handle all planning documentation and council approvals." },
  { num: "04", title: "Build Support", desc: "From groundbreaking to handover, we walk the entire journey with you." },
];

const SERVICE_CARDS = [
  { img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800", title: "Modern Elevations", desc: "Contemporary facades that command attention and complement their surroundings." },
  { img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800", title: "Bespoke Layouts", desc: "Every room, corridor, and threshold designed around your daily rituals." },
  { img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800", title: "Lifestyle Design", desc: "Spaces that adapt to how you live — functional, beautiful, and unmistakably yours." },
];

const galleryImages = [galleryImg1];

/* ─── animation variants ─── */
const ease = [0.25, 0.1, 0.25, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const slideIn = (dir: "left" | "right") => ({
  hidden: { opacity: 0, x: dir === "left" ? -50 : 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
});

/* ═══════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════ */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <>
      {/* Large logo banner — white bg */}
      <div className="bg-card flex items-center justify-center py-6 sm:py-8 md:py-10">
        <a href="#">
          <img
            src={logoImg}
            alt="Envision Creations"
            className="h-16 sm:h-24 md:h-36 object-contain"
          />
        </a>
      </div>

      {/* Sticky nav bar */}
      <motion.nav
        className="sticky top-0 left-0 w-full z-50"
        style={{
          backgroundColor: useTransform(headerBg, (v) => `hsla(30,10%,98%,${0.85 + v * 0.15})`),
          backdropFilter: useTransform(headerBg, (v) => `blur(${v * 16}px)`),
          borderBottom: useTransform(headerBg, (v) => `1px solid hsla(30,10%,86%,${v * 0.5})`),
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-center relative">
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-heading text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {l.label}
              </a>
            ))}
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="#contact"
              className="font-heading text-xs tracking-[0.15em] uppercase px-5 py-2 rounded bg-accent text-accent-foreground"
            >
              Enquire
            </motion.a>
          </div>

          <button
            className="lg:hidden absolute right-4 sm:right-6 w-10 h-10 flex items-center justify-center text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"} text-xl`} />
          </button>
          <span className="lg:hidden font-heading text-xs tracking-[0.2em] uppercase text-foreground">Menu</span>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="lg:hidden overflow-hidden border-t border-border"
            >
              <div className="flex flex-col items-center gap-5 py-6 bg-background">
                {NAV_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="font-heading text-sm tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  className="font-heading text-sm tracking-[0.15em] uppercase px-8 py-3 rounded bg-accent text-accent-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  Enquire
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 200]);

  return (
    <section className="relative min-h-[calc(100vh-5.5rem)] sm:min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-theme(spacing.36)-theme(spacing.12))] overflow-hidden flex">
      {/* Left side — text content on dark */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10 md:px-16 lg:px-20 py-16 sm:py-20 bg-ec-dark">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-6 sm:left-10 md:left-16 lg:left-20 top-16 sm:top-20 w-px h-12 sm:h-16 bg-primary origin-top"
        />

        <motion.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="font-heading text-xs sm:text-sm tracking-[0.25em] uppercase text-primary mb-6 sm:mb-8 mt-10 sm:mt-12"
        >
          Envision Creations
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-heading font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white leading-[1.1] mb-8 sm:mb-10"
        >
          Bringing
          <br />
          <span className="italic font-normal text-primary">Ideas &amp; Dreams</span>
          <br />
          to Life
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          <motion.a
            whileHover={{ y: -2 }}
            href="#contact"
            className="font-heading text-xs tracking-[0.15em] uppercase px-6 sm:px-8 py-3.5 rounded bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 text-center"
          >
            Start Your Project
          </motion.a>
          <motion.a
            whileHover={{ y: -2 }}
            href="https://wa.me/61434182035"
            target="_blank"
            rel="noopener noreferrer"
            className="font-heading text-xs tracking-[0.15em] uppercase px-6 sm:px-8 py-3.5 rounded bg-whatsapp text-white transition-all duration-300 hover:opacity-90 text-center"
          >
            <i className="fa-brands fa-whatsapp mr-2" />
            WhatsApp Us
          </motion.a>
        </motion.div>
      </div>

      {/* Right side — full image (tablet+) */}
      <motion.div
        className="hidden md:block w-1/2 lg:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)",
          y: bgY,
        }}
      />

      {/* Mobile background image with gradient overlay */}
      <div className="md:hidden absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80)",
            y: bgY,
          }}
        />
        <div className="absolute inset-0 bg-ec-dark/85" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 md:left-16 lg:left-20 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════ */
const About = () => (
  <section id="about" className="py-16 sm:py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          variants={slideIn("left")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary mb-4 sm:mb-6 block">
            About Us
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-6 sm:mb-8 leading-tight">
            Design with
            <br />purpose &amp; precision
          </h2>
          <div className="font-body text-muted-foreground space-y-4 sm:space-y-5 leading-relaxed text-sm sm:text-[15px]">
            <p>
              Envision Creations is a BDAA Accredited Building Designer Service.
              We believe that architecture has the power to shape how people live,
              feel, and connect with their environment.
            </p>
            <p>
              Our vision is to redefine residential design by merging functionality
              with artistic expression — every space should tell a story and reflect
              the unique identity of its inhabitants.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
            <span className="inline-block font-heading text-[10px] tracking-[0.2em] uppercase px-4 py-2 rounded bg-muted text-muted-foreground">
              BDAA Accredited
            </span>
            <span className="font-body text-xs text-muted-foreground">
              ABN 99 689 825 036
            </span>
          </div>
        </motion.div>

        <motion.div
          variants={slideIn("right")}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
            alt="Modern architectural design"
            className="w-full h-64 sm:h-80 md:h-[420px] lg:h-[500px] object-cover rounded-lg"
          />
          {/* Decorative offset frame — hidden on mobile to prevent overflow */}
          <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full border border-primary/30 rounded-lg -z-10" />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   PROCESS
   ═══════════════════════════════════════════════ */
const Process = () => (
  <section id="process" className="py-16 sm:py-20 md:py-32 bg-accent">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-16"
      >
        <span className="font-heading text-xs tracking-[0.3em] uppercase text-accent-foreground/50 block mb-3 sm:mb-4">
          How We Work
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-accent-foreground">
          Our Process
        </h2>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-accent-foreground/10 rounded-lg overflow-hidden"
      >
        {PROCESS_STEPS.map((s) => (
          <motion.div
            key={s.num}
            variants={fadeUp}
            className="bg-accent p-5 sm:p-8 group"
          >
            <span className="font-heading text-2xl sm:text-3xl font-bold text-accent-foreground/15 block mb-3 sm:mb-4 group-hover:text-primary-foreground/40 transition-colors duration-500">
              {s.num}
            </span>
            <h3 className="font-heading font-semibold text-accent-foreground text-xs sm:text-sm tracking-wide uppercase mb-2 sm:mb-3">
              {s.title}
            </h3>
            <p className="font-body text-accent-foreground/60 text-xs sm:text-sm leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-body italic text-accent-foreground/50 text-center mt-8 sm:mt-14 text-sm sm:text-base max-w-2xl mx-auto"
      >
        "From initial concept to council approval — we walk the journey with you."
      </motion.p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════ */
const Services = () => (
  <section id="services" className="py-16 sm:py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-10 sm:mb-16"
      >
        <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary block mb-3 sm:mb-4">
          What We Offer
        </span>
        <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-5">
          What to Expect
        </h2>
        <p className="font-body text-muted-foreground max-w-2xl mx-auto text-sm sm:text-[15px] leading-relaxed">
          With in-depth experience in planning and custom home design, every project
          receives our full attention — from bespoke floor plans to modern elevations.
        </p>
      </motion.div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
      >
        {SERVICE_CARDS.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden rounded-lg mb-4 sm:mb-5">
              <motion.img
                src={c.img}
                alt={c.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 className="font-heading font-semibold text-foreground text-xs sm:text-sm tracking-wide uppercase mb-2">
              {c.title}
            </h3>
            <p className="font-body text-muted-foreground text-xs sm:text-sm leading-relaxed">
              {c.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════ */
const GALLERY_IMAGES = [
  galleryImg1,
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
  "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80",
];

const Gallery = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    const next = dir === "left"
      ? Math.max(0, activeIdx - 1)
      : Math.min(GALLERY_IMAGES.length - 1, activeIdx + 1);
    setActiveIdx(next);
  };

  useEffect(() => {
    if (thumbRef.current) {
      const thumb = thumbRef.current.children[activeIdx] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeIdx]);

  return (
    <section id="gallery" className="py-16 sm:py-20 md:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary block mb-3 sm:mb-4">
            Portfolio
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-foreground">
            Our Work
          </h2>
        </motion.div>

        {/* Main image with nav arrows */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mb-4 sm:mb-6"
        >
          <div className="relative overflow-hidden rounded-lg bg-background aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={GALLERY_IMAGES[activeIdx]}
                alt={`Project ${activeIdx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Image counter badge */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-ec-dark/70 backdrop-blur-sm text-white text-xs font-heading px-3 py-1.5 rounded-full">
              {activeIdx + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>

          {/* Left / Right arrows */}
          <button
            onClick={() => scroll("left")}
            disabled={activeIdx === 0}
            className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-card transition disabled:opacity-30 active:scale-95"
          >
            <i className="fa-solid fa-chevron-left text-xs sm:text-sm" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={activeIdx === GALLERY_IMAGES.length - 1}
            className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-card transition disabled:opacity-30 active:scale-95"
          >
            <i className="fa-solid fa-chevron-right text-xs sm:text-sm" />
          </button>
        </motion.div>

        {/* Thumbnail strip */}
        <div className="overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          <div ref={thumbRef} className="flex gap-1.5 sm:gap-2 justify-start sm:justify-center min-w-max sm:min-w-0">
            {GALLERY_IMAGES.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`shrink-0 w-16 h-11 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded overflow-hidden border-2 transition-all duration-300 ${
                  i === activeIdx ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img src={src} alt={`Thumb ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   HOURS & MAP
   ═══════════════════════════════════════════════ */
const HoursMap = () => (
  <section className="py-24 md:py-32">
    <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
      <motion.div
        variants={slideIn("left")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-muted rounded-lg p-10"
      >
        <h2 className="font-heading font-bold text-2xl text-foreground mb-8">Visit Us</h2>
        <div className="font-body text-muted-foreground space-y-4 text-sm">
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-location-dot text-primary mt-0.5" />
            <span>7 Casamia Glade, Tallawong NSW 2762, Australia</span>
          </div>
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-phone text-primary mt-0.5" />
            <span>+61 434 182 035</span>
          </div>
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-envelope text-primary mt-0.5" />
            <span>sandhya@envisioncreations.com.au</span>
          </div>
          <div className="flex items-start gap-3">
            <i className="fa-solid fa-clock text-primary mt-0.5" />
            <span>Mon – Fri, 9:00 am – 6:00 pm</span>
          </div>
        </div>
        <motion.a
          whileHover={{ y: -2 }}
          href="https://maps.google.com/?q=7+Casamia+Glade+Tallawong+NSW+2762"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 font-heading text-xs tracking-[0.15em] uppercase px-6 py-3 rounded-md bg-accent text-accent-foreground transition-colors"
        >
          Get Directions
        </motion.a>
      </motion.div>

      <motion.div
        variants={slideIn("right")}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <iframe
          title="Envision Creations Location"
          src="https://maps.google.com/maps?q=7+Casamia+Glade+Tallawong+NSW+2762&output=embed"
          className="w-full rounded-lg"
          style={{ height: 420, border: 0 }}
          loading="lazy"
          allowFullScreen
        />
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   BOOKING
   ═══════════════════════════════════════════════ */
const Booking = () => (
  <section id="booking" className="py-24 md:py-32 bg-muted">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary block mb-4">
          Schedule
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
          Book a Consultation
        </h2>
        <p className="font-body text-muted-foreground text-[15px]">
          Schedule a time that works for you.
        </p>
      </motion.div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-lg overflow-hidden bg-card"
      >
        {/* NOTE: Replace src with actual cal.com booking URL */}
        <iframe
          title="Book Appointment"
          src="https://cal.com"
          className="w-full"
          style={{ height: 600, border: 0 }}
          loading="lazy"
        />
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════ */
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    /* TODO: Wire to Brevo/Sendinblue API */
  };

  const inputCls =
    "w-full rounded-md border border-border bg-card px-4 py-3 font-body text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-shadow";

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-heading text-xs tracking-[0.3em] uppercase text-primary block mb-4">
            Get in Touch
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-3">
            Let's Talk
          </h2>
          <p className="font-body text-muted-foreground text-[15px]">
            We'd love to hear about your project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            variants={slideIn("left")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-muted rounded-lg p-14 text-center"
                >
                  <i className="fa-solid fa-check-circle text-4xl text-primary mb-4 block" />
                  <p className="font-heading text-lg text-foreground">Thank you! We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="text" placeholder="Full Name" required className={inputCls} />
                    <input type="email" placeholder="Email" required className={inputCls} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <input type="tel" placeholder="Phone" className={inputCls} />
                    <select required className={inputCls}>
                      <option value="">Project Type</option>
                      <option>New Home</option>
                      <option>Renovation</option>
                      <option>Extension</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <textarea placeholder="Tell us about your project..." rows={5} className={inputCls} />
                  <motion.button
                    whileHover={{ y: -2 }}
                    type="submit"
                    className="w-full font-heading text-xs tracking-[0.15em] uppercase px-8 py-4 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact info */}
          <motion.div
            variants={slideIn("right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-muted rounded-lg p-8 mb-6">
              <h3 className="font-heading font-semibold text-foreground text-sm tracking-wide uppercase mb-6">
                Contact Details
              </h3>
              <div className="font-body text-muted-foreground space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-location-dot text-primary mt-0.5" />
                  <span>7 Casamia Glade, Tallawong NSW 2762, Australia</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-phone text-primary mt-0.5" />
                  <span>+61 434 182 035</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-envelope text-primary mt-0.5" />
                  <span>sandhya@envisioncreations.com.au</span>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-clock text-primary mt-0.5" />
                  <span>Mon – Fri, 9:00 am – 6:00 pm</span>
                </div>
              </div>
            </div>

            <motion.a
              whileHover={{ y: -2 }}
              href="https://wa.me/61434182035"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full font-heading text-xs tracking-[0.15em] uppercase px-6 py-4 rounded-md bg-whatsapp text-primary-foreground transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-lg" />
              WhatsApp Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
const Footer = () => (
  <footer className="bg-accent py-16">
    <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-3 gap-12">
      <div>
        <div className="bg-card rounded-2xl p-4 inline-block mb-4">
          <img src={logoImg} alt="Envision Creations" className="h-14 object-contain" />
        </div>
        <p className="font-body text-accent-foreground/50 text-sm leading-relaxed">
          Bringing Ideas &amp; Dreams to Life
        </p>
        <p className="font-body text-accent-foreground/30 mt-3 text-xs">
          ABN 99 689 825 036
        </p>
      </div>
      <div>
        <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-accent-foreground/60 mb-5">
          Navigation
        </h4>
        <div className="flex flex-col gap-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-body text-accent-foreground/40 hover:text-accent-foreground/80 transition-colors text-sm"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-accent-foreground/60 mb-5">
          Contact
        </h4>
        <div className="font-body text-accent-foreground/40 space-y-3 text-sm">
          <p>7 Casamia Glade, Tallawong NSW 2762</p>
          <p>+61 434 182 035</p>
          <p>sandhya@envisioncreations.com.au</p>
        </div>
        <div className="flex gap-5 mt-6">
          {["fa-facebook-f", "fa-instagram", "fa-linkedin-in"].map((icon) => (
            <a
              key={icon}
              href="#"
              className="text-accent-foreground/30 hover:text-accent-foreground/70 transition-colors"
            >
              <i className={`fa-brands ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-accent-foreground/10 text-center">
      <p className="font-body text-accent-foreground/30 text-xs">
        © 2025 Envision Creations Pty Ltd · ABN 99 689 825 036
      </p>
    </div>
  </footer>
);

/* ═══════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════ */
const Index = () => {
  useInjectHead();

  return (
    <div className="bg-background">
      <Header />
      <Hero />
      <About />
      <Process />
      <Services />
      <Gallery />
      <HoursMap />
      <Booking />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
