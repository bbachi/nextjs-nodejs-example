const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

const stripe = require('stripe')('sk_test_51N5k3tE6KvMUeVI3UrgPqYsIFfG3T8EnuLPBAAPw97Z3Ck9hP5WAvfm03VmHscwbgPn7DUvS57qq4AXcdlTDzRwp00RQp7KB1J');
// place holder for the data
const users = [];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/out')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/out/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

app.post('/api/create-checkout-session', async (req, res) => {
  console.log('/api/create-checkout-session called!')
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Example Product',
          },
          unit_amount: 200,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000?success=true',
    cancel_url: 'http://localhost:3000?success=false',
  });
  console.log(session);
  res.json(session);
});
