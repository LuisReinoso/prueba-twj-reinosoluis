module.exports = {
  home: function(req, res) {
    return res.view('homepage')
  },

  crearBodega: function(req, res) {
    return res.view('vistas/Bodega/crearBodega')
  },

  listarBodegas: function(req, res) {

    // Obtener usuarios
    Bodega.find().exec(function(error, listaBodegas) {

      if (error) {
        return res.view('vistas/error', {
          title: 'Error',
          error: {
            descripcion: 'Falla en listar Bodegas',
            url: '/',
            rawError: error
          }
        });
      } else {
        return res.view('vistas/Bodega/listarBodegas', {
          title: "Listar Bodegas",
          bodegas: listaBodegas
        });
      }
    });
  },

};
