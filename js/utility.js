var Utility = {
  supportsStorage: function() {
    try {
      return 'localStorage' in window &&
        window['localStorage'] != null;
    } catch(e) {
      return false;
    }
  },
  idFromElementId: function(elementId) {
    return elementId.substring(elementId.lastIndexOf('_') + 1);
  }
}
