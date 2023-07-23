import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import spinner from '../../assets/spinner.gif';
import {
  allProducts,
} from '../../utils/stripeApi';

import { Typography } from '@mui/material';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const [allStripeProducts, setAllStripeProducts] = React.useState([]);


  useEffect(() => {
    const seeAllProds = async () => {
    const fullProductList = await allProducts();
    return fullProductList;
    }
    const prods = seeAllProds();
    prods.then((res) => {
      setAllStripeProducts(res);
    });
  }, [dispatch]);

  if (allStripeProducts.length) {
    for (let i = 0; i < allStripeProducts.length; i++) {
      console.log(allStripeProducts[i].quantity);
      if (allStripeProducts[i].quantity == 0) {
        allStripeProducts.splice(i, 1);
      }
    }
  }

  return (
    <div className="my-2">
      <Typography variant="h3" component="h2" sx={{ fontFamily: 'Ultra', color: '#674B3D', textAlign: 'center' }} >
        Products:
      </Typography>
      {allStripeProducts.length ? (
        <div className="flex-row">
          {allStripeProducts.map((product) => ( 
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
              price_id={product.price_id}
            />
          ))}
        </div>
      ) : (
        <Typography variant="h6" component="h3" sx={{ color: '#EEABCE' }}>
          You haven't added any products yet!</Typography>
      )}
    </div>
  );
}

export default ProductList;
