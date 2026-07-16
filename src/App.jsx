import React, { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'

// Brand-level pages — lazy loaded
const MainHome = lazy(() => import('./main/pages/MainHome'))
const AllProductsPage = lazy(() => import('./main/pages/AllProductsPage'))
const AboutPage = lazy(() => import('./main/pages/AboutPage'))
const MainContactPage = lazy(() => import('./main/pages/MainContactPage'))

// GOODSYCK ERP pages — lazy loaded
const Navbar = lazy(() => import('./goodsyck-erp/components/Navbar'))
const Hero = lazy(() => import('./goodsyck-erp/components/Hero'))
const Stats = lazy(() => import('./goodsyck-erp/components/Stats'))
const Problem = lazy(() => import('./goodsyck-erp/components/Problem'))
const Features = lazy(() => import('./goodsyck-erp/components/Features'))
const UserRoles = lazy(() => import('./goodsyck-erp/components/UserRoles'))
const WhyGOODSYCKERP = lazy(() => import('./goodsyck-erp/components/WhyGOODSYCKERP'))
const Workflow = lazy(() => import('./goodsyck-erp/components/Workflow'))
const CTA = lazy(() => import('./goodsyck-erp/components/CTA'))
const Footer = lazy(() => import('./goodsyck-erp/components/Footer'))
const FeaturesPage = lazy(() => import('./goodsyck-erp/pages/FeaturesPage'))
const RolesPage = lazy(() => import('./goodsyck-erp/pages/RolesPage'))
const ContactPage = lazy(() => import('./goodsyck-erp/pages/ContactPage'))
const ScrollToTop = lazy(() => import('./goodsyck-erp/components/ScrollToTop'))
const ContactOptions = lazy(() => import('./goodsyck-erp/components/ContactOptions'))

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

const SectionReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // GOODSYCK ERP product landing page
  const GoodsyckERPPage = () => (
    <div className="min-h-screen bg-white font-inter text-slate-900 scroll-smooth selection:bg-indigo-600/30 selection:text-indigo-600 relative">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 origin-left z-[100]"
        style={{ scaleX }}
      />
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-[99]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }}
      />
      <Navbar />
      <main className="relative z-0">
        <Hero />
        <SectionReveal><Stats /></SectionReveal>
        <SectionReveal><Problem /></SectionReveal>
        <SectionReveal><Features /></SectionReveal>
        <SectionReveal><UserRoles /></SectionReveal>
        <SectionReveal><WhyGOODSYCKERP /></SectionReveal>
        <SectionReveal><Workflow /></SectionReveal>
        <SectionReveal><CTA /></SectionReveal>
        <SectionReveal><ContactOptions /></SectionReveal>
      </main>
      <Footer />
    </div>
  );

  return (
    <Suspense fallback={<PageLoader />}>
      <ScrollToTop />
      <Routes>
        {/* ── Brand-level pages ── */}
        <Route path="/" element={<MainHome />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/main-contact" element={<MainContactPage />} />

        {/* ── GOODSYCK ERP product pages ── */}
        <Route path="/erp" element={<GoodsyckERPPage />} />
        <Route path="/erp/features" element={<FeaturesPage />} />
        <Route path="/erp/roles" element={<RolesPage />} />
        <Route path="/erp/contact" element={<ContactPage />} />

        {/* Legacy redirects (keep old routes working) */}
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  );
}

export default App

