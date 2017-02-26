module.exports = {
  home: function(req, res) {
    return res.view('homepage')
  },

  crearBodega: function(req, res) {
    return res.view('vistas/Bodega/crearBodega')
  }


};
