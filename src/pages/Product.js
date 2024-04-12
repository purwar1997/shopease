import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa6';
import { classNames } from '../utils/helpers';

const Product = () => {
  const { productId } = useParams();

  const product = useSelector(state =>
    state.products.data.find(product => product.id === Number(productId))
  );

  return (
    <section className='grid grid-cols-2 gap-10'>
      <div className='border border-gray-200 rounded-xl overflow-hidden'>
        <img className='object-cover object-center' src={product.thumbnail} alt={product.title} />
      </div>

      <div className='space-y-8'>
        <div>
          <h1 className='text-3xl'>{product.title}</h1>
          <h2 className='mt-1.5 text-2xl'>₹{product.price}</h2>
          <div className='mt-3 flex gap-1'>
            {[...new Array(5)].map((_, index) => (
              <span
                className={classNames(
                  'text-lg',
                  index < product.rating ? 'text-indigo-500' : 'text-gray-300'
                )}
                key={index}
              >
                <FaStar />
              </span>
            ))}
          </div>
        </div>

        <p>{product.description}</p>

        <button className='w-80 block py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700'>
          Add to cart
        </button>
      </div>
    </section>
  );
};

export default Product;
