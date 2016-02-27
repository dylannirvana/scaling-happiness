Template.projectDetails.events({
  'click .fund-project-btn': function() {
    $('#hidden-form').show();
  },

  'click #delete-project': function() {
    var that = this;
    if(confirm('Are you sure you want to delete your project?')) {
      Projects.remove({_id: that._id}, function(){
        Router.go('allProjects');
      });
    }
  },

  'submit #project-billing': function(e) {
    e.preventDefault();
    var that = this;
    var form = $('#project-billing');
    var formValues = GK.convertSerializedArray(form.serializeArray()); //serilize form array
    console.log(formValues);
    console.log(that);
    Stripe.card.createToken(form, stripeResponseHandler);

    function stripeResponseHandler(status, response){      
      if(!response.error && response.id) {
        // Disable the submit button to prevent repeated clicks
        form.find('#submit').prop('disabled', true);

        var token = response.id; //tokenized credit card
        var amount = form.find('#amount').val();
        console.log('amount ', amount);

        Meteor.call('stripeBackProject', token, amount, that.title, function(err, result) {
          console.log(result);
          console.log(that.currentAmount);
          console.log(result.amount/100);
          var currentAmount = parseInt(that.currentAmount, 10);
          var contributedAmount = result.amount/100;
          // when customer successfully saved in Stripe, udate user profile to PRO
          // Roles.setUserRoles(Meteor.userId(), 'pro');
          Projects.update(that._id, {
            $set: {
                'currentAmount': currentAmount + contributedAmount
            },
            $push: {
                'contributors': Meteor.userId()
            }

            });
          $('#project-billing').hide();
          toastr.success('Congratulations', 'Success!');                     
        });
      } else {          
        toastr.error(response.error.message, 'Error!');
      }
    }

    // Projects.update({_id: that._id}, {
    //   $set: {
    //     'profile.billing.firstname': formValues.firstname,
    //     'profile.billing.lastname': formValues.lastname
    //   }
    // }, function(error){
    //   if(error){
    //     toastr.error(error.message, 'Missing value'); 
    //   } else {
    //     toastr.success('Billing info updated', 'Success!');
    //     if(Meteor.user().roles[0] === 'free'){
    //       createProUser();  
    //     } else if( Meteor.user().roles[0] === 'musician' && !(Meteor.user().profile.paid) ){
    //       musicianPayment();
    //     } else {
    //       updatePayment();
    //     }
        
    //   }
      //console.log(error);
    //});


    // var createProUser = function() {
    //   // creating tokenized card and send it to server in order to create new customer with
    //   // tokenized credit card
    //   Stripe.card.createToken(form, stripeResponseHandler);

    //   function stripeResponseHandler(status, response){      
    //     if(!response.error && response.id) {
    //       // Disable the submit button to prevent repeated clicks
    //       form.find('#submit').prop('disabled', true);

    //       var token = response.id; //tokenized credit card

    //       Meteor.call('createStripeCustomer', token, function(err, result) {
    //         // when customer successfully saved in Stripe, udate user profile to PRO
    //         Roles.setUserRoles(Meteor.userId(), 'pro');
    //         Meteor.users.update(Meteor.user()._id, {$set: {
    //           'profile.billing': result
    //         }});
    //         toastr.success('Congratulations', 'Success!');                     
    //       });
    //     } else {          
    //       toastr.error(response.error.message, 'Error!');
    //     }
    //   }
    // }


    // var updatePayment = function() {
    //   Stripe.card.createToken(form, stripeResponseHandler);

    //   function stripeResponseHandler(status, response){      
    //     console.log(response);
    //     if(!response.error && response.id) {

    //       var token = response.id; //tokenized credit card
    //       var customer = Meteor.user().profile.billing.id;
    //       Meteor.call('updateStripePayment', token, customer, function(err, result) {
    //         // when customer successfully saved in Stripe, udate user profile to PRO
    //         console.log(err);
    //         console.log(result);
    //         Meteor.users.update(Meteor.user()._id, {$set: {
    //           'profile.billing': result
    //         }});
    //       });
    //     } else {
    //       toastr.error(response.error.message, 'Error!');
    //     }
    //   }
    // };

    
    // var musicianPayment = function() {
    //   Stripe.card.createToken(form, stripeResponseHandler);

    //   function stripeResponseHandler(status, response) {
        
    //     console.log(response);
    //     if(!response.error && response.id) {

    //       var token = response.id; //tokenized credit card
    //       Meteor.call('chargeStripeCard', token, function(err, result) {
    //         // when customer successfully saved in Stripe, udate user profile to PRO
    //         console.log(err);
    //         console.log(result);
    //         Meteor.users.update(Meteor.user()._id, {$set: {
    //           'profile.paid': true
    //         }});
    //       });
    //     } else {
    //       toastr.error(response.error.message, 'Error!');
    //     }
    //   }
    // }
    


  } // end submit 

});


Template.projectDetails.helpers({
    'isMyProject': function() {
        var that = this;
        console.log(that);
        if(that.userId === Meteor.userId()) {
            return true;
        }
        //console.log(that);
    }
})