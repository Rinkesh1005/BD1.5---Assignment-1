const express = require('express');
let cors = require('cors');
const { resolve } = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('static'));

app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);

  let totalCartPrice = newItemPrice + cartTotal;
  res.send(totalCartPrice.toString());
});

app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  let result;

  if (isMember) {
    result = cartTotal = cartTotal - cartTotal * (10 / 100);
  }
  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let cartAmount = cartTotal * (5 / 100);

  res.send(cartAmount.toString());
});

app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  let deliveryTime;

  if (shippingMethod === 'express') {
    deliveryTime = distance / 100;
  } else {
    deliveryTime = distance / 50;
  }

  res.send(deliveryTime.toString());
});

app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  let result = weight * distance * 0.1;

  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);
  let loyaltyPoints = 2 * purchaseAmount;

  res.send(loyaltyPoints.toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
