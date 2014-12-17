var Megatask = function() {
  function Megatask() {
    this.tasks = Task.all();
    var self = this;

    function saveTasks() {
      updatePositions();
      Task.saveTasks(self.tasks);
    }
    function updatePositions() {
      var orderedElementIds = $('#tasks').sortable('toArray');
      $.each(orderedElementIds, function(index, elementId) {
        var id = Utility.idFromElementId(elementId);
        self.tasks[id].position = index + 1;
      });
    };

    $('#tasks').on('click', 'button.edit', function() {
      var listItem = $(this).closest('li');
      var id = Utility.idFromElementId(listItem.attr('id'));
      var editForm = $('#edit-form-template').clone();
      editForm.find('input.task_name').val(self.tasks[id].name)
      editForm.removeClass('hidden');
      listItem.html(editForm);
      editForm.find('input.task_name').select();
    });

    $('#tasks').on('click', 'button.btn-danger', function() {
      var listItem = $(this).closest('li');
      var id = Utility.idFromElementId(listItem.attr('id'));
      delete self.tasks[id];
      listItem.remove();
      saveTasks();
    });

    $(document).on('click', '.edit_task button.cancel', function(ev) {
      ev.preventDefault();
      var listItem = $(ev.currentTarget).closest('li');
      var id = Utility.idFromElementId(listItem.attr('id'))
      listItem.replaceWith(self.tasks[id].buildListItem());
    });

    $(document).on('submit', '.edit_task', function(ev) {
      ev.preventDefault();
      var listItem = $(ev.currentTarget).closest('li');
      var id = Utility.idFromElementId(listItem.attr('id'));
      self.tasks[id].name = listItem.find('input.task_name').val();
      listItem.replaceWith(self.tasks[id].buildListItem());
      saveTasks();
    });

    $(document).on('click', ':checkbox', function(ev) {
      var listItem = $(ev.currentTarget).closest('li');
      var id = Utility.idFromElementId(listItem.attr('id'));
      self.tasks[id].completed = ev.currentTarget.checked;
      listItem.toggleClass('completed');
      saveTasks();
    });

    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      var task = new Task({
        name: $(this.elements.task_name).val(),
        position: Object.keys(self.tasks).length + 1
      })
      self.tasks[task.id] = task;
      $(this.elements.task_name).val('');
      saveTasks();
    });

    $('#tasks').sortable({
      update: function() { saveTasks(); }
    });
  }
  return Megatask;
}();

var megatask = new Megatask();
