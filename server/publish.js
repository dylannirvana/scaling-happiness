Meteor.publish('publicUser', function(publicUserIds) {
    // publicUserIds needs to be an array, but we'll accept a single ID
    if(typeof publicUserIds === 'string'){
      publicUserIds = [publicUserIds];
    }

    var fields = {
      'username': 1,
      'status': 1,
      'profile.name':1,
      'profile.photo': 1,
      'profile.bio': 1,
      'profile.country': 1,
      'profile.accountType': 1,
      'profile.settings': 1
    };

    var user = Meteor.users.find({_id: {$in: publicUserIds}}, {fields: fields});
    return user;
});


Meteor.publish('followings', function() {
  var currentUser = this.userId;
  return Followings.find({
    userId: currentUser
  });
});


Meteor.publish('connections', function() {
  return Connections.find({
    // Publish all connections involving this user
    // XXX: previously only approved connections or pending requests from other
    //      users were synced but this caused some headaches getting info
    //      for the requesting user andhandling rejections
    userIds: {$in: [this.userId]}
  });

});

Meteor.publish('chats', function(receipientId) {
  var currentUser = this.userId;

  return Chats.find({
    $or: [
      {receipientId: {$in: [currentUser]} },
      {senderId: {$in: [currentUser]} }
    ]
  });
});

Meteor.publish('projects', function(userId) {
  return Projects.find();
});

Meteor.publish('project', function(projectId) {
  //console.log(projectId);
  //console.log(Projects.find({_id: projectId}));
  return Projects.find({_id: projectId});
});


Meteor.publish('pictures', function(userId) {
  var currentUser = userId || this.userId;

  // return Pictures.find({$or: [{
  //     userId: currentUser,
  //     guestId: currentUser
  //   }]
  // });

  return Pictures.find({userId: currentUser});
});

Meteor.publish('videos', function(userId) {
  var currentUser = userId || this.userId;
  return Videos.find({userId: currentUser});
});


Meteor.publish('calendar', function () {
  return Calendar.find();
});

///////////////////////////////////////////////////////////////////////////////

Meteor.publish('user-music', function(userId) {
  userId = userId || this.userId;
  return Tracks.find({ownerId: userId});
});

Meteor.publish('user-covers', function(userId) {
  return Covers.find({ownerId: userId});
});


Meteor.publish('playlists', function(userId) {
  return Playlists.find({ownerId: this.userId});
});

Meteor.publish('my-playlist-items', function(query){
  //if (query && query.playlistId) {
    //return MyPlaylistItems.find({ownerId: this.userId, playlistId: query.playlistId});
  //}else {
    return MyPlaylistItems.find({ownerId: this.userId});
  //}
});

Meteor.publish('singers-playlist-items', function(query){
  //if (query && query.playlistId) {
    //return SingerPlaylistItems.find({ownerId: this.userId, playlistId: query.playlistId});
  //} else {
    return SingerPlaylistItems.find({ownerId: this.userId});
  //}
});


Meteor.publish('song-playlist-items', function(query){
  //if (query && query.playlistId) {
  //  return SongPlaylistItems.find({ownerId: this.userId, playlistId: query.playlistId});
  // } else {
    return SongPlaylistItems.find({ownerId: this.userId});
  //}
});

Meteor.publish('all-playlist-items', function() {
  var my = MyPlaylistItems.find({ownerId: this.userId});
  var bySong = SongPlaylistItems.find({ownerId: this.userId});
  var bySinger = SingerPlaylistItems.find({ownerId: this.userId});
  return [my, bySong, bySinger];
});

Meteor.publish('one-track', function(trackId){
  return Tracks.find({_id: trackId});
})


Meteor.publish('userposts', function(userId) {
  //console.log('receipientId '+ userId);
  return Posts.find({
    userWallId: userId
  });
});

Meteor.publish('userAndFollowedPosts', function(userIds) {
  userIds.push(this.userId);
  //console.log(userIds);
  return Posts.find({
    userWallId: {$in: userIds}
  });
});

Meteor.publish('selfies', function(userId) {
  return Selfies.find({ownerId: userId});
});




Meteor.publish('diary', function(userId) {
  return Diary.find({userId: this.userId});
});


Meteor.publish('invitations', function() {
  return Invitations.find();
});

Meteor.publish('chatNotifications', function() {
  return ChatNotifications.find({toUserId: this.userId});
});
