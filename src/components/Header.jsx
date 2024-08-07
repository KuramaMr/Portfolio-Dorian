import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ExplodingLink from './ExplodingLink';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    controls.start({
      y: isScrolled ? 0 : 10,
      opacity: isScrolled ? 1 : 0.7,
    });
  }, [isScrolled, controls]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (e) => {
    closeMobileMenu();
  };

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="container mx-auto px-4 py-4 flex justify-between items-center"
        animate={controls}
        transition={{ duration: 0.3 }}
      >
        <Link href="/">
          <motion.h2
            className="text-2xl font-bold text-white cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Dorian Maquet
          </motion.h2>
        </Link>
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {['Accueil', 'À Propos', 'Compétences', 'Projets', 'Contact'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExplodingLink
                  href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[éè]/g, 'e')}`}
                  className="text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                  onClick={handleLinkClick}
                >
                  {item}
                </ExplodingLink>
              </motion.li>
            ))}
          </ul>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </motion.div>
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-gray-900 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="py-4">
            {['Accueil', 'À Propos', 'Compétences', 'Projets', 'Contact'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2"
              >
                <ExplodingLink
                  href={`#${item.toLowerCase().replace(/\s+/g, '-').replace(/[éè]/g, 'e')}`}
                  className="block text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer px-4"
                  onClick={closeMobileMenu}
                >
                  {item}
                </ExplodingLink>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;