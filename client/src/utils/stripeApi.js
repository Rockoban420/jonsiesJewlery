import Auth from '../utils/auth';
const stripe = require('stripe')('sk_test_51NTbuDBXuASLC5T1znOhIU1hE98xfESEYvrRDnr7TcTP8wSbHD0nLELlUM20ocWRwWQnhipxau0GRuPtG4TdIj3y00isJYTemM');
// This is where we'll store the full list of products from Stripe

export const getSinglePorduct = async (id) => {
    const product = await stripe.products.retrieve(id);
    console.log(product);
    const price = await stripe.prices.retrieve(product.default_price);
    const singleProduct = {
        _id: product.id,
        name: product.name,
        description: product.description,
        quantity: product.metadata.quantity,
        image: product.images[0],
        price: price.unit_amount / 100,
        price_id: price.id
    };
    return singleProduct;
}

export const allProducts = async () => {
    const fullProductList = [{}];
    const getAllProducts = await stripe.products.list({});
    const getAllPrices = await stripe.prices.list({});
    const products = getAllProducts.data;
    const prices = getAllPrices.data;
    for (let i = 0; i < products.length; i++) {
        fullProductList.push({
            _id: products[i].id,
            name: products[i].name,
            description: products[i].description,
            quantity: products[i].metadata.quantity,
            image: products[i].images[0],
            price: prices[i].unit_amount / 100,
            price_id: prices[i].id
        });
    }
    fullProductList.shift();
    return fullProductList;
}

export const checkout = async (sesh) => {
    const url = 'http://localhost:3000';
    const user = Auth.getProfile();
    console.log(user);
    // const url = new URL(session.headers.referer).origin;
    // const order = new Order({ products: session.products });
    const line_items = [];
    for (let i = 0; i < sesh.length; i++) {
        line_items.push({
            price: sesh[i].priceId,
            quantity: sesh[i].quantity,
        });
    }

    line_items.shift();

    console.log(line_items);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: line_items,
        mode: 'payment',
        customer_email: user.data.email,
        shipping_address_collection: {
            allowed_countries: ['US'],
        },
        success_url: `${url}/success`,
        cancel_url: `${url}/`
    });

    return { session };
}