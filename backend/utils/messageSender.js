import client from '../config/twilio.config';

const messageSender = async options => {
  await client.messages.create({
    body: options.body,
    from: '+16283457614',
    to: '+91' + options.phoneNo,
  });
};

export default messageSender;
