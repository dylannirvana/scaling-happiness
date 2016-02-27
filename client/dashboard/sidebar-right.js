Template.sidebarRight.onCreated(function () {
  var connectedUserIds = new ReactiveVar;

  // subscribe to this users connections
  Meteor.subscribe('connections');
  // subscribe to my chats
  Meteor.subscribe('chats');
  // subscribe to chat notifications
  Meteor.subscribe('chatNotifications');

  this.autorun(function () {
    // fetch the user ids for all friend connections
    var connections = _(Connections.find().fetch())
      .chain()
      .pluck('userIds')
      .flatten()
      .union()
      .uniq()
      .without(Meteor.userId())
      .value();
    connectedUserIds.set( connections );
  });

  this.autorun(function () {
    // subscribe to details of connected users
    Meteor.subscribe('publicUser', connectedUserIds.get());
  });
});

Template.sidebarRight.helpers({
  // Find all of the current user's connections.
  // Connections are divided into accepted and requested connections,
  // and both sets are sorted by the connection's name.
  'connections': function() {
    var uppercaseName = function (c) {
      var otherUserId = _(c.userIds).without(Meteor.userId())[0];
      var user = Meteor.users.findOne(otherUserId);
      return user ? user.profile.name.toUpperCase() : '';
    };
    var connections = _(Connections.find({
      $or: [
        // connections that are approved and contain my user id
        { userIds: {$in: [Meteor.userId()]},
          status: 'approved' },
        // connectons that are pending and were not created by me
        { userIds: {$in: [Meteor.userId()]},
          status: 'pending',
          requestingUserId: {$ne: Meteor.userId()} }
      ]
    }).fetch()).sortBy(uppercaseName);

    return {
      accepted: _(connections).filter(function (c) { return c.status === 'approved'; }),
      // pending requests that are waiting on me to approve
      pending:  _(connections).filter(function (c) { return c.status === 'pending'; })
    };
  }

});


Template.sidebarRight.events({
  'click .chat-popup': function(e, t) {
    e.stopPropagation();
  },

  'click .open-chat-window': function(e, t) {
    e.stopPropagation();
    e.preventDefault();

    $('.chat-popup').hide();
    $('.chat-popup').find('messages').html('');

    var target = $(e.currentTarget);

    // remove all chat notifications from this user
    ChatNotifications.find({
      'fromUserId': target.parent().data('friendid')
    }).forEach(function (notification) {
      ChatNotifications.remove(notification._id);
    });

    target.next('.chat-popup').show();
  },

  'submit .post-chat-message': function(e, t) {
    e.preventDefault();

    var chatBox = e.currentTarget;
    var recipientId = chatBox.dataset.recipient;
    var chatContent = $(chatBox).find('input').val();

    ChatNotifications.insert({
      toUserId: recipientId,
      fromUserId: Meteor.userId()
    });

    Chats.insert({
      receipientId: recipientId,
      message: chatContent
    }, function(err, res) {
      if(!err){
        $(chatBox).find('input').val('');
      }
    });
  },

  'click body': function() {
    $('.chat-popup').hide();
  },

  'click li.following-item .btn-sm': function (e) {
    var target = $(e.currentTarget);
    var friendId = target.parent().data('friendid');
    // the clicked button should have either friend-approve or -reject
    var isApproved = target.hasClass('friend-approve');
    Meteor.call('approveFriend', friendId, isApproved);
  }

});

Template.friendList.helpers({
  connectedUser: function () {
    // the connection contains 2 users. The one that isn't me is the other user.
    var otherUserId = _(this.userIds).without(Meteor.userId())[0];
    var connectedUser = Meteor.users.findOne(otherUserId);
    return Meteor.users.findOne(otherUserId);
  },

  connectionPending: function () {
    return Template.parentData().status === 'pending';
  },

  // CSS class denoting the online status of the connected user
  status: function() {
    if(Meteor.users.findOne(this._id).status.online) {
      return 'active';
    } else {
      return 'non-active';
    }
  },

  // CSS class denoting whether or not there are new messages from the connected user
  notification: function() {
    var notification = ChatNotifications.findOne({'fromUserId': this._id});
    if(notification){
      return 'unread';
    } else {
      return 'ok';
    }
  },

  // Messages received from the connected user
  messages: function() {
    var receipientId = this._id;
    var currentUser = Meteor.userId();
    var messages = Chats.find({
      receipientId: {$in: [receipientId, currentUser]},
      senderId: {$in: [receipientId, currentUser]}
    }, {
      sort: {createdAt: -1}
    });
    return messages;
  },

  // profile photo of the user a message is from
  userPhoto: function() {
    var sender = Meteor.users.findOne(this.senderId);
    return sender ? sender.profile.photo : '';
  }
});
