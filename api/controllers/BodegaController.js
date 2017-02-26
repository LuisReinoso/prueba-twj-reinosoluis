/**
 * BodegaController
 *
 * @description :: Server-side logic for managing bodegas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearBodegaForm: function(req, res) {

    parametros = req.allParams();

    if (req.method == "POST") {

      if (parametros.nombre &&
        parametros.direccion &&
        parametros.capacidad) {
        Bodega.create({
          nombre: parametros.nombre,
          direccion: parametros.direccion,
          capacidad: parametros.capacidad
        }).exec(function(error, bodegaCreado) {

          if (error) {
            return res.view('vistas/error', {
              title: 'Error',
              error: {
                descripcion: 'Falla en el metodo HTTP',
                url: '/crearbodega',
                rawError: error
              }
            });
          } else {
            return res.view('vistas/Bodega/crearBodega')
          }

        })
      } else {
        return res.view('vistas/error', {
          title: 'Error',
          error: {
            descripcion: 'Falta parametros bodega',
            url: '/',
            rawError: ""
          }
        });
      }
    }
  },
};
