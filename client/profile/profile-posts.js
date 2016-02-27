Template.profilePosts.onCreated(function () {
  this.editingPost      = new ReactiveVar(null);
  this.commentingOnPost = new ReactiveVar(null);
});

Template.profilePosts.helpers({
  editingPost: function () {
    return this._id === Template.instance().editingPost.get();
  },

  commentingOnPost: function () {
    return this._id === Template.instance().commentingOnPost.get();
  }
});

Template.profilePosts.events({
  'click .edit-post': function () {
    Template.instance().editingPost.set(this._id);
  },

  'click #update-post-cancel': function () {
    Template.instance().editingPost.set(null);
  },

  'click #update-post-save': function (event,template) {
    var newContent = $('#edit-post-container').find('.froala-view').html();
    // Update the post and hide the text editor
    Posts.update(this._id, { $set: { content: newContent } }, function (err) {
      if(!err) template.editingPost.set(null);
    })
  },

  'click .delete-post': function() {
    var postId = this._id;
    if(confirm('Are you sure you want to delete this update?')) {
      Posts.remove(postId);
    }
  },

  'click .leave-comment': function () {
    Template.instance().commentingOnPost.set(this._id);
  },

  'click #create-comment-save': function (event, template) {
    var commentContent = $('#comment-text-area').find('.froala-view').html();
    if(commentContent.trim().length === 0) return;

    Posts.update(this._id, { $push: {
      comments: {
        content: commentContent,
        createdAt: new Date(),
        userId: Meteor.userId()
      }
    }}, function (err) {
      if(!err) template.commentingOnPost.set(null);
    });
  },

  'click #create-comment-cancel': function () {
    Template.instance().commentingOnPost.set(null);
  }
});
