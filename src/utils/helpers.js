import { format } from 'date-fns';

export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const handleClickOutside = (e, closeModal) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }

  e.stopPropagation();
};

export const formatDate = (isoDateString, long) =>
  format(isoDateString, long ? 'MMMM d, yyyy' : 'MMM d, yyyy');
