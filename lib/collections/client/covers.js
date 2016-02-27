var coversStore = new FS.Store.S3("covers");

Covers = new FS.Collection("covers", {
  stores: [coversStore]
});

Covers.allow({
  insert: function (userId, doc) {    
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.userId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.userId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.userId === userId;
  },
  download: function(){
    return true;
  }
});