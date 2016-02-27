 Router.route('newProject', {
  path: '/projects/new',
  template: 'projectsNew'
});

Router.route('allProjects', {
  path: '/projects/all',
  template: 'projectsAll',
  waitOn: function() {
    var that = this;
    return Meteor.subscribe('projects', Meteor.userId());
  },
  data: function() {
    var that = this; 
    var templateData = {
      projects: Projects.find().fetch()
    };
    console.log(templateData);
    return templateData;
  }
});

Router.route('detailsProject', {
  path: '/project/:_id',
  template: 'projectDetails',
  waitOn: function() {
    console.log(this.params._id);
    return Meteor.subscribe('project', this.params._id);
  },
  data: function() {    
    var that = this;
    var templateData = {
      project: Projects.findOne()
    }
    console.log(templateData.project);
    return templateData.project;
  }
});