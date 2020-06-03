import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import * as creators from '../../state/actionCreators';

const CategoryPicker = ({ uniqueCategories, setCategorySearch }) => {
  const inventory = useSelector((state) => state.store);
  const dispatch = useDispatch();
  const sellerId = localStorage.getItem('sellerId');
  console.log('inventory', inventory);
  useEffect(() => {
    dispatch(creators.getProducts(sellerId));
    dispatch(creators.getStore(sellerId));
    dispatch(creators.setStoreUrl(window.location.href));
  }, [sellerId, dispatch]);

  return (
    <div
      style={{
        margin: '100px',
      }}>
      <div className='optionWrapper'>
        <button
          className='categoryButton'
          onClick={() => {
            setCategorySearch('');
          }}>
          All
        </button>
        {uniqueCategories &&
          uniqueCategories.map((item) => {
            return (
              <button
                className='categoryButton'
                onClick={() => {
                  setCategorySearch(item.toLowerCase());
                }}>
                {item}
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryPicker;
