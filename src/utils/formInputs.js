export const signupInputs = [
  {
    label: 'Email address',
    type: 'email',
    id: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password',
    name: 'password',
    autoComplete: 'new-password',
    required: true,
    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$',
    errorMessage:
      'Password must be 6-20 characters long and should contain atleast one digit, one letter and one special character.',
  },
  {
    label: 'Confirm password',
    type: 'password',
    id: 'confirm-password',
    name: 'confirmPassword',
    autoComplete: 'new-password',
    required: true,
    errorMessage: "Passwords don't match.",
  },
];

export const loginInputs = [
  {
    label: 'Email address',
    type: 'email',
    id: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    label: 'Password',
    type: 'password',
    id: 'password',
    name: 'password',
    autoComplete: 'current-password',
    required: true,
    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,20}$',
    errorMessage:
      'Password must be 6-20 characters long and should contain atleast one digit, one letter and one special character.',
    isLogin: true,
  },
];

export const forgotPasswordInput = {
  label: 'Email address',
  type: 'email',
  id: 'email',
  name: 'email',
  autoComplete: 'email',
  required: true,
  errorMessage: 'Please enter a valid email address.',
};

export const checkoutInputs = [
  {
    label: 'Email address',
    type: 'email',
    id: 'email',
    name: 'email',
    autoComplete: 'email',
    required: true,
    errorMessage: 'Please enter a valid email address.',
  },
  {
    label: 'Phone',
    type: 'tel',
    id: 'phone',
    name: 'phone',
    autoComplete: 'tel',
    required: true,
    pattern: '(0|91)?[6-9][0-9]{9}',
    errorMessage:
      'Please enter a valid phone number so we can call if there are any issues with delivery.',
  },
  {
    label: 'First name',
    type: 'text',
    id: 'firstname',
    name: 'firstname',
    autoComplete: 'given-name',
    required: true,
    errorMessage: 'First name is required.',
  },
  {
    label: 'Last name',
    type: 'text',
    id: 'lastname',
    name: 'lastname',
    autoComplete: 'family-name',
  },
  {
    label: 'Address',
    type: 'text',
    id: 'address',
    name: 'address',
    autoComplete: 'address-line1',
    required: true,
    errorMessage: 'Please enter an address.',
  },
  {
    label: 'Apartment, suite, flat',
    type: 'text',
    id: 'apartment',
    name: 'apartment',
    autoComplete: 'address-line2',
  },
  {
    label: 'City',
    type: 'text',
    id: 'city',
    name: 'city',
    required: true,
    errorMessage: 'Please enter a city name.',
  },
  {
    label: 'Country',
    id: 'country',
    name: 'country',
    autoComplete: 'country-name',
    required: true,
    errorMessage: 'Please enter a country.',
  },
  {
    label: 'State / Province',
    type: 'text',
    id: 'state',
    name: 'state',
    required: true,
    errorMessage: 'Please enter a state, region or province.',
  },
  {
    label: 'Postal code',
    type: 'text',
    id: 'postal-code',
    name: 'postalCode',
    autoComplete: 'postal-code',
    required: true,
    pattern: '^[1-9]{1}[0-9]{2}s{0,1}[0-9]{3}$',
    errorMessage: 'Please enter a valid ZIP or postal code.',
  },
];
