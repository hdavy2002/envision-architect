import { useState, useEffect, FormEvent } from "react";
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
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const PROCESS_CARDS = [
  { icon: "🔍", title: "Initial Consultation", desc: "We listen to your vision, lifestyle, and goals." },
  { icon: "✏️", title: "Concept Design", desc: "Modern elevations, bespoke layouts, tailored to you." },
  { icon: "📋", title: "DA/CDC/CC Approvals", desc: "We handle all planning and approval documentation." },
  { icon: "🏗️", title: "Build Support", desc: "We walk the entire journey with you through to build." },
];

const SERVICE_CARDS = [
  { img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600", title: "Modern House Elevations" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600", title: "Bespoke Custom Layouts" },
  { img: "https://images.unsplash.com/photo-1600607687939-ce8a6f349de4?w=600", title: "Tailored Lifestyle Design" },
];

// Gallery images — add more imports here as needed
const galleryImages = [galleryImg1];

/* ─── animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
};

/* ═══════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════ */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const logoSize = useTransform(scrollY, [0, 200], [52, 28]);
  const headerPad = useTransform(scrollY, [0, 200], [24, 8]);
  const headerShadow = useTransform(scrollY, [0, 100], [0, 0.1]);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-background"
      style={{
        paddingTop: headerPad,
        paddingBottom: headerPad,
        boxShadow: useTransform(headerShadow, (v) => `0 4px 24px rgba(0,0,0,${v})`),
      }}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        <motion.h1
          className="font-heading font-bold text-primary tracking-widest uppercase"
          style={{ fontSize: logoSize }}
        >
          Envision Creations
        </motion.h1>
        <p className="font-body italic text-ec-mid text-sm mt-1">
          Bringing Ideas &amp; Dreams to Life
        </p>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 mt-3">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-heading text-sm text-ec-mid hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl text-ec-mid"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${menuOpen ? "fa-xmark" : "fa-bars"}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden overflow-hidden bg-background"
          >
            <div className="flex flex-col items-center gap-4 py-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="font-heading text-ec-mid hover:text-primary"
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600)",
          y: bgY,
        }}
      />
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(250,249,247,0.42)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 flex flex-col md:flex-row items-center gap-12 w-full">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-shrink-0"
        >
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600"
            alt="Envision Creations designer"
            className="w-64 h-64 rounded-full object-cover border-4 border-secondary"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
          />
        </motion.div>

        {/* Text */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center md:text-left"
        >
          <motion.h2
            variants={fadeUp}
            className="font-heading font-bold text-4xl md:text-6xl text-foreground mb-4"
          >
            Envision Creations
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body italic text-ec-mid text-xl mb-8"
          >
            Bringing Ideas &amp; Dreams to Life
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center md:justify-start">
            <motion.a
              whileHover={{ y: -4 }}
              href="#contact"
              className="font-heading text-sm px-8 py-3 rounded-full bg-primary text-primary-foreground"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
            >
              Book a Consultation
            </motion.a>
            <motion.a
              whileHover={{ y: -4 }}
              href="https://wa.me/61434182035"
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading text-sm px-8 py-3 rounded-full bg-whatsapp text-primary-foreground"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
            >
              <i className="fa-brands fa-whatsapp mr-2" />
              WhatsApp Us
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════ */
const About = () => (
  <section id="about" className="bg-ec-alt py-20">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <span className="inline-block font-body text-sm px-4 py-1 rounded-full bg-primary text-primary-foreground mb-4">
          BDAA Accredited
        </span>
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-6">
          Our Story &amp; Vision
        </h2>
        <div className="font-body text-ec-mid space-y-4 leading-relaxed">
          <p>
            Envision Creations is a BDAA Accredited Building Designer Service. At Envision Creations,
            we believe that art and design have the power to inspire and transform. We aim to help people
            bring their creative visions to life.
          </p>
          <p>
            Our vision is to redefine design by merging functionality with artistic expression. We
            believe every space should tell a story and reflect the unique identity of its inhabitants.
          </p>
        </div>
        <p className="font-body text-sm text-muted-foreground mt-6">ABN 99 689 825 036</p>
      </motion.div>

      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <img
          src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800"
          alt="Architectural design"
          className="w-full rounded-4xl object-cover"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
        />
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   PROCESS
   ═══════════════════════════════════════════════ */
const Process = () => (
  <section id="process" className="py-20 bg-background">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-12"
      >
        Our Process
      </motion.h2>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {PROCESS_CARDS.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            className="bg-background rounded-3xl p-8 text-center"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
          >
            <span className="text-4xl block mb-4">{c.icon}</span>
            <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
            <p className="font-body text-ec-mid text-sm">{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-body italic text-ec-mid text-center mt-12 text-lg max-w-2xl mx-auto"
      >
        "Right from initial concept to DA/CDC/CC approval — we walk the journey with you."
      </motion.p>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   WHAT TO EXPECT (SERVICES)
   ═══════════════════════════════════════════════ */
const Services = () => (
  <section id="services" className="bg-ec-alt py-20">
    <div className="max-w-7xl mx-auto px-4">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-4"
      >
        What to Expect
      </motion.h2>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-body text-ec-mid text-center max-w-3xl mx-auto mb-12 leading-relaxed"
      >
        With in-depth experience in planning and custom home designing, Envision Creations offers modern
        house elevations, bespoke layouts, and tailored designs suiting individual's unique lifestyle and
        choices. Every project receives personal attention.
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {SERVICE_CARDS.map((c) => (
          <motion.div
            key={c.title}
            variants={fadeUp}
            whileHover={{ scale: 1.03 }}
            className="bg-card rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
          >
            <img src={c.img} alt={c.title} className="w-full h-52 object-cover" loading="lazy" />
            <div className="p-6">
              <h3 className="font-heading font-semibold text-foreground">{c.title}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ═══════════════════════════════════════════════
   GALLERY
   ═══════════════════════════════════════════════ */
const Gallery = () => {
  const placeholders = Array.from({ length: 12 });

  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-12"
        >
          Our Work
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          {galleryImages.length > 0
            ? galleryImages.map((src, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ scale: 1.03 }} className="break-inside-avoid">
                  <img
                    src={src}
                    alt={`Project ${i + 1}`}
                    className="w-full rounded-3xl object-cover"
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                    loading="lazy"
                  />
                </motion.div>
              ))
            : placeholders.map((_, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.03 }}
                  className="break-inside-avoid bg-ec-alt rounded-3xl flex flex-col items-center justify-center"
                  style={{ height: 280, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                >
                  <span className="text-4xl mb-2">📷</span>
                  <span className="font-body text-ec-mid text-sm">Image coming soon</span>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════════════════════════════════════════
   HOURS & MAP
   ═══════════════════════════════════════════════ */
const HoursMap = () => (
  <section className="bg-ec-alt py-20">
    <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
      <motion.div
        variants={slideLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-ec-alt rounded-4xl p-8"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
      >
        <h2 className="font-heading font-bold text-2xl text-foreground mb-6">Visit Us</h2>
        <div className="font-body text-ec-mid space-y-3 text-sm">
          <p>📍 7 Casamia Glade, Tallawong NSW 2762, Australia</p>
          <p>📞 +61 434 182 035</p>
          <p>✉️ sandhya@envisioncreations.com.au</p>
          <p>🕐 Mon–Fri, 09:00 am – 06:00 pm</p>
        </div>
        <motion.a
          whileHover={{ y: -4 }}
          href="https://maps.google.com/?q=7+Casamia+Glade+Tallawong+NSW+2762"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 font-heading text-sm px-6 py-3 rounded-full bg-primary text-primary-foreground"
        >
          Get Directions
        </motion.a>
      </motion.div>

      <motion.div
        variants={slideRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <iframe
          title="Envision Creations Location"
          src="https://maps.google.com/maps?q=7+Casamia+Glade+Tallawong+NSW+2762&output=embed"
          className="w-full rounded-3xl"
          style={{ height: 380, border: 0, boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
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
  <section id="booking" className="bg-ec-alt py-20">
    <div className="max-w-4xl mx-auto px-4 text-center">
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4"
      >
        Book an Appointment
      </motion.h2>
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="font-body text-ec-mid mb-8"
      >
        Schedule a consultation at your convenience.
      </motion.p>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-3xl overflow-hidden"
        style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
      >
        {/* NOTE: Replace src with actual cal.com booking URL */}
        <iframe
          title="Book Appointment"
          src="https://cal.com"
          className="w-full rounded-3xl"
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

  const inputBase =
    "w-full rounded-2xl border border-secondary px-4 py-3 font-body text-foreground focus:outline-none focus:ring-2 focus:ring-primary bg-card";

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-heading font-bold text-3xl md:text-4xl text-center text-foreground mb-2"
        >
          Get In Touch
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-ec-mid text-center mb-12"
        >
          We'd love to hear about your project.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-ec-alt rounded-3xl p-12 text-center"
                  style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                >
                  <span className="text-5xl block mb-4">✅</span>
                  <p className="font-heading text-xl text-foreground">Thank you! We'll be in touch soon.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input type="text" placeholder="Full Name" required className={inputBase} />
                  <input type="email" placeholder="Email" required className={inputBase} />
                  <input type="tel" placeholder="Phone" className={inputBase} />
                  <select required className={inputBase}>
                    <option value="">Project Type</option>
                    <option>New Home</option>
                    <option>Renovation</option>
                    <option>Extension</option>
                    <option>Other</option>
                  </select>
                  <textarea placeholder="Message" rows={5} className={inputBase} />
                  <motion.button
                    whileHover={{ y: -4 }}
                    type="submit"
                    className="w-full font-heading text-sm px-8 py-4 rounded-2xl bg-primary text-primary-foreground"
                    style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact card */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-ec-alt rounded-4xl p-8"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
          >
            <h3 className="font-heading font-bold text-xl text-foreground mb-6">Contact Details</h3>
            <div className="font-body text-ec-mid space-y-3 text-sm mb-8">
              <p>📍 7 Casamia Glade, Tallawong NSW 2762, Australia</p>
              <p>📞 +61 434 182 035</p>
              <p>✉️ sandhya@envisioncreations.com.au</p>
              <p>🕐 Mon–Fri, 09:00 am – 06:00 pm</p>
            </div>
            <motion.a
              whileHover={{ y: -4 }}
              href="https://wa.me/61434182035"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-heading text-sm px-8 py-3 rounded-full bg-whatsapp text-primary-foreground"
              style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
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
  <footer className="bg-foreground py-14">
    <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-3 gap-10 text-sm">
      <div>
        <img src={logoImg} alt="Envision Creations logo" className="w-48 mb-4 rounded-lg" />
        <p className="font-body text-secondary">Bringing Ideas &amp; Dreams to Life</p>
        <p className="font-body text-muted-foreground mt-2 text-xs">ABN 99 689 825 036</p>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-secondary mb-4">Quick Links</h4>
        <div className="flex flex-col gap-2">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="font-body text-muted-foreground hover:text-secondary transition-colors">
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-secondary mb-4">Contact</h4>
        <div className="font-body text-muted-foreground space-y-2">
          <p>📍 7 Casamia Glade, Tallawong NSW 2762</p>
          <p>📞 +61 434 182 035</p>
          <p>✉️ sandhya@envisioncreations.com.au</p>
        </div>
        <div className="flex gap-4 mt-4">
          {["fa-facebook-f", "fa-instagram", "fa-linkedin-in"].map((icon) => (
            <a
              key={icon}
              href="#"
              className="text-primary hover:text-secondary transition-colors text-lg"
            >
              <i className={`fa-brands ${icon}`} />
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-muted-foreground/20 text-center">
      <p className="font-body text-muted-foreground text-xs">
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
