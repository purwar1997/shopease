import { Link } from 'react-router-dom';

const products = [
  {
    id: '1',
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: '2',
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: '3',
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: '4',
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
];

const ProductList = () => {
  return (
    <div className='grid grid-cols-3 gap-x-8 gap-y-10'>
      {products.map(product => (
        <Link key={product.id} to={product.id}>
          <div className='group'>
            <img
              className='rounded group-hover:opacity-80'
              src={product.imageSrc}
              alt={product.imageAlt}
            />

            <div className='mt-4 flex justify-between'>
              <div>
                <h3>{product.name}</h3>
                <p className='mt-1 text-gray-600'>{product.color}</p>
              </div>

              <p className='font-medium'>{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
