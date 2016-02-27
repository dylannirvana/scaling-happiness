// get AWS policy and signature from the server @AB
var aws = Meteor.call('froalaUpload', function(error, result){
  // TODO: refactor to reactive VAR
  Session.set('awsBase', result); // assign results to the session, reactive var wasn't reliable
});


Template.dashboard_textEditor.helpers({

  buttons: function() {
    return [
      'fontSize',
      'color',
      'fontFamily',
      'bold',
      'italic',
      'align',
      'insertUnorderedList',
      'createLink',
      'insertImage',
      'uploadVideo'
      // 'videoUploadButton',
      // 'uploadFile'
    ]
  },

  customButton: function() {
    var button = {
      videoUploadButton: {
        title: 'Upload video',
        icon: {
          type: 'font',
          value: 'fa fa-video-camera'
        },
        callback: function() {
          console.log(this);
          this.$file_wrapper.show();
        },
        refresh: function() {
          console.log('refreshed');
        }
      }
    };
    return button;
  },

  fontList: function() {
    return {
      'Sans Serif': 'Sans Serif',
      'Serif': 'Serif',
      'monospace, monospace': 'Fixed Width',
      'arial black, sans-serif': 'Wide',
      'arial narrow, sans-serif': 'Narrow',
      'comic sans ms, sans-serif': 'Comic Sans MS',
      'garamond, serif': 'Garamond',
      'georgia, serif': 'Georgia',
      'tahoma, sans-serif': 'Tahoma',
      'trebuchet ms, sans-serif': 'Trebuchet',
      'verdana, sans-serif': 'Verdana',
      'Pacifico, cursive': 'Pacifico',
      'Rock Salt, cursive': 'Rock Salt',
      'Pinyon Script, cursive': 'Pinyon Script',
      'Berkshire Swash, cursive': 'Berkshire Swash'
    }
  },

  imageUploadToS3: function() {

    return {
      bucket: 'gatekeymusic',
      region: 's3', //'s3-website-us-east-1', //us-east-1
      keyStart: 'data/',
      callback: function (url, key) {
        console.log(url);
        console.log(key);
        // add picure to picture album collection
        Pictures.insert({
          url: url
        });
      },
      params: {
        acl: 'public-read', // ACL according to Amazon Documentation.
        AWSAccessKeyId: 'AKIAJI7JFFBN3FHM6LOQ', // Access Key from Amazon.
        policy: Session.get('awsBase') ? Session.get('awsBase').s3Policy : '',  // Policy string computed in the backend.
        signature: Session.get('awsBase') ? Session.get('awsBase').s3Signature : '', // Signature computed in the backend.
      }
    }
    
  }

});