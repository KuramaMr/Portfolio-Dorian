import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <section id="contact" className="py-32 bg-gray-900">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.h2 
          className="text-4xl font-bold mb-16 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Contactez-moi
        </motion.h2>
        <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/success.html">
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Ne pas remplir: <input name="bot-field" />
            </label>
          </p>
          <div className="mb-6">
            <label htmlFor="name" className="block text-white mb-2">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-white mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-white mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Envoyer
            </motion.button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;