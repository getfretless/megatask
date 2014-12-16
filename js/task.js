var Task = function() {
  var self = this;
  this.counter = 0;
  function getId(id) {
    if (!id) {
      self.counter ++;
      id = self.counter;
    }
    else if (id > self.counter) {
      self.counter = id;
    }
    return id;
  }
  function buildListItem(task) {
    var list = $('#list-template').clone();
    return list.html().replace('{{ task.id }}', task.id).replace('{{ task.name }}', task.name);
  }
  function Task(properties) {
    this.name = properties.name;
    this.completed = !!properties.completed;
    this.id = getId(properties.id);
    $('#tasks').append(buildListItem(this));
  }
  return Task;
}();
Task.tasksPresent = function() {
  return (Utility.supportsStorage() && localStorage.tasks);
}
Task.all = function() {
  var task, tasks = {};
  if (Task.tasksPresent()) {
    var allTaskProperties = JSON.parse(localStorage.tasks);
    $.each(allTaskProperties, function(index, taskProperties){
      task = new Task(taskProperties);
      tasks[task.id] = task;
    });
  }
  return tasks;
}
