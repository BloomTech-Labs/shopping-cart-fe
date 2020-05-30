import React, { useState } from 'react';
import ProductCard from './ProductCard';
// the route is '/category'

const CategoryPicker = (props) => {
  const [cat, setCat] = useState('');
  const storeCategories = products.map((item) => {
    return item.category;
  });
  const uniqueCategories = [...new Set(storeCategories)];

  let filteredProducts = products.filter((item) => {
    return item.category.toLowerCase() === cat.toLowerCase();
  });
  return (
    <div>
      <div className='optionWrapper'>
        <button
          className='categoryButton'
          onClick={() => {
            setCat('');
          }}>
          All
        </button>
        {uniqueCategories &&
          uniqueCategories.map((item) => {
            return (
              <button
                className='categoryButton'
                onClick={() => {
                  setCat(item);
                }}>
                {item}
              </button>
            );
          })}
      </div>
      <div className='cardContainer'>
        {cat.length !== 0
          ? filteredProducts.map((item) => {
              return (
                <ProductCard
                  image={item.images[0]}
                  productName={item.productName}
                  price={item.price}
                />
              );
            })
          : products.map((item) => {
              return (
                <ProductCard
                  image={item.images[0]}
                  productName={item.productName}
                  price={item.price}
                />
              );
            })}
      </div>
    </div>
  );
};

export default CategoryPicker;

const products = [
  {
    productName: 'Speed Boat',
    price: '$200.00',
    category: 'Vehicles',
    description: 'The speediest speedboat',
    images: [
      'https://images.unsplash.com/photo-1542397284385-6010376c5337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80',
    ],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
  {
    productName: 'Hippie Mobile',
    price: '$300.00',
    category: 'Vehicles',
    description: 'The hippest van ever',
    images: [
      'https://images.unsplash.com/photo-1579279218938-a46994417a8b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      'https://images.unsplash.com/photo-1584303038786-51ff2a838d13?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    ],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
  {
    productName: 'Poke Ball',
    price: '$20.00',
    category: 'Tools',
    description: 'The hippest van ever',
    images: [
      'https://images.unsplash.com/photo-1542779283-429940ce8336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      'https://images.unsplash.com/photo-1542887486-c0aeb6d2fc46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    ],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
  {
    productName: 'Gannondorf',
    price: '$666.00',
    category: 'Villain',
    description: 'The best soccer ball',
    images: ['https://i.gyazo.com/3f57a771a9e981ef9f6b0fc80a899cf9.jpg'],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
  {
    productName: 'Link',
    price: '$9999.00',
    category: 'Hero',
    description: 'The best soccer ball',
    images: ['https://i.gyazo.com/ad58c078a67205b6e4df2126e3ca92f4.png'],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
  {
    productName: 'Soccer Ball',
    price: '$2000.00',
    category: 'Sports',
    description: 'The best soccer ball',
    images: [
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80',
      'https://images.unsplash.com/photo-1570498839593-e565b39455fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
    ],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
  {
    productName: 'Zelda',
    price: '$9999.00',
    category: 'Hero',
    description: 'The bestest princess',
    images: [
      'https://i.gyazo.com/7db90642f805684530e9dc8b693d5e08.png'
    ],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
];
