import transporter from '../config/transporter';
import config from '../config/config';

const mailSender = async options => {
  await transporter.sendMail({
    from: config.SMTP_SENDER_EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.text,
  });
};

export default mailSender;
