import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as creators from '../../state/actionCreators';
import AllProducts from './AllProducts';
import StoreNav from './StoreNav';
import CategoryPicker from '../categories/CategoryPicker';

function StoreView(props) {
  const sellerId = props.match.params.id.split('-').pop();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.user);
  const [cat, setCat] = useState('');
  const [currentCat, setCurrentCat] = useState();
  useEffect(() => {
    dispatch(creators.getProducts(sellerId));
    dispatch(creators.getStore(sellerId));
    dispatch(creators.setStoreUrl(window.location.href));
  }, [sellerId, dispatch, currentCat]);
  const inventory = useSelector((state) => state.store);
  // const testProducts = inventory;
  const [categorySearch, setCategorySearch] = useState('');
  const change = (e) => {
    setCategorySearch(e.target.value.toLowerCase());
  };
  // Turning the categories into an Array
  const storeCategories = inventory.map((item) => {
    return item.category;
  });
  // grabbing all of the Unique Categories
  const uniqueCategories = [...new Set(storeCategories)];
  // creating a filter based on 'setCategorySearch
  let filteredProducts = inventory.filter((item) => {
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
          // this will be deleted on styling fix
          style={{
            margin: '100px',
          }}
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
          inventory={inventory}
          categorySearch={categorySearch}
          setCategorySearch={setCategorySearch}
        />
      </div>
    </div>
  );
}

export default StoreView;
