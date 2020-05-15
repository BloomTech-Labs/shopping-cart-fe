import React from "react";
import { Card } from "antd";

const MonthlySales = ({ currency, monthSales }) => {
  return (
    <div>
      <Card title='Monthly Sales' style={{ width: 300 }}>
        {monthSales > 0 ? (
          <p className='earnings'>
            <span>{currency}</span>
            {monthSales}
          </p>
        ) : (
          <p>No sales</p>
        )}
      </Card>
    </div>
  );
};

export default MonthlySales;
