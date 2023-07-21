import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import Jumbotron from '../components/Jumbotron';
import { ADD_ORDER } from '../utils/mutations';
import { idbPromise } from '../utils/helpers';

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

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
      console.log(products, 'products');
      console.log('step 1');
      if (products.length) {
        const data2 = [];
        let i = products.length;
        while (i !== 0 ) {
          i = i - 1;
          console.log('step 2');
          const {
            name,
            price,
            quantity,
            image
          } = products[i];
          const { data } = await addOrder({variables: {name: name, price: price, quantity: quantity, image: image}});
          console.log('step 3');
          data2.push(data);
          console.log(data2, 'data2');
        } 
        console.log(data2, 'data2');
        const productData = data2.addOrder.products;

        productData.forEach((item) => {
          idbPromise('cart', 'delete', item);
        });
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
