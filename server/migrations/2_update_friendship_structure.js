// Prior to this, friends are a one-way street:
// UserA friends UserB and can now see their online status and send Messages
// UserB will not see the messages and will not get a notification that someone
//   wants to add them as a friend. They must, separately, friend UserA to
//   have a chat and get chat notifications.

// In the new structure, UserA and UserB will have their userIds in a

Migrations.add({
  version: 2,
  name: 'Update friendship data structure',
  up: function() {

    var connections = Connections.find({},{sort: {createdAt: -1}}).fetch();
    connections.forEach(function (connection, i) {
      var userIds          = [connection.userId, connection.addedUserId];
      // avoid duplicate connections containing the same userIds
      if( Connections.findOne({userIds: {$all: userIds}}) ){

        Connections.remove(connection._id);

      } else {

        // we're ordering by date so hopefully that helps us determine who
        // initiated the requests first. Not that important anyway.
        var requestingUserId = connection.userId;
        // look for a connection that is the opposite of this one
        var reciprocation    = Connections.findOne({
          userId:           connection.addedUserId,
          addedUserId:      connection.userId
        });
        // previously there was no way to reject a request. if it's not
        // reciprocated we'll just say that it's pending for now.
        var status = reciprocation ? 'approved' : 'pending';

        // update this connection to match the new structure and remove old fields
        Connections.update(connection._id,{
          $set: {
            requestingUserId: requestingUserId,
            userIds: userIds,
            status: status
          },
          $unset: {
            addedUserId: '',
            userId: ''
          }
        });
      }

    });

  }
});
