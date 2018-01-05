(function(exports) {

  (function(exports) {

    (function serviceAuth(config) {

      const login = (data)=> {
          return $.post(`${config.api}api/auth/login`, data);
        }
      const register = (data) => $.post(`${config.api}api/auth/signup`, data);
      const logout = () => console.log('logout')

      let service = {
        login,
        register,
        logout
      }
      exports['serviceAuth'] = service;
    })(exports['config']);

  })(
    (typeof exports === "undefined") ?
    window : exports
  );
})(app);
