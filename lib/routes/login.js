/* Login */

// login screen
Router.route('login', {
  path: '/login',
  template: 'login',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.redirect('profile'); // is it better than Router.go() ?
    } else {
      this.next();
    }
  },
  layoutTemplate: 'loginLayout'
});

// register screen
Router.route('register', {
  path: '/register',
  template: 'register',
  onBeforeAction: function() {
    if(Meteor.user()) {
      Router.go('profile'); // is it better than this.redirect?
    } else {
      this.next();
    }
  },
  layoutTemplate: 'loginLayout'
});

// register screen
Router.route('registerfan', {
  path: '/register/fan',
  template: 'registerFan',
  onBeforeAction: function() {
    if(Meteor.user()) {
      Router.go('profile'); // is it better than this.redirect?
    } else {
      this.next();
    }
  },
  layoutTemplate: 'loginLayout'
});

// register screen
Router.route('registermusician', {
  path: '/register/musician',
  template: 'registerMusician',
  onBeforeAction: function() {
    if(Meteor.user()) {
      Router.go('profile'); // is it better than this.redirect?
    } else {
      this.next();
    }
  },
  layoutTemplate: 'loginLayout'
});

/* Forgot password */
Router.route('forgot-password', {
  path: '/forgot-password',
  template: 'forgotPassword',
  onBeforeAction: function() {
    if(Meteor.user()) {
      this.redirect('profile');
    } else {
      this.next();
    }
  },
  layoutTemplate: 'loginLayout'
});


Router.route('reset-password', {
  path: '/reset-password/:token',
  template: 'resetPassword',
  layoutTemplate: 'loginLayout'
});





Router.route('/verify-email/:verifyEmailId', function() {
  console.log('here');
  console.log(this.params.verifyEmailId);
  this.render('verifyEmail');  
}, {
  name: 'profile.verifiy',
  waitOn: function() {
      console.log(this.params.verifyEmailId);
      Accounts.verifyEmail(this.params.verifyEmailId, function(error) {
        if(error) {
          // we had an issue with verifying their email address
          Router.go('profile.verifiy.failed', {
            err: error.reason
          });
        } else {
          console.log('verify-email');
          // send user to email verified route...
          // there the user can move into their Dashboard...
          Router.go('profile.verified');
        }
      });
    }
});


Router.route('/email-verified', function() {
  this.render('emailVerified');
}, {
  name: 'profile.verified'
});


Router.route('/email-failed-verification/:error', function() {
  this.render('emailFailedVerification');
  this.data = function() {
    var that = this;
    var templateData = {
      errorMessage: that.params.error
    };
    return templateData;
  }
}, {
  name: 'profile.verifiy.failed'
});