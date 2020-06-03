import React from "react";
import { Card } from "antd";

const LifetimeSales = ({ currency, amount }) => {
  return (
    <div>
      <Card title='Lifetime Sales' style={{ width: 300 }}>
        {amount > 0 ? (
          <p className='earnings'>
            <span>{currency}</span>
            {amount}
          </p>
        ) : (
          <p>No sales</p>
        )}
      </Card>
    </div>
  );
};

export default LifetimeSales;
