import { format } from 'date-fns';

export const handleClickOutside = (e, closeModal) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }

  e.stopPropagation();
};

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const formatDate = (isoDateString, long) =>
  format(isoDateString, long ? 'MMMM d, yyyy' : 'MMM d, yyyy');

export const capitalizeFirstLetter = string => {
  if (!string) {
    return string;
  }

  return string.at(0).toUpperCase() + string.slice(1);
};

export const roundTwoDecimalPlaces = value => {
  if (typeof value !== 'number') {
    return value;
  }

  return Math.round(value * 100) / 100;
};

export const delay = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
};

export const throwError = () => {
  return new Promise((_, reject) => {
    reject('Error thrown');
  });
};
