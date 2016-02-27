Template.chat.helpers({
  
  'messages': function() {
    return Chats.find({}, {sort: {createdAt: -1}});
  },

  buttons: function() {
    return [
      'fontSize',
      'color',
      'fontFamily',
      'bold',
      'italic',
      'align',
      'insertUnorderedList',
      'undo',
      'createLink'
    ]
  },

  'postUserPhoto': function(userId) {
    return Meteor.users.findOne(userId).profile.photo;
  },
  'postedOnFormatted': function(postedOn) {
    return moment(postedOn).format('DD-MMM-YYYY hh:mm a')
  },
  'postUserName': function(userId) {
    return Meteor.users.findOne(userId).profile.name;
  },

  'guestClassName': function(senderId) {
    if(senderId === Meteor.userId()) {
      return 'my-comment';
    } else {
      return 'guest-comment';
    }
  }

});


Template.chat.events({

  'click #create-new-chat-msg': function() {
    var chatContent = $('.new-post-editor').find('.froala-view').html();
    console.log(this);
    if(chatContent != '') {

      Chats.insert({
        receipientId: this.receipientId, // coming from route's templateData
        message: chatContent
      }, function(err, res) {
        console.log(err || res);
        if(!err){
          $('.new-post-editor').find('.froala-view').html('');
        }
      })
    }
  }

});