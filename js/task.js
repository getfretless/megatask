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
  function Task(properties) {
    this.name = properties.name;
    this.completed = !!properties.completed;
    this.id = getId(properties.id);
    var task = this;
    this.buildListItem = function() {
      var list = $('#list-template').clone();
      return list.html().replace('{{ task.id }}', task.id)
        .replace('{{ task.completed }}', (task.completed ? 'completed' : ''))
        .replace('{{="" task.checked="" }}=""', (task.completed ? 'checked' : ''))
        .replace('{{ task.name }}', task.name);
    }
    $('#tasks').append(this.buildListItem());
  }
  return Task;
}();
Task.tasksPresent = function() {
  return (Utility.supportsStorage() && localStorage.tasks);
}
Task.saveTasks = function(tasks) {
  if (Utility.supportsStorage()) {
    localStorage.tasks = JSON.stringify(tasks);
  }
}
Task.all = function() {
  var task, tasks = {};
  if (Task.tasksPresent()) {
    var loadedTasks = JSON.parse(localStorage.tasks);
    var orderedTasks = [];
    $.each(loadedTasks, function(index, task) {
      orderedTasks.push(task);
    });
    orderedTasks.sort(function(a, b) {
      return a.position - b.position;
    });
    $.each(orderedTasks, function(index, taskProperties){
      task = new Task(taskProperties);
      tasks[task.id] = task;
    });
  }
  return tasks;
}
