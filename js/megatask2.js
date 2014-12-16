var Megatask = function() {
  function Megatask() {
    this.tasks = Task.all();
    var self = this;

    function saveTasks() {
      if (Utility.supportsStorage()) {
        localStorage.tasks = JSON.stringify(self.tasks);
      }
    };

    var getTaskIdFromListItem = function(listItem) {
      var id = listItem.attr('id');
      return id.substring(id.lastIndexOf('_') + 1);
    };


    $('#tasks').on('click', 'button.edit', function() {
      var listItem = $(this).closest('li');
      var id = getTaskIdFromListItem(listItem);
      var editForm = $('#edit-form-template').clone();
      editForm.find('input.task_name').val(self.tasks[id].name)
      editForm.removeClass('hidden');
      listItem.html(editForm);
    });

    $('#tasks').on('click', 'button.btn-danger', function() {
      var listItem = $(this).closest('li');
      var id = getTaskIdFromListItem(listItem);
      delete self.tasks[id];
      listItem.remove();
      saveTasks();
    });

    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      var task = new Task({
        name: $(this.elements.task_name).val()
      })
      self.tasks[task.id] = task;
      $(this.elements.task_name).val('');
      saveTasks();
    });

  }
  return Megatask;
}();

var megatask = new Megatask();
