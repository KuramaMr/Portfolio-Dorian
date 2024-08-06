import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { useState } from 'react';

const Accueil = () => {
  const [isExploded, setIsExploded] = useState(false);

  const handleDiscoverClick = () => {
    const aProposSection = document.getElementById('à-propos');
    if (aProposSection) {
      window.scrollTo({
        top: aProposSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleExplode = (e) => {
    e.preventDefault();
    setIsExploded(true);
    setTimeout(() => {
      setIsExploded(false);
      handleDiscoverClick();
    }, 1000);
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    explode: (i) => ({
      opacity: 0,
      y: Math.random() * 500 - 250,
      x: Math.random() * 500 - 250,
      rotate: Math.random() * 360,
      transition: { duration: 0.5, delay: i * 0.02 }
    })
  };

  const buttonText = "Découvrir mon travail";

  return (
    <section id="accueil" className="h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <motion.h1 
          className="text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Dorian Maquet
        </motion.h1>
        <motion.p 
          className="text-2xl text-blue-300 mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Développeur Web Créatif
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <motion.button 
            onClick={handleExplode}
            className="relative bg-blue-600 text-white py-3 px-8 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            {buttonText.split('').map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                initial="hidden"
                animate={isExploded ? "explode" : "visible"}
                custom={index}
                style={{ display: 'inline-block' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
            <motion.div
              className="absolute inset-0 bg-blue-400"
              initial={{ scale: 0, opacity: 0 }}
              animate={isExploded ? { scale: 20, opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FaArrowDown className="text-white text-3xl" />
      </motion.div>
    </section>
  );
};

export default Accueil;