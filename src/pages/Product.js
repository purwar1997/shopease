import { useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import { classNames } from '../utils/helpers';

const product = {
  id: 2,
  name: 'Medium Stuff Satchel',
  href: '#',
  color: 'Blue',
  price: '$32.00',
  description:
    'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
  quantity: 1,
  avgRating: 4.0,
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
  imageAlt:
    'Front of satchel with blue canvas font-medium straps and handle, drawstring top, and front zipper pouch.',
};

const Product = () => {
  const { productId } = useParams();

  return (
    <section className='grid grid-cols-2 gap-10'>
      <div className='border border-gray-200 rounded-xl overflow-hidden'>
        <img className='object-cover object-center' src={product.imageSrc} alt={product.imageAlt} />
      </div>

      <div className='space-y-8'>
        <div>
          <h1 className='text-3xl'>{product.name}</h1>
          <h2 className='mt-1.5 text-2xl'>{product.price}</h2>
          <div className='mt-3 flex gap-1'>
            {[...new Array(5)].map((_, index) => (
              <span
                className={classNames(
                  'text-lg',
                  index < product.avgRating ? 'text-indigo-500' : 'text-gray-300'
                )}
                key={index}
              >
                <FaStar />
              </span>
            ))}
          </div>
        </div>

        <p>{product.description}</p>

        <button className='w-80 py-3 bg-indigo-600 text-lg text-white font-medium rounded-md hover:bg-indigo-700'>
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default Product;
