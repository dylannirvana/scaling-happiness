// As of 2/1/16, friendship allows users to chat with each other
// It is different from follows, which allows users to see posts from others
//   on their home page/wall

Meteor.methods({
  addFriend: function (friendUserId) {
    check(friendUserId, String);

    Connections.insert({
      userIds: [this.userId, friendUserId],
      requestingUserId: this.userId,
      userId: friendUserId,
      status: 'pending'
    });
  },
  approveFriend: function (friendUserId, isApproved) {
    var connection = Connections.findOne({
      userIds: {$all: [this.userId, friendUserId]},
      status: 'pending'
    });
    if(connection){
      Connections.update(connection._id, {
        $set: {
          status: isApproved ? 'approved' : 'rejected'
        }
      });
    } else {
      throw new Meteor.Error('no-connection', 'No pending connection between the users was found');
    }
  },
  removeFriend: function (friendUserId) {
    Connections.remove({ userIds: {$all: [this.userId, friendUserId]} });
  },
  // returns true if the friendship would be unique, or false if there is already
  // a matching friendship.
  ensureUniqueFriendship: function (userIds) {
    var duplicate = Connections.findOne({userIds: {$all: userIds}});
    if(duplicate) 
      throw new Meteor.error('duplicate-connection', 'A connection already exists');
  }
});
