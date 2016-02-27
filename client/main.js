Meteor.startup(function() {
  // Set Default Options
  var defaults = {
    sbl: "sb-l-o", // sidebar left open onload
    sbr: "sb-r-c", // sidebar right closed onload

    collapse: "sb-l-m", // sidebar left collapse style
    siblingRope: true
      // Setting this true will reopen the left sidebar
      // when the right sidebar is closed
  };

  // Extend Default Options.
  options = $.extend({}, defaults, defaults);


  // async loader for fonts
  // https://github.com/typekit/webfontloader
  // https://forums.meteor.com/t/adding-google-fonts/1095/3

  // Meteor.startup(function() {

  //   WebFontConfig = {
  //     google: { families: [ 'Roboto Slab:700,400:latin', 'Oswald:400', 'Pacifico', 'Rock Salt', 'Pinyon Script'
  //     , 'Berkshire Swash' ] }
  //   };
  //   (function() {
  //     var wf = document.createElement('script');
  //     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
  //       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
  //     wf.type = 'text/javascript';
  //     wf.async = 'true';
  //     var s = document.getElementsByTagName('script')[0];
  //     s.parentNode.insertBefore(wf, s);
  //     console.log("async fonts loaded", WebFontConfig);
  //   })();

  // })

});

toastr.options = {
  "preventDuplicates": false
} 