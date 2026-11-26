import './legacy.css';
import './site.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import ScrollProgress from '@/components/ScrollProgress';
export const metadata = { title: "Digital Train | Your brand's journey to digital growth", description: 'Digital Train is a digital marketing agency: strategy, SEO, performance marketing, creative and web.' };
export default function RootLayout({ children }) {
  return (<html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" /><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,500;1,300&family=Manrope:wght@400;500;700&display=swap" rel="stylesheet" /></head>
    <body data-theme="dark"><SmoothScroll /><ScrollProgress /><Cursor /><Nav />{children}<ContactSection /><Footer /></body></html>);
}
