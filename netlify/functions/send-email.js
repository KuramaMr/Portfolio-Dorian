const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message } = JSON.parse(event.body);

  // Configurez votre transporteur SMTP ici
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",  // Utilisez le serveur SMTP de votre choix
    port: 587,
    secure: false, // true pour 465, false pour les autres ports
    auth: {
      user: process.env.EMAIL_USER, // Votre adresse email
      pass: process.env.EMAIL_PASS  // Votre mot de passe ou mot de passe d'application
    },
  });

  try {
    await transporter.sendMail({
      from: '"Votre Portfolio" <votre-email@example.com>',
      to: "takenzmr@gmail.com", // L'adresse où vous voulez recevoir les emails
      subject: `Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Nom:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email envoyé avec succès" }),
    };
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erreur lors de l'envoi de l'email" }),
    };
  }
};