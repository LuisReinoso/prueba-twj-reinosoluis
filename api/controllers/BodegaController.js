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

	eliminiarBodega: function(req, res) {

    parametros = req.allParams();

    if (parametros.id) {

      Bodega.destroy({
        id: parametros.id
      }).exec(function(error) {
        if (error) {
          return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'Falla en eliminar bodega',
              url: '/',
              rawError: error
            }
          });
        }
      });

      Bodega.find().exec(function(error, listaBodegas) {
        if (error) {
          return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'Falla en busqueda bodega',
              url: '/',
              rawError: error
            }
          });
        }

        return res.view('vistas/Bodega/listarBodegas', {
          title: "Listar Bodegas",
          bodegas: listaBodegas
        });
      });

    } else {
      return res.view('vistas/error', {
        title: 'Error',
        error: {
          descripcion: 'Falla en busqueda bodega',
          url: '/',
          rawError: ""
        }
      });
    }
  },
};
