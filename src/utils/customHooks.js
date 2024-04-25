import { useEffect } from 'react';

export const useHandleModal = closeModal => {
  useEffect(() => {
    const closeModalOnEscapeKey = e => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    document.addEventListener('keydown', closeModalOnEscapeKey);
    document.body.classList.add('overflow-hidden');

    return () => {
      document.removeEventListener('keydown', closeModalOnEscapeKey);
      document.body.classList.remove('overflow-hidden');
    };
  }, [closeModal]);
};

export const useHandleDropdown = (dropdownRef, setOpenDropdown) => {
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef, setOpenDropdown]);
};