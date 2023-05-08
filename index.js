const express = require('express');
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/stripe/link/:accountId', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.stripe_key);
        const accountLinks = await stripe.accountLinks.create({
            account: params.accountId,
            refresh_url: process.env.stripe_refresh_url+params.accountId,
            return_url: process.env.stripe_return_url+params.accountId,
            type: 'account_onboarding',
          });
          res.send(accountLinks)
    } catch (err){
        throw err;
    }
})

// Connect callback to attach user with company/org or wahtever entity we want to
app.get('/stripe/callback/url/str', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.stripe_key);
    
        const accountLinks = await stripe.account.retrieve(request.query.accountId);
        let updatedObject = {
            accountName: accountLinks.company ? accountLinks.company.name : 'No name',
            status: 'active',
            connected: true
        };
        await this.stripeService.updateStripeByaccountId(request.query.accountId, updatedObject);
        res.redirect(`${process.env.FEUrl}/apps/stripe`);

    } catch (err){
        throw err;
    }
})

// create payment method of a customer
app.get('/stripe/create/paymentMethod/:pmMethod', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.stripe_key);
 
        const customer = await stripe.customers.create({
            email: 'jenny.rosen@example.com',
            payment_method: params.pmMethod,
            invoice_settings: {
              default_payment_method: params.pmMethod,
            },
          }, {
            stripeAccount: 'acct_id_of_the_customer',
          
          });

          res.send(customer)
    } catch (err){
        throw err;
    }
})

// create payment Intent for a customer
app.get('/stripe/charge/:customerId', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.stripe_key);
 
        const paymentIntent = await stripe.charges.create({
            amount: 1000,
            currency: 'usd',
            customer: params.customerId,
          }, {
            stripeAccount: 'acct_id_of_the_customer',
          
          });

          res.send(paymentIntent)

    } catch (err){
        throw err;
    }
})

// Attach payment Method with customer
app.get('/stripe/attach/paymentMethod/:pmMethod/:customerId', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.stripe_key);
 
        const paymentMethod = await stripe.paymentMethods.attach(
            params.pmMethod,
            {customer: params.customerId}, {
                stripeAccount: 'acct_1JknK8QhQri3DjRE',
              
              }
          );

          res.send(paymentMethod)
          
    } catch (err){
        throw err;
    }
})

// Attach payment Method with customer
app.get('/stripe/delete/paymentMethod/:pmMethod/:customerId', async (req, res) => {
    try {
        const stripe = require('stripe')(process.env.stripe_key);
 
        const deletedSource = await stripeAccount.customers.deleteSource(params.customerId, params.pmMethod);

          res.send(deletedSource)
          
    } catch (err){
        throw err;
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})