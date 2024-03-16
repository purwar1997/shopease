import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

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
    <section className='max-w-3xl mx-auto flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Shopping cart</h1>

      <div className='w-full'>
        <ul className='divide-y divide-gray-200 border-y border-gray-200'>
          {products.map(product => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>

        <div className='mt-8'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-lg font-medium'>Subtotal</p>
              <p className='mt-1 text-gray-500 text-sm'>
                Shipping and taxes will be calculated at checkout.
              </p>
            </div>

            <p className='text-lg font-medium'>$96.00</p>
          </div>

          <div className='mt-7'>
            <Link to='/checkout'>
              <button className='w-full block bg-indigo-600 py-2.5 rounded-md text-white font-medium hover:bg-indigo-700'>
                Checkout
              </button>
            </Link>

            <p className='mt-5 text-center'>
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
