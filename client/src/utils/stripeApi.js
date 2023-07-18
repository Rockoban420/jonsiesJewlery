const stripe = require('stripe')('sk_test_51NTbuDBXuASLC5T1znOhIU1hE98xfESEYvrRDnr7TcTP8wSbHD0nLELlUM20ocWRwWQnhipxau0GRuPtG4TdIj3y00isJYTemM');
 // This is where we'll store the full list of products from Stripe

const allProducts = async () => {
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
        });
    }
    return fullProductList;
}

module.exports = {
    allProducts,
};