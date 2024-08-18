import { FaReact, FaNodeJs, FaPaintBrush, FaGitAlt, FaDocker, FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import { motion } from 'framer-motion';

const skills = [
  { 
    name: 'HTML', 
    icon: FaHtml5, 
    color: 'text-orange-500',
    description: "Création de la structure de base des pages web avec un balisage sémantique."
  },
  { 
    name: 'CSS', 
    icon: FaCss3Alt, 
    color: 'text-blue-500',
    description: "Stylisation et mise en page des éléments web pour une présentation visuelle attrayante."
  },
  { 
    name: 'JavaScript', 
    icon: FaJs, 
    color: 'text-yellow-400',
    description: "Programmation côté client pour des interactions dynamiques et des fonctionnalités avancées."
  },
  { 
    name: 'React', 
    icon: FaReact, 
    color: 'text-blue-400',
    description: "Création d'interfaces utilisateur dynamiques et réactives avec des composants réutilisables."
  },
  { 
    name: 'Node.js', 
    icon: FaNodeJs, 
    color: 'text-green-400',
    description: "Développement backend performant et scalable pour des applications web modernes."
  },
  { 
    name: 'UI/UX Design', 
    icon: FaPaintBrush, 
    color: 'text-purple-400',
    description: "Conception d'interfaces intuitives et esthétiques centrées sur l'expérience utilisateur."
  },
  { 
    name: 'Git', 
    icon: FaGitAlt, 
    color: 'text-orange-400',
    description: "Gestion efficace des versions et collaboration fluide sur des projets de développement."
  },
  { 
    name: 'Docker', 
    icon: FaDocker, 
    color: 'text-cyan-400',
    description: "Conteneurisation d'applications pour un déploiement cohérent et simplifié."
  },
];

const Skills = () => {
  return (
    <section id="competences" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-bold mb-16 text-center text-white-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Mes Compétences
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
              }
            }
          }}
          initial="hidden"
          animate="visible"
        >
          {skills.map((skill) => (
            <motion.div 
              key={skill.name}
              className="flex flex-col items-center"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1
                }
              }}
            >
              <motion.div 
                className={`w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center mb-6 shadow-lg ${skill.color}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <skill.icon className="text-6xl" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-white mb-4">{skill.name}</h3>
              <p className="text-gray-300 text-center">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;