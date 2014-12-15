var Megatask = function() {
  function Megatask() {
    this.tasks = [];
    var self = this;
    $('#new_task').submit(function(ev) {
      ev.preventDefault();
      self.tasks.push(this.elements.task_name.value);
      $('#tasks').append('<li>' + this.elements.task_name.value + '</li>');
    });
  }
  return Megatask;
}();

var megatask = new Megatask();
