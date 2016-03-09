        Template.newSelfie.rendered = function(){

          // THIS CODE I INHERITED IS DEPRECATED
          /* please comment out this section
          */

          // Grab elements, create settings, etc.
          var canvas = document.getElementById("canvas"),
            context = canvas.getContext("2d"),
            video = document.getElementById("video"),
            videoObj = { "video": true },
            errBack = function(error) {
              console.log("Big Video capture error: ", error.code);
            };

          // Put video listeners into place
          if(navigator.getUserMedia) { // Standard
            navigator.getUserMedia(videoObj, function(stream) {
              video.src = stream;
              video.play();
            }, errBack);
          } else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
            navigator.webkitGetUserMedia(videoObj, function(stream){
              video.src = window.URL.createObjectURL(stream);
              video.play();
            }, errBack);
          }
          else if(navigator.mozGetUserMedia) { // Firefox-prefixed
            navigator.mozGetUserMedia(videoObj, function(stream){
              video.src = window.URL.createObjectURL(stream);
              video.play();
            }, errBack);
          }

          // Converts canvas to an image
          function convertCanvasToImage(canvas) {
            var image = new Image();
            image.src = canvas.toDataURL("image/png");
            return image.src;
          }

          /*
          */
          // END commented section

          // References:
          // https://developer.mozilla.org/en-US/docs/Mozilla/Firefox_OS/API/Camera_API/Introduction
          // https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia

          // NEW API
          /*

          */
          // END new API

          $('#take-selfie').click(function() {
            context.drawImage(video, 0, 0, 450, 350);
            var selfieImg = convertCanvasToImage(canvas);

            // Posts.insert({
            //   ownerId: Meteor.userId(),
            //   userWallId: Meteor.userId(), //todo, add user id if it was posted on someone else's wall
            //   content: '<img src="'+selfieImg+'">',
            //   postedOn: new Date()
            // }, function(err, res) {
            //   // console.log(err || res);
            // });

            Selfies.insert({
              ownerId: Meteor.userId(),
              image: selfieImg,
              postedOn: moment().format('MM/DD/YYYY hh:mm a'),
              createdAt: moment().format('YYYY-MM-DD')

            }, function(err, res) {
                // videoObj = {"video": false};
                // console.log(videoObj);

                // console.log(err || res);
                if(err){
                  // Router.go('selfies')
                  // console.log(err);
                } else {
                  Router.go('profile');
                  document.location.reload(true);
                }
            }); // END insert error
          }); // END take selfie

          //  Cannot seem to revoke the camera stream object
          // (function() {
          //    window.URL.revokeObjectURL(videoObj);
          // });
        }; // END template rendered
