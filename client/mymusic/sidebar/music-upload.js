Template.MusicUpload.onCreated(function() {
  this.trackPreview = new ReactiveVar();
  this.imagePreview = new ReactiveVar();
})

Template.MusicUpload.events({
  'change #music-file': function(event, template) {
    var instance = Template.instance();
    instance.trackPreview.set(event.target.files[0]);
  },
  'change #image-file': function(event, template) {
    var instance = Template.instance();
    var oFReader = new FileReader();
    oFReader.readAsDataURL(event.target.files[0]);

    oFReader.onload = function(oFREvent) {
      instance.imagePreview.set({
        imgFile: event.target.files[0],
        imgVal: oFREvent.target.result
      });
    };
  },

  'submit #new-song-form': function(e, t) {
    e.preventDefault();
  },


  'click #upload-submit': function(event, template) {
    var instance = Template.instance();
    var title = $('#title').val();
    var author = $('#author').val();
    var description = $('#description').val();
    if (title && author && description) {
      console.log('all good, uploading...');
      fsImageFile = new FS.File(instance.imagePreview.get().imgFile);
      fsImageFile.ownerId = Meteor.userId();
      Covers.insert(fsImageFile, function(err, res) {
      	console.log(err);
        if (res) {
          console.log('inerting cover');
          fsTrackFile = new FS.File(instance.trackPreview.get());
          fsTrackFile.ownerId = Meteor.userId();
          fsTrackFile.title = title || 'Untitled';
          fsTrackFile.author = author || 'No Nuthor';
          fsTrackFile.description = description || 'No Description';
          fsTrackFile.coverId = res._id;
          Tracks.insert(fsTrackFile, function(err, res) {
            console.log('inserting track...');
            console.log(err || res);
            if(!err){
              Router.go('playlist.album');
            }
          });
        }
      })
    };
  }
})

Template.MusicUpload.helpers({
  trackPreview: function() {
    var instance = Template.instance();
    return instance.trackPreview && instance.trackPreview.get() || 'No file chosen';
  },
  imagePreview: function() {
    var instance = Template.instance();
    return instance.imagePreview && instance.imagePreview.get();
  }
})
