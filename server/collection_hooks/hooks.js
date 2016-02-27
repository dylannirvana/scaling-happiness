Meteor.users.after.insert(function(userId, doc){
	Playlists.insert({
		name: 'main',
		ownerId: doc._id
	})
})