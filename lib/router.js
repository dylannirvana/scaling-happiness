// check if user is logged in
// if not - redirect to login page
var isLoggedIn = function() {

  var loggingIn = Meteor.loggingIn();
  var user = Meteor.user();

  if(!(Meteor.loggingIn() || Meteor.user())) {
    Router.go('login');
  } else {    
    this.next();
  }
};

Router.configure({
  layoutTemplate: 'dashboardLayout', //use this template by default
  layoutPublic: 'publicLayout',
  loginLayout: 'loginLayout'
});

// defining public routes, where user dosn't have to be logged in
var publicRoutes = [
  'login', 
  'register',
  'registerfan',
  'registermusician', 
  'verifyEmail', 
  'emailVerified', 
  'emailFailedVerification',
  'forgot-password',
  'profilePublic',
  'publicTerms'
];

// execute this hook before every single route
Router.onBeforeAction(isLoggedIn, { 
  except: publicRoutes
});


// dashobard
Router.route('root', {
  path: '/',
  template: 'dashboardSummary',
  onBeforeAction: function() {
    Router.go('profile');
  }
});


// terms
Router.route('terms', {
  path: '/terms',
  template: 'terms'
});

// terms
Router.route('publicTerms', {
  path: '/register/terms',
  template: 'terms',
  layoutTemplate: 'loginLayout'
});


