AutoForm.debug();

Template.projectsNew.events = ({
  'change #project-photo': function(e, template) {    
    var files = $("input#project-photo")[0].files;
    console.log(template);
    S3.upload({
      files: files, 
      path: "/data/"+Meteor.userId()
    } ,function(e,r){
      $('#coverImage').val(r.secure_url);
    });
  }
});



Template.projectsNew.helpers({


});

// TODO: add update project route
AutoForm.addHooks(['insertProjectForm', 'insertProjectForm'], {
    onSuccess: function (operation, result, template) {
      if(operation === 'update') {
        Router.go('projectDetails', {_id:template.data.doc._id});
      } else {
        Router.go('allProjects');
      }
    }
});