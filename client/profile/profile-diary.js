Template.profileDiary.events({
  'click #create-new-diary': function() {
    var postContent = $('.new-diary-editor').find('.froala-view').html();
    var currentRoute = Router.current().route.getName();

    // pull diary for the current date
    var currentDiary = Diary.findOne({
      'createdAt': Router.current().params.query.date
    });


    // if(currentRoute === 'profilePublic') {
    //   console.log(this._id);
    //   userWallId = this._id;
    // } else {
    //   userWallId = Meteor.userId();
    // }


    if(postContent != '' && !currentDiary) {

      Diary.insert({
        content: postContent,
        createdAt: Router.current().params.query.date
      }, function(err, res) {
        console.log(err || res);
        if(!err){
          $('.new-diary-editor').find('.froala-view').html('');
        }
      })
    // check if diary exists for the current date and then just update
    } else if (postContent != '' && currentDiary) {
      Diary.update(currentDiary._id, {
        $set: {
          content: postContent
        }
      });
    }
  },


  'click #delete-diary': function() {
    // pull diary for the current date
    var currentDiary = Diary.findOne({
      'createdAt': Router.current().params.query.date
    });

    // check if diary exists before deleting it
    if(currentDiary && confirm('Are you sure you want to delete this diary?')) {
      Diary.remove(currentDiary._id);
    }
  }

});


Template.profileDiary.helpers({
  'diaries': function() {
    return Diary.find().fetch().reverse();
  },

  'currentDiary': function() {
    var diary = Diary.findOne({
      'createdAt': Router.current().params.query.date
    });
    console.log(diary);
    return diary;
  },

  'postUserName': function(userId) {
    if(Meteor.users.findOne(userId)) {
      return Meteor.users.findOne(userId).profile.name;
    }
  },

  'postUserPhoto': function(userId) {
    if(Meteor.users.findOne(userId)) {
      return Meteor.users.findOne(userId).profile.photo;
    }
  },

  'postedOnFormatted': function(postedOn) {
    return moment(postedOn).format('DD-MMM-YYYY hh:mm a')
  },

  'diaryDateFromURL': function() {
    var date = Router.current().params.query.date;
    console.log(Router.current().params.query.date);
    return moment(date).format('MM/DD/YYYY');
  },

  'nextDate': function() {
    var date = Router.current().params.query.date;
    console.log(moment(date).add('days', 1));

    // if there is existing diary, fill its content in text editor
    // otherwise clear text editor from prev diary
    var diary = Diary.findOne({
      'createdAt': Router.current().params.query.date
    });
    if(diary) {
      $('.new-diary-editor .froala-view').html(diary.content);
    } else {
      $('.new-diary-editor .froala-view').html('');
    }
    return 'date='+moment(date).add(1, 'days').format('YYYY-MM-DD');
  },

  'prevDate': function() {
    var date = Router.current().params.query.date;

    // if there is existing diary, fill its content in text editor
    // otherwise clear text editor from prev diary
    var diary = Diary.findOne({
      'createdAt': Router.current().params.query.date
    });

    if(diary) {
      $('.new-diary-editor .froala-view').html(diary.content);
    } else {
      $('.new-diary-editor .froala-view').html('');
    }

    return 'date='+moment(date).subtract(1, 'days').format('YYYY-MM-DD');
  }
})
