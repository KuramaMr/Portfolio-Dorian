import React from 'react';
import { motion } from 'framer-motion';

const Background = () => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'linear-gradient(-45deg, #60a5fa, #3b82f6, #1e3a8a, #111827)',
        backgroundSize: '400% 400%',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 15,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
    />
  );
};

export default Background;