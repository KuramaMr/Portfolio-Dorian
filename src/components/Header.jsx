import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ExplodingLink from './ExplodingLink';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const controls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        setIsScrolled(true);
        controls.start({ backgroundColor: 'rgba(17, 24, 39, 0.8)', backdropFilter: 'blur(5px)' });
      } else {
        setIsScrolled(false);
        controls.start({ backgroundColor: 'rgba(17, 24, 39, 0)', backdropFilter: 'blur(0px)' });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  const handleNavigation = (e, target) => {
    e.preventDefault();
    const elementId = target.toLowerCase().replace(/\s+/g, '-').replace(/[éè]/g, 'e');
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(`/${elementId}`);
    }
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
        <nav>
          <ul className="flex space-x-6">
            {['Accueil', 'À Propos', 'Compétences', 'Projets', 'Contact'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExplodingLink
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-white hover:text-blue-400 transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </ExplodingLink>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;