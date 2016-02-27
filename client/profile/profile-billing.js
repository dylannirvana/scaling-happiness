Template.profileBilling.rendered = function() {
  

}

Template.profileBilling.helpers({
  'billing': function(){
    if(Meteor.user() && Meteor.user().profile.billing){
      //console.log(Meteor.user().profile.billing.sources.data[0]);
      return Meteor.user().profile.billing.sources.data[0];
    } 
  }
});


Template.profileBilling.events({

  'submit #profile-billing': function(e) {
    e.preventDefault();
    var form = $('#profile-billing');
    var formValues = GK.convertSerializedArray(form.serializeArray()); //serilize form array
    console.log(formValues);
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {
        'profile.billing': {},
        'profile.billing.firstname': formValues.firstname,
        'profile.billing.lastname': formValues.lastname
      }
    }, function(error){
      if(error){
        toastr.error(error.message, 'Missing value'); 
      } else {
        toastr.success('Billing info updated', 'Success!');
        if(Meteor.user().profile.accountType === 'fan'){
          createProUser();  
        } else if( Meteor.user().roles[0] === 'musician' && !(Meteor.user().profile.paid) ){
          musicianPayment();
        } else {
          updatePayment();
        }
        
      }
      //console.log(error);
    });


    var createProUser = function() {
      // creating tokenized card and send it to server in order to create new customer with
      // tokenized credit card
      Stripe.card.createToken(form, stripeResponseHandler);

      function stripeResponseHandler(status, response){      
        if(!response.error && response.id) {
          // Disable the submit button to prevent repeated clicks
          form.find('#submit').prop('disabled', true);

          var token = response.id; //tokenized credit card

          Meteor.call('createStripeCustomer', token, function(err, result) {
            // when customer successfully saved in Stripe, udate user profile to PRO
            //Roles.setUserRoles(Meteor.userId(), 'pro');
            Meteor.users.update(Meteor.user()._id, {$set: {
              'profile.billing': result,
              'profile.accountType': 'member'
            }});
            toastr.success('Congratulations', 'Success!');                     
          });
        } else {          
          toastr.error(response.error.message, 'Error!');
        }
      }
    }


    var updatePayment = function() {
      Stripe.card.createToken(form, stripeResponseHandler);

      function stripeResponseHandler(status, response){      
        console.log(response);
        if(!response.error && response.id) {

          var token = response.id; //tokenized credit card
          var customer = Meteor.user().profile.billing.id;
          Meteor.call('updateStripePayment', token, customer, function(err, result) {
            // when customer successfully saved in Stripe, udate user profile to PRO
            console.log(err);
            console.log(result);
            Meteor.users.update(Meteor.user()._id, {$set: {
              'profile.billing': result
            }});
          });
        } else {
          toastr.error(response.error.message, 'Error!');
        }
      }
    };

    
    var musicianPayment = function() {
      Stripe.card.createToken(form, stripeResponseHandler);

      function stripeResponseHandler(status, response) {
        
        console.log(response);
        if(!response.error && response.id) {

          var token = response.id; //tokenized credit card
          Meteor.call('chargeStripeCard', token, function(err, result) {
            // when customer successfully saved in Stripe, udate user profile to PRO
            console.log(err);
            console.log(result);
            Meteor.users.update(Meteor.user()._id, {$set: {
              'profile.paid': true
            }});
          });
        } else {
          toastr.error(response.error.message, 'Error!');
        }
      }
    }
    


  } // end submit 

});