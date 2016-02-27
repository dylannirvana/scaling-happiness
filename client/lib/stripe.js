Meteor.startup(function() {
    window.devEnv = ("localhost" === window.location.hostname);
    
    if(devEnv) {
      Stripe.setPublishableKey('pk_test_4PidObuWnMNBSfQ6g2GHiWXe'); //test
    } else {
      Stripe.setPublishableKey('pk_live_XtKVWCNWBsgoOy2LlxYL0MIi'); //for now test, later will be prod  
    }
    
});