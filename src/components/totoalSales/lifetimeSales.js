import React from 'react';
import dollar from '../../images/sales.svg';

const LifetimeSales = ({ amount, monthSales }) => {
	return (
		<div className="salesContainer">
			{amount > 0 ? (
				<div className="salesSection">
					<div className="sales">
						<img src={dollar} style={{ width: '10rem', height: '5rem' }} alt="dollar" />
						<div className="salesDiv">
							<h3>Sales this week</h3>
							<h2>{amount}</h2>
						</div>
					</div>
					<div className="sales">
						<img src={dollar} style={{ width: '10rem', height: '5rem' }} alt="dollar" />
						<div className="salesDiv">
							<h3>Sales this month</h3>
							<h2>{monthSales}</h2>
						</div>
					</div>
					<div className="sales">
						<img src={dollar} style={{ width: '10rem', height: '5rem' }} alt="dollar" />
						<div className="salesDiv">
							<h3>Sales this year</h3>
							<h2>{amount}</h2>
						</div>
					</div>
				</div>
			) : (
				<div className="salesSection">
					<div className="sales">
						<img src={dollar} style={{ width: '10rem', height: '5rem' }} alt="dollar" />
						<div className="salesDiv">
							<h3>Sales this week</h3>
							<h2>No sales yet</h2>
						</div>
					</div>
					<div className="sales">
						<img src={dollar} style={{ width: '10rem', height: '5rem' }} alt="dollar" />
						<div className="salesDiv">
							<h3>Sales this month</h3>
							<h2>No sales yet</h2>
						</div>
					</div>
					<div className="sales">
						<img src={dollar} style={{ width: '10rem', height: '5rem' }} alt="dollar" />
						<div className="salesDiv">
							<h3>Sales this year</h3>
							<h2>No sales yet</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default LifetimeSales;
