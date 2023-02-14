import transporter from '../config/transporter.config';
import config from '../config/config';

const mailSender = async options => {
  await transporter.sendMail({
    from: config.SMTP_SENDER_EMAIL,
    to: options.email,
    subject: options.subject,
    html: options.html,
  });
};

export default mailSender;
