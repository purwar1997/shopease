import axios from 'axios';
import config from '../config/config';

export const validateEmail = async email => {
  try {
    const { data } = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${config.EMAIL_VALIDATION_API_KEY}&email=${email}`
    );

    const isValid =
      data.is_valid_format.value &&
      data.is_free_email.value &&
      (data.deliverability === 'DELIVERABLE' || data.deliverability === 'UNKNOWN');

    return isValid;
  } catch (err) {
    throw new Error('Error validating email ID');
  }
};

export const validatePhoneNo = async phoneNo => {
  try {
    const { data } = await axios.get(
      `https://phonevalidation.abstractapi.com/v1/?api_key=${
        config.PHONE_VALIDATION_API_KEY
      }&phone=${'91' + phoneNo}`
    );

    const isValid = data.valid;
    return isValid;
  } catch (err) {
    throw new Error('Error validating phone no.');
  }
};

export const validatePincode = async pincode => {
  try {
    const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
    const isValid = data.Status === 'Success' ? true : false;
    return isValid;
  } catch (err) {
    throw new Error('Error validating pincode');
  }
};
