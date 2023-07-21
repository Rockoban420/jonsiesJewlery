import React, { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import {
  allProducts,
} from '../../utils/stripeApi';

import { Typography } from '@mui/material';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

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
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
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
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
