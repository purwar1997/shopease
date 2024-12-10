const LoadingSpinner = () => {
  return (
    <div className='page-height w-full flex justify-center items-center'>
      <div className='w-10 h-10 border-2 border-indigo-600 border-t-0 rounded-full animate-spin' />
    </div>
  );
};

export default LoadingSpinner;
