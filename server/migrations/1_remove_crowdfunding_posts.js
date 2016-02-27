Migrations.add({
  version: 1,
  name: 'Remove all crowdfunding projects to date',
  up: function() {
    Projects.remove({});
  }
});
