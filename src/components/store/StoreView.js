import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';
import AllProducts from './AllProducts';
import StoreNav from './StoreNav';
import CategoryPicker from '../categories/CategoryPicker';

function StoreView(props) {
  const sellerId = props.match.params.id.split('-').pop();
  const dispatch = useDispatch();
  const cartContents = useSelector((state) => state.cart);
  const store = useSelector((state) => state.user);
  const [cat, setCat] = useState('');
  const [currentCat, setCurrentCat] = useState();
  useEffect(() => {
    dispatch(creators.getProducts(sellerId));
    dispatch(creators.getStore(sellerId));
    dispatch(creators.setStoreUrl(window.location.href));
  }, [sellerId, dispatch, currentCat]);
  const inventory = useSelector((state) => state.store);

  const [categorySearch, setCategorySearch] = useState('');
  const change = (e) => {
    setCategorySearch(e.target.value.toLowerCase());
  };
  // Turning the categories into an Array
  const storeCategories = testProducts.map((item) => {
    return item.category;
  });
  // grabbing all of the Unique Categories
  const uniqueCategories = [...new Set(storeCategories)];
  // creating a filter based on 'setCategorySearch
  let filteredProducts = testProducts.filter((item) => {
    return item.category.toLowerCase().includes(categorySearch);
  });

  // adding the objects to the state -> push that state to child component
  const storeDetails = store.user;
  const searchString = useSelector((state) => state.search);

  return (
    <div>
      <div>
        <StoreNav change={change} storeDetails={storeDetails} store={store} />
        <CategoryPicker
          categorySearch={categorySearch}
          setCategorySearch={setCategorySearch}
          currentCat={currentCat}
          cat={cat}
          storeCategories={storeCategories}
          setCat={setCat}
          uniqueCategories={uniqueCategories}
        />
        <AllProducts
          filteredProducts={filteredProducts}
          searchString={searchString}
          testProducts={testProducts}
          inventory={inventory}
          categorySearch={categorySearch}
          setCategorySearch={setCategorySearch}
        />
      </div>
    </div>
  );
}

export default StoreView;

const testProducts = [
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
    images: ['https://i.gyazo.com/7db90642f805684530e9dc8b693d5e08.png'],
    variantName: '',
    variantDetails: [
      {
        variantOption: '',
        variantPrice: '',
      },
    ],
  },
];
