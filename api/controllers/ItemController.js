/**
 * ItemController
 *
 * @description :: Server-side logic for managing items
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	crearItemForm: function(req, res) {

    parametros = req.allParams();

    if (req.method == "POST") {

      if (parametros.nombre && parametros.cantidad &&
        parametros.peso && parametros.bodega) {

        Bodega.findOne({
          nombre: parametros.bodega
        }).exec(function(error, bodegaEncontrado) {
          if (error) {
            return res.view('vistas/error', {
              title: 'Error',
              error: {
                descripcion: 'Falla parametros bodega invalido',
                url: '/crearitem',
                rawError: error
              }
            });

          } else {

            if (bodegaEncontrado) {

              Item.create({
                nombre: parametros.nombre,
                cantidad: parametros.cantidad,
                peso: parametros.peso,
                idBodega: bodegaEncontrado.id
              }).exec(function(error, itemCreado) {

                if (error) {
                  return res.view('vistas/error', {
                    title: 'Error',
                    error: {
                      descripcion: 'Falla parametros invalido',
                      url: '/crearitem',
                      rawError: error
                    }
                  });
                } else {
                  return res.view('vistas/Item/crearItem')
                }

              })
            } else {
              return res.view('vistas/error', {
                title: 'Error',
                error: {
                  descripcion: 'Falla parametros bodega no encontrado',
                  url: '/crearitem',
                  rawError: ''
                }
              });
            }
          } //fin else
        })

      } else {
        return res.view('vistas/error', {
          title: 'Error',
          error: {
            descripcion: 'Falta parametros item',
            url: '/',
            rawError: ""
          }
        });
      }
    }
  },

	eliminiarItem: function(req, res) {

		parametros = req.allParams();

		if (parametros.id) {

			Item.destroy({
				id: parametros.id
			}).exec(function(error) {
				if (error) {
					return res.view('vistas/error', {
						title: 'Error',
						error: {
							descripcion: 'Falla en eliminar item',
							url: '/',
							rawError: error
						}
					});
				}
			});

			Item.find()
				.populate('idBodega')
				.exec(function(error, listaItems) {
					if (error) {
						return res.view('vistas/error', {
							title: 'Error',
							error: {
								descripcion: 'Falla en busqueda item',
								url: '/',
								rawError: error
							}
						});
					}

					return res.view('vistas/Item/listarItems', {
						title: "Listar Items",
						items: listaItems
					});
				});

		} else {
			return res.view('vistas/error', {
				title: 'Error',
				error: {
					descripcion: 'Falla en busqueda item',
					url: '/',
					rawError: ""
				}
			});
		}
	},
};
