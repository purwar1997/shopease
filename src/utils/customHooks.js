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
  }, []);
};
