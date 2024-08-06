import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

const projects = [
  {
    title: "Projet Riding Cities",
    description: "Premiers pas sur le langage HTML",
    image: "/images/RidingCities.png",
    link: "https://kuramamr.github.io/Projet-2/"
  },
  {
    title: "Projet Booki",
    description: "Créez la page d'accueil d'une agence de voyage avec HTML & CSS",
    image: "/images/Booki.png",
    link: "https://kuramamr.github.io/Projet-3/"
  },
  {
    title: "Projet Print-it",
    description: "Premiers pas sur le langage JavaScript",
    image: "/images/Printit.png",
    link: "https://kuramamr.github.io/Projet-6/"
  },
  {
    title: "Projet Kasa",
    description: "Créez une application web de location immobilière avec React",
    image: "/images/Kasa.png",
    link: "https://github.com/KuramaMr/Projet-8"
  },
  {
    title: "Projet Eco Bliss Bath",
    description: "Automatisez des tests pour une boutique en ligne",
    image: "/images/EcoBlissBath.png",
    link: "https://github.com/KuramaMr/Projet-10"
  },
  {
    title: "Projet Portfolio Guelmaoui Ferid",
    description: "Site web responsive développé avec HTML, CSS, JavaScript et Node.js, intégrant gestion d'images, authentification et animations.",
    image: "/images/CarteFerid.png",
    link: "https://portfolio-ferid.netlify.app/"
  },

];

const Projects = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setActiveProject(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section id="projets" className="py-20 bg-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.h2  
          className="text-4xl font-bold mb-16 text-center text-white-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mes Projets
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer ${activeProject === index ? 'col-span-2' : ''}`}
              onClick={() => setActiveProject(activeProject === index ? null : index)}
              layoutId={`project-${index}`}
            >
              <motion.div className="relative h-48 md:h-64">
                <Image 
                  src={project.image} 
                  alt={project.title}
                  layout="fill"
                />
              </motion.div>
              <motion.div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-300">{project.title}</h3>
                <AnimatePresence>
                  {activeProject === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors duration-300"
                      >
                        Voir le projet
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;