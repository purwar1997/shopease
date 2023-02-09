import axios from 'axios';
import config from '../config/config';

export const validateEmail = async email => {
  const { data } = await axios.get(
    `https://emailvalidation.abstractapi.com/v1/?
      api_key=${config.EMAIL_VALIDATION_API_KEY}&email=${email}`
  );

  const isValid =
    data.is_valid_format.value &&
    data.is_free_email.value &&
    (data.deliverability === 'DELIVERABLE' || data.deliverability === 'UNKNOWN');

  return isValid;
};

export const validatePhoneNo = async phoneNo => {
  const { data } = await axios.get(
    `https://phonevalidation.abstractapi.com/v1/?
      api_key=${config.PHONE_VALIDATION_API_KEY}&phone=${'91' + phoneNo}`
  );

  const isValid = data.valid;
  return isValid;
};

export const validatePincode = async pincode => {
  const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
  const isValid = data.Status === 'Success' ? true : false;
  return isValid;
};
