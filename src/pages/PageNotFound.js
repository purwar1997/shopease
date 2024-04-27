import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <main className='h-screen w-screen px-12 flex justify-center items-center'>
      <div className='max-w-3xl flex flex-col items-center'>
        <p className='text-lg text-indigo-500 font-medium'>404</p>
        <h1 className='mt-6 text-5xl font-bold text-gray-900'>Page Not Found</h1>
        <p className='mt-7 font-medium text-lg text-gray-500'>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          className='mt-8 bg-indigo-600 text-white px-5 py-2.5 rounded-md font-medium hover:bg-indigo-500'
          to='/'
        >
          Go back home
        </Link>
      </div>
    </main>
  );
};

export default PageNotFound;
