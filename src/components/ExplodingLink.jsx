import { motion } from 'framer-motion';
import { useState } from 'react';

const ExplodingLink = ({ children, href, onClick, className, target, rel }) => {
  const [isExploded, setIsExploded] = useState(false);

  const handleExplode = (e) => {
    e.preventDefault();
    setIsExploded(true);
    setTimeout(() => {
      setIsExploded(false);
      if (onClick) onClick(e);
      else if (href.startsWith('#')) {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(href, target || '_self');
      }
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

  return (
    <motion.a
      href={href}
      onClick={handleExplode}
      className={className}
      target={target}
      rel={rel}
    >
      {children.split('').map((letter, index) => (
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
    </motion.a>
  );
};

export default ExplodingLink;