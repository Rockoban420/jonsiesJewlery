import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';
import {
  checkout,
  allProducts,
} from '../../utils/stripeApi';

const stripePromise = loadStripe('pk_test_51NTbuDBXuASLC5T1S67fet9OLzbRIVR4OGe8Tx33XszJ7JsgyJ54fwkB6D8B0pYxoUZmund3zlv88YF0hJwRr8Ad004ByNgU02');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [checkoutData, setCheckoutData] = React.useState([]);
  const [allStripeProducts, setAllStripeProducts] = React.useState([]);
  const [doCheckout, setDoCheckout] = React.useState(false);
  const [sessionData, setSessionData] = React.useState([]);


  useEffect(() => {
    const seeAllProds = async () => {
      const fullProductList = await allProducts();
      return fullProductList;
    }
    const prods = seeAllProds();
    prods.then((res) => {
      setAllStripeProducts(res);
    });
  }, [allStripeProducts]);


  useEffect(() => {
    if (doCheckout) {
      checkout(checkoutData).then((res) => {
        setSessionData(res);
      });
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: sessionData?.session?.id });
        console.log('redirecting');
      });
    }
    setDoCheckout(false);
}, [doCheckout, checkoutData]);

useEffect(() => {
  async function getCart() {
    const cart = await idbPromise('cart', 'get');
    dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
  }

  if (!state.cart.length) {
    getCart();
  }
}, [state.cart.length, dispatch]);

function toggleCart() {
  dispatch({ type: TOGGLE_CART });
}

function calculateTotal() {
  let sum = 0;
  state.cart.forEach((item) => {
    sum += item.price * item.purchaseQuantity;
  });
  return sum.toFixed(2);
}

function submitCheckout() {
  const productIds = [{}];

  console.log(state.cart, 'cart');
  // state.cart.forEach((item) => {
  //   for (let i = 0; i < item.purchaseQuantity; i++) {
  //     productIds.push({
  //       productId: item._id,
  //       priceId: item.price_id
  //     });
  //   }
  // });
  for (let i = 0; i < state.cart.length; i++) {
    productIds.push({
      productId: state.cart[i]._id,
      priceId: state.cart[i].price_id
    });
  }
  console.log(productIds, 'productIds');
  setCheckoutData(productIds);
  setDoCheckout(true);
}

if (!state.cartOpen) {
  return (
    <div className="cart-closed" onClick={toggleCart}>
      <span role="img" aria-label="trash">
        🛒
      </span>
    </div>
  );
}

return (
  <div className="cart">
    <div className="close" onClick={toggleCart}>
      [close]
    </div>
    <h2>Shopping Cart</h2>
    {state.cart.length ? (
      <div>
        {state.cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}

        <div className="flex-row space-between">
          <strong>Total: ${calculateTotal()}</strong>

          {Auth.loggedIn() ? (
            <button onClick={submitCheckout}>Checkout</button>
          ) : (
            <span>(log in to check out)</span>
          )}
        </div>
      </div>
    ) : (
      <h3>
        <span role="img" aria-label="shocked">
          😱
        </span>
        You haven't added anything to your cart yet!
      </h3>
    )}
  </div>
);
};

export default Cart;
