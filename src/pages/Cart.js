import { Link } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: '$90.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas font-medium straps and handle, drawstring top, and front zipper pouch.',
  },
  {
    id: 3,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: '$32.00',
    quantity: 1,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas  straps and handle, drawstring top, and front zipper pouch.',
  },
];

const Cart = () => {
  return (
    <section>
      <h1 className='text-3xl'>Shopping cart</h1>

      <div className='mt-12 grid grid-cols-5 gap-14 items-start'>
        <div className='col-start-1 col-span-3'>
          <ul className='divide-y border-y border-gray-200'>
            {products.map(product => (
              <li className='py-9 flex gap-6' key={product.id}>
                <div className='w-40 h-40 border border-gray-200 rounded-lg overflow-hidden'>
                  <img
                    className='w-full h-full object-cover object-center'
                    src={product.imageSrc}
                    alt={product.imageAlt}
                  />
                </div>

                <div className='flex-1 flex flex-col justify-between'>
                  <div className='flex justify-between'>
                    <div>
                      <h3 className='text-lg'>{product.name}</h3>
                      <p className='mt-px text-gray-400'>{product.color}</p>
                    </div>

                    <p className='text-lg font-medium'>{product.price}</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <select
                      className='pl-2.5 pr-8 py-1 ring-1 ring-gray-300 rounded focus:ring-2 focus:ring-indigo-500'
                      id='quantity'
                      value={1}
                    >
                      {[...new Array(10)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>

                    <button className='text-indigo-500 font-medium'>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='cols-start-5 col-span-2 bg-gray-50 rounded-lg p-8'>
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

          <div className='mt-6 space-y-5'>
            <button className='w-full block bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:bg-indigo-700'>
              Checkout
            </button>

            <p className='text-center'>
              or{' '}
              <Link className='text-indigo-600 font-medium hover:text-indigo-500' to='/'>
                Continue Shopping
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
