const regexp = {
  email: '[a-z0-9]+@[a-z]+.[a-z]{2,3}',
  phoneNo: '(0|91)?[6-9][0-9]{9}',
  pincode: '^[1-9]{1}[0-9]{2}/s{0,1}[0-9]{3}$',
  couponCode: '^[a-zA-Z0-9]*$',
};

export default regexp;
