import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <main className='h-screen w-screen px-12 flex justify-center items-center'>
      <div className='max-w-3xl flex flex-col items-center'>
        <h1 className='text-3xl text-gray-900'>Oops, an unexpected error had occured.</h1>
        {error.message && <p className='mt-7 font-medium text-lg text-gray-500'>{error.message}</p>}
        <Link
          className='mt-8 bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-indigo-500'
          to={-1}
        >
          Back to previous page
        </Link>
      </div>
    </main>
  );
};

export default ErrorPage;
