import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }
  console.log(user, 'user');

  return (
    <>
      <div className="container my-1">
        <Link to="/">← Back to Products</Link>

        {user ? (
          <>
            <Typography variant="h4" sx={{ fontFamily: 'Ultra', color: '#674B3D' }} gutterBottom>
              Order History for {user.firstName} {user.lastName}
            </Typography>
            {user.orders.map((order) => (
              <div key={order._id} className="my-2">
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div className="flex-row">
                  {order.products.map(({ name, price }, index) => (
                    <div key={index} className="card px-1 py-1">
                        <p>{name}</p>
                      <div>
                        <span>${price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
            }
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
