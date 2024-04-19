export const classNames = (...classes) => classes.filter(Boolean).join(' ');

export const handleClickOutside = (e, closeModal) => {
  if (e.target === e.currentTarget) {
    closeModal();
  }

  e.stopPropagation();
};