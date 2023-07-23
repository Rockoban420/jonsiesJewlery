import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
} from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import { getSinglePorduct } from '../utils/stripeApi';

function Detail() {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        price_id: itemInCart.price_id,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        price_id: itemInCart.price_id,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1, price_id: currentProduct.price_id },
      });
      console.log(currentProduct, 'currentProduct');
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1, price_id: currentProduct.price_id });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  useEffect(() => {
    getSinglePorduct(id).then((product) => {
      setCurrentProduct(product);
    });
  }, []);

  return (
    <>
      {currentProduct && cart ? (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 1 }}>
          <Link to="/Store">← Back to Products</Link>
          <Typography variant="h4" sx={{ color: '#674B3D', fontFamily: 'Ultra', my: 2 }}>
            {currentProduct.name}
          </Typography>

          <img src={`${currentProduct.image}`} alt={currentProduct.name} style={{ width: '70%' }} />

          <Typography variant="h5" sx={{ fontFamily: 'Ultra', color: '#EC6C44' }}>Price: ${currentProduct.price}</Typography>

          <Typography variant="body1" sx={{ my: 2 }}>
            {currentProduct.description}
          </Typography>

          <Typography variant="body1" sx={{ my: 2 }}>
            <Button variant="contained" sx={{ backgroundColor: '#EC6C44', color: 'white', mx: 1 }} onClick={addToCart}>
              Add to Cart
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#F4B19C', color: 'white' }}
              disabled={!cart.find((p) => p._id === currentProduct._id)}
              onClick={removeFromCart}
            >
              Remove from Cart
            </Button>
          </Typography>
        </Container>
      ) : null}
      <Cart />
    </>
  );
}

export default Detail;
