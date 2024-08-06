import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { FaReact, FaNodeJs, FaPaintBrush } from 'react-icons/fa';

const Presentation = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [150, 450]);

  const skills = [
    { name: 'React', icon: FaReact, color: 'text-blue-400' },
    { name: 'Node.js', icon: FaNodeJs, color: 'text-green-400' },
    { name: 'UI/UX', icon: FaPaintBrush, color: 'text-purple-400' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <section id="à-propos" className="min-h-screen flex items-center justify-center bg-gray-900">
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
          <motion.div 
            className="w-80 h-80 relative"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute w-full h-full rounded-full overflow-hidden border-4 border-blue-500"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src="/images/Moi.jpg"
                alt="Photo de profil de Dorian Maquet"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </motion.div>
          </motion.div>

          <div className="md:w-1/2 text-center md:text-left">
            <motion.h2 
              className="text-4xl font-bold mb-4 text-blue-400"
              variants={itemVariants}
            >
              À propos de moi
            </motion.h2>
            <motion.p 
              className="text-lg mb-6 text-gray-300"
              variants={itemVariants}
            >
              Mon parcours professionnel est marqué par une évolution constante et une quête de passion. Après deux années en Bac Pro électrotechnique au lycée Ozanam, j&apos;ai réalisé que ma vocation était ailleurs. Cette prise de conscience m&apos;a conduit à m&apos;engager dans une mission de Service Civique au centre des impôts d&apos;Epernay, où j&apos;ai développé des compétences précieuses en service à la personne.
              <br /><br />
              Ma carrière a ensuite pris un tournant chez JVS Mairistem, où j&apos;ai occupé le poste d&apos;assistant utilisateur en comptabilité. Désireux d&apos;explorer davantage le monde du numérique, j&apos;ai suivi une formation de testeur logiciel via OpenClassRooms. Cette expérience m&apos;a ouvert les portes du développement web, domaine dans lequel j&apos;ai trouvé ma véritable passion.
              <br /><br />
              Aujourd&apos;hui, je suis un développeur web enthousiaste, spécialisé dans la création d&apos;expériences numériques innovantes. Mon expertise en React, Node.js et design UI/UX me permet de concevoir des applications web à la fois performantes et esthétiques, répondant aux besoins des utilisateurs modernes.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center md:justify-start gap-4"
              variants={containerVariants}
            >
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.name}
                  className="flex items-center bg-gray-800 rounded-full px-4 py-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  variants={itemVariants}
                >
                  <skill.icon className={`text-xl mr-2 ${skill.color}`} />
                  <span className="text-white font-semibold">{skill.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Presentation;