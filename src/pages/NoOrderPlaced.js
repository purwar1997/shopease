import image from '../assets/no-order-placed.png';

const NoOrderPlaced = () => {
  return (
    <main className='page-height px-12 py-10 flex justify-center'>
      <div className='flex flex-col items-center'>
        <img className='w-80' src={image} alt='empty-orders' />
        <h1 className='mt-10 text-2xl'>You haven't placed any order yet!</h1>
        <p className='mt-4 text-gray-500'>
          Order section is empty. After placing order, You can track them from here!
        </p>
      </div>
    </main>
  );
};

export default NoOrderPlaced;
