import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';

const Accueil = () => {
  const handleDiscoverClick = (e) => {
    e.preventDefault();
    const aProposSection = document.getElementById('à-propos');
    if (aProposSection) {
      window.scrollTo({
        top: aProposSection.offsetTop,
        behavior: 'smooth'
      });
    }
  };

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
          <button 
            onClick={handleDiscoverClick}
            className="bg-blue-600 text-white py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            Découvrir mon travail
          </button>
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