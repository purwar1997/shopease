const Checkout = () => {
  return (
    <div>
      <h2 className='text-lg'>Order summary</h2>

      <ul className='mt-4'>
        <li className='py-3.5 flex justify-between border-b border-gray-200'>
          <span>Subtotal</span>
          <span className='font-medium'>$400.00</span>
        </li>

        <li className='py-3.5 flex justify-between border-b border-gray-200'>
          <span>Shipping estimate</span>
          <span className='font-medium'>$10.00</span>
        </li>

        <li className='py-3.5 flex justify-between border-b border-gray-200'>
          <span>Tax estimate</span>
          <span className='font-medium'>$5.00</span>
        </li>
      </ul>

      <div className='mt-4 flex justify-between font-medium'>
        <span>Order total</span>
        <span>$515.00</span>
      </div>
    </div>
  );
};

export default Checkout;
