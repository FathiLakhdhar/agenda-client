(function($) {
  $.fn.serializeJSON = function() {

    var obj = {};
    var a = this.serializeArray();
    $.each(a, (i, o) => {
      if (!obj[o.name]) {
        obj[o.name] = o.value || '';
      } else {
        if (obj[o.name].push) {
          obj[o.name].push(o.value || '');
        } else {
          obj[o.name] = [obj[o.name], o.value];
        }
      }

    });
    return obj;
  };
})(jQuery);
