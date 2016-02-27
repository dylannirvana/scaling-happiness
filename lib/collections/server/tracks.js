// var tracksStore = new FS.Store.S3("tracks", {
//   accessKeyId: Meteor.settings.aws.key,
//   secretAccessKey: Meteor.settings.aws.secret,
//   bucket: Meteor.settings.aws.bucket,
//   folder: Meteor.settings.aws.directory
// });
var tracksStore = new FS.Store.S3("tracks", {
  accessKeyId: "AKIAJI7JFFBN3FHM6LOQ",
  secretAccessKey: "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",
  bucket: "gatekeymusic",
  ACL: 'public-read',
  folder: "/data/tracks",
  // fileKeyMaker: function (fileObj) {
  //   // Lookup the copy
  //   var store = fileObj && fileObj._getInfo(name);
  //   // If the store and key is found return the key
  //   if (store && store.key) return 'store.key';

  //   // TO CUSTOMIZE, REPLACE CODE AFTER THIS POINT

  //   var filename = fileObj.name();
  //   var filenameInStore = fileObj.name({store: name});

  //   // If no store key found we resolve / generate a key
  //   return 'store.key';
  // }
});

var coversStore = new FS.Store.S3("covers", {
  accessKeyId: "AKIAJI7JFFBN3FHM6LOQ",
  secretAccessKey: "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",
  bucket: "gatekeymusic",
  ACL: 'public-read',
  folder: "/data/covers"
});

Tracks = new FS.Collection("tracks", {
  stores: [tracksStore]
});

// var coversStore = new FS.Store.S3("covers", {
//   accessKeyId: Meteor.settings.aws.key,
//   secretAccessKey: Meteor.settings.aws.secret,
//   bucket: Meteor.settings.aws.bucket,
//   folder: Meteor.settings.aws.directory
// });

Covers = new FS.Collection("covers", {
  stores: [coversStore]
});



// Meteor.startup(function() {

//   Tracks.after.remove(function(userId, doc) {
//     Covers.remove({
//       _id: doc._id
//     });
//   })

// })