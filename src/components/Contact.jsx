import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setNotification({ show: true, message: 'Message envoyé avec succès !', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setNotification({ show: true, message: 'Une erreur est survenue lors de l\'envoi du message.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
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
        <form onSubmit={handleSubmit}>
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
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-colors duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                initial={{ y: 0 }}
                animate={isSubmitting ? { y: -30 } : { y: 0 }}
                transition={{ duration: 0.2 }}
              >
                Envoyer
              </motion.span>
              <motion.span
                className="absolute inset-0 flex items-center justify-center"
                initial={{ y: 30 }}
                animate={isSubmitting ? { y: 0 } : { y: 30 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </motion.span>
            </motion.button>
          </div>
        </form>
      </div>
      {notification.show && (
        <motion.div
          className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          {notification.message}
        </motion.div>
      )}
    </section>
  );
};

export default Contact;