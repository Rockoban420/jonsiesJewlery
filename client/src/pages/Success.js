import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';
import { CLEAR_CART } from '../utils/actions';
import { useStoreContext } from '../utils/GlobalState';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);
  const [state, dispatch] = useStoreContext();


  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      console.log(cart, 'cart');
      const products = [{}];
      cart.forEach((item) => {
        console.log(item, 'item');
            products.push({
              name: item.name,
              price: item.price,
              quantity: item.purchaseQuantity,
              image: item.image
            });
          }) 
      products.shift();
      if (products.length) {
        const data2 = [];
        let i = products.length;
        while (i !== 0 ) {
          i = i - 1;
          const {
            name,
            price,
            quantity,
            image
          } = products[i];
          const { data } = await addOrder({variables: {name: name, price: price, quantity: quantity, image: image}});
          data2.push(data);
        } 

        dispatch({ type: CLEAR_CART });
      }          

      // setTimeout(() => {
      //   window.location.assign('/');
      // }, 3000);
    }

    saveOrder();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        <h2>You will now be redirected to the home page</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
