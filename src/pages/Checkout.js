const Checkout = () => {
  return (
    <section className='grid grid-cols-2 gap-10'>
      <section className='divide-y divide-gray-200'>
        <div>
          <h2>Contact information</h2>

          <div>
            <label htmlFor='email'>Email address</label>
            <input type='email' id='email' />
          </div>

          <div>
            <label htmlFor='email'>Phone</label>
            <input type='email' id='email' />
          </div>
        </div>

        <div>
          <h2>Shipping information</h2>

          <div>
            <div>
              <label htmlFor=''>First name</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Last name</label>
              <input type='text' />
            </div>
          </div>

          <div>
            <label htmlFor=''>Address</label>
            <input type='text' />
          </div>

          <div>
            <label htmlFor=''>Apartment, suite, flat etc.</label>
            <input type='text' />
          </div>

          <div>
            <div>
              <label htmlFor=''>City</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Country</label>
              <select name='' id=''>
                <option value=''></option>
                <option value=''></option>
                <option value=''></option>
              </select>
            </div>
          </div>

          <div>
            <div>
              <label htmlFor=''>State / Province</label>
              <input type='text' />
            </div>

            <div>
              <label htmlFor=''>Postal code</label>
              <input type='text' />
            </div>
          </div>
        </div>

        <div>
          <h2>Delivery method</h2>
        </div>
      </section>

      <section>
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
      </section>
    </section>
  );
};

export default Checkout;
