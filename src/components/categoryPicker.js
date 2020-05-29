import React from 'react';
// the route is '/category'

const CategoryPicker = () => {
  const categories = [
    'Shirt',
    'Shoes',
    'Shoes',
    'Shoes',
    'Shorts',
    'Jeans',
    'Jeans',
  ];
  const uniqueCategories = [...new Set(categories)];
  console.log(uniqueCategories);

  return (
    <div>
      <h1>Is this rendering?</h1>
      <button onClick={console.log('all of them')}>All</button>
      {uniqueCategories.map((item) => {
        return <button onClick={console.log('button clicked')}>{item}</button>;
      })}
    </div>
  );
};

export default CategoryPicker;
