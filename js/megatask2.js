var Megatask = function() {
  function Megatask() {
    this.tasks = Task.all();
    var self = this;

    function saveTasks() {
      Task.saveTasks(self.tasks);
    }
    function getTaskIdFromListItem(listItem) {
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
      editForm.find('input.task_name').select();
    });

    $('#tasks').on('click', 'button.btn-danger', function() {
      var listItem = $(this).closest('li');
      var id = getTaskIdFromListItem(listItem);
      delete self.tasks[id];
      listItem.remove();
      saveTasks();
    });

    $(document).on('click', '.edit_task button.cancel', function(ev) {
      ev.preventDefault();
      var listItem = $(ev.currentTarget).closest('li');
      var id = getTaskIdFromListItem(listItem);
      listItem.replaceWith(self.tasks[id].buildListItem());
    });

    $(document).on('click', '.edit_task input[type="submit"]', function(ev) {
      ev.preventDefault();
      var listItem = $(ev.currentTarget).closest('li');
      var id = getTaskIdFromListItem(listItem);
      self.tasks[id].name = listItem.find('input.task_name').val();
      listItem.replaceWith(self.tasks[id].buildListItem());
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
