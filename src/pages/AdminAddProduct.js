import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNewProductAsync } from '../app/slices/productSlice';
import { productInputs } from '../utils/formInputs';
import { classNames } from '../services';
import InputControl from '../components/InputControl';
import TextareaControl from '../components/TextareaControl';
import ButtonLoader from '../components/ButtonLoader';

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
  });

  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setStatus('pending');
      await dispatch(addNewProductAsync(product)).unwrap();
      navigate('..', { relative: 'path' });
    } catch (error) {
      console.log(error);
    } finally {
      setStatus('idle');
    }
  };

  return (
    <main className='page-height px-12 py-10 flex flex-col items-center gap-10'>
      <h1 className='text-3xl'>Add new product</h1>

      <form className='max-w-2xl w-full space-y-5' onSubmit={handleSubmit}>
        {productInputs.map(input =>
          input.type ? (
            <InputControl
              key={input.id}
              {...input}
              value={product[input.name]}
              onChange={handleChange}
            />
          ) : (
            <TextareaControl
              key={input.id}
              {...input}
              value={product[input.name]}
              onChange={handleChange}
            />
          )
        )}

        <button
          className={classNames(
            'w-full h-12 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 flex justify-center items-center',
            status === 'pending' ? 'cursor-wait' : ''
          )}
          type='submit'
          disabled={status === 'pending'}
        >
          {status === 'pending' ? <ButtonLoader /> : 'Add product'}
        </button>
      </form>
    </main>
  );
};

export default AdminAddProduct;
