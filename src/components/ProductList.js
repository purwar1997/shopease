const products = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    imageAlt: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
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
    <section>
      <h2 className='text-2xl font-semibold'>All Products</h2>

      <div className='mt-8 grid grid-cols-4 gap-x-8'>
        {products.map(product => (
          <div key={product.id}>
            <img className='rounded' src={product.imageSrc} alt={product.imageAlt} />

            <div className='mt-3 flex justify-between'>
              <div>
                <h3 className='font-medium'>{product.name}</h3>
                <p className='mt-1 text-gray-600'>{product.color}</p>
              </div>

              <p className='text-gray-700 font-medium'>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
