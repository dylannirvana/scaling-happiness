if (process.env.NODE_ENV === 'production') {
  var Stripe = StripeAPI('sk_live_aAfvkEPIh9XcFgkxPAfjs1s1'); //for now test too, but in future prod
} else {
  var Stripe = StripeAPI('sk_test_8gP83mTIOFcn9Y0H3YAqwrgi'); //test  
}



Meteor.methods({

createStripeCustomer: function(token) {
  var userId = Meteor.user()._id;
  var stripeCustomersCreateSync = Meteor.wrapAsync(Stripe.customers.create, Stripe.customers);

  try {
    var result = stripeCustomersCreateSync({
      description: 'GateKeyMusic Pro customer',
      source: token,
      email: Meteor.user().username,
      plan: "gatekeymusic_pro"
    });
    //console.log(result);
    // do whatever you want with the result
    return result;
  
  } catch(error) {
    //console.log("error", error);
  }
},

updateStripePayment: function(token, customer) {
  //console.log(token);
  var stripeCustomersUpdateSync = Meteor.wrapAsync(Stripe.customers.update, Stripe.customers);
  // var result = stripeCustomersUpdateSync({
  //     source: token
  //   });
  //   console.log(result);
  //   //return result;

  try {
    var result = stripeCustomersUpdateSync(customer, {
      source: token
    });
    //console.log(result);
    return result;
  
  } catch(error) {
    console.log('error updating account');
    console.log(error);
    return false; 
  }

},

deleteStripeCustomer: function(customer) {
  var stripeCustomersDeleteSync = Meteor.wrapAsync(Stripe.customers.del, Stripe.customers);
  try {
    var result = stripeCustomersDeleteSync(customer);
    return result;
  
  } catch(error) {
    console.log('error updating account');
    console.log(error);
    return false; 
  }
},


chargeStripeCard: function(token) {
  console.log(token)
//   Stripe.charges.create({
//     amount: 1000,
//     currency: "usd",
//     source: token, // obtained with Stripe.js
//     description: "Musician account payment"
//   }, function(err, charge) {
//     console.log(err);
//     console.log(charge);
//     // asynchronously called
// });
  console.log('hitting this 71');
  console.log(token);
  var stripeChargeCard = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

  console.log(stripeChargeCard);

  try {
    console.log('trying');
    var result = stripeChargeCard({
      description: 'Musician account payment',
      source: token,
      amount: 1000,
      currency: "usd"
    });
    console.log('stripeChargeCard');
    console.log(stripeChargeCard);
    console.log('result');
    console.log(result);
    // do whatever you want with the result
    return result;
  
  } catch(err) {
    console.log('catching error');
    console.log(err);
    //console.log(charge);
  }

},


stripeBackProject: function(token, amount, description) {

  var stripeChargeCard = Meteor.wrapAsync(Stripe.charges.create, Stripe.charges);

  console.log(stripeChargeCard);

  try {
    console.log('trying');
    var result = stripeChargeCard({
      description: description,
      source: token,
      amount: amount*100,
      currency: "usd"
    });
    console.log('stripeChargeCard');
    console.log(stripeChargeCard);
    console.log('result');
    console.log(result);
    // do whatever you want with the result
    return result;
  
  } catch(err) {
    console.log('catching error');
    console.log(err);
    //console.log(charge);
  }

}

});