import image from '../assets/empty-orders.png';

const EmptyOrders = () => {
  return (
    <section className='h-full flex flex-col items-center justify-center'>
      <img className='w-80' src={image} alt='empty-orders' />
      <h1 className='mt-10 text-2xl'>You haven't placed any order yet!</h1>
      <p className='mt-4 text-gray-500'>
        Order section is empty. After placing order, You can track them from here!
      </p>
    </section>
  );
};

export default EmptyOrders;
