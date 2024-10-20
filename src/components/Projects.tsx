import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  importance: number;
  categories: string[];
}

interface ProjectCardProps {
  project: Project;
}

const projects: Project[] = [
  {
    title: "Projet Blog Rêve d'Europe",
    description: "Blog de voyages développé avec HTML, CSS, JavaScript et React, intégrant des animations et une gestion de contenu dynamique.",
    image: "/images/ReveEurope.png",
    link: "https://reve-europe.netlify.app",
    importance: 7,
    categories: ["HTML/CSS", "JavaScript", "React"]
  },
  {
    title: "Projet Portfolio Guelmaoui Ferid",
    description: "Site web responsive développé avec HTML, CSS, JavaScript et Node.js, intégrant gestion d'images, authentification et animations.",
    image: "/images/CarteFerid.png",
    link: "https://portfolio-ferid.netlify.app/",
    importance: 6,
    categories: ["HTML/CSS", "JavaScript", "Node.js", "Tests automatisés"]
  },
  {
    title: "Projet Riding Cities",
    description: "Premiers pas sur le langage HTML",
    image: "/images/RidingCities.png",
    link: "https://kuramamr.github.io/Projet-2/",
    importance: 1,
    categories: ["HTML/CSS"]
  },
  {
    title: "Projet Booki",
    description: "Créez la page d'accueil d'une agence de voyage avec HTML & CSS",
    image: "/images/Booki.png",
    link: "https://kuramamr.github.io/Projet-3/",
    importance: 2,
    categories: ["HTML/CSS"]
  },
  {
    title: "Projet Print it",
    description: "Premiers pas sur le langage JavaScript",
    image: "/images/Printit.png",
    link: "https://kuramamr.github.io/Projet-6/",
    importance: 3,
    categories: ["JavaScript"]
  },
  {
    title: "Projet Kasa",
    description: "Créez une application web de location immobilière avec React",
    image: "/images/Kasa.png",
    link: "https://github.com/KuramaMr/Projet-8",
    importance: 4,
    categories: ["React", "JavaScript"]
  },
  {
    title: "Projet Eco Bliss Bath",
    description: "Automatisez des tests pour une boutique en ligne",
    image: "/images/EcoBlissBath.png",
    link: "https://github.com/KuramaMr/Projet-10",
    importance: 5,
    categories: ["JavaScript", "Tests automatisés"]
  }
].sort((a, b) => b.importance - a.importance);

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="rounded-lg overflow-hidden shadow-xl cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="relative h-48 md:h-64">
        <Image 
          src={project.image} 
          alt={project.title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blue-300">{project.title}</h3>
        <AnimatePresence>
          {isExpanded && (
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
                onClick={(e) => e.stopPropagation()}
              >
                Voir le projet
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<string>("Tous");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filteredProjects = filter === "Tous" 
    ? projects 
    : projects.filter(project => project.categories.includes(filter));

  const categories = ["Tous", "HTML/CSS", "JavaScript", "React", "Node.js", "Tests automatisés"];

  interface FilterButtonProps {
    category: string;
    isActive: boolean;
    onClick: (category: string) => void;
  }

  const FilterButton: React.FC<FilterButtonProps> = ({ category, isActive, onClick }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`px-4 py-2 rounded-full ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
      onClick={() => {
        onClick(category);
        setIsFilterMenuOpen(false);
      }}
    >
      {category}
    </motion.button>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sectionRef.current && !sectionRef.current.contains(event.target as Node)) {
        setActiveProject(null);
        setIsFilterMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <section id="projets" className="py-20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <motion.h2  
          className="text-4xl font-bold mb-16 text-center text-white-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mes Projets
        </motion.h2>
        
        {/* Bouton de filtre pour mobile */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-full"
          >
            {filter} ▼
          </button>
        </div>

        {/* Menu de filtres pour mobile */}
        <AnimatePresence>
          {isFilterMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mb-4"
            >
              <div className="flex flex-col space-y-2">
                {categories.map(category => (
                  <FilterButton
                    key={category}
                    category={category}
                    isActive={filter === category}
                    onClick={setFilter}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filtres pour desktop */}
        <div className="hidden md:flex justify-center space-x-4 mb-8">
          {categories.map(category => (
            <FilterButton
              key={category}
              category={category}
              isActive={filter === category}
              onClick={setFilter}
            />
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8" key={filter}>
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-white">Aucun projet ne correspond à ce filtre.</p>
        )}
      </div>
    </section>
  );
};

export default Projects;