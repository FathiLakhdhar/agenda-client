var app = {};

(function(exports){

  (function config(exports){

    host = "http://localhost";
    port = 5000;

    let config = {
      api : `${host}:${port}/`
    }

    exports['config'] = config;

  })(
    (typeof exports === "undefined") ?
    window : exports
  );

})(app);
