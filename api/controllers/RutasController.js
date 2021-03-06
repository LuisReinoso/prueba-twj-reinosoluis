module.exports = {
  home: function(req, res) {
    return res.view('homepage')
  },

  crearBodega: function(req, res) {
    return res.view('vistas/Bodega/crearBodega')
  },

  listarBodegas: function(req, res) {

    // Obtener bodegas
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

  editarBodega: function(req, res) {

    parametros = req.allParams();

    if (parametros.id) {
      Bodega.findOne({
        id: parametros.id
      }).exec(function(error, bodegaEncontrado) {
        if (error) {
          return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'Falla encontrar Bodega',
              url: '/',
              rawError: error
            }
          });
        }

        if (bodegaEncontrado) {
          return res.view('vistas/Bodega/editarBodega', {
            title: "Listar Bodegas",
            bodegaAEditar: bodegaEncontrado
          });
        } else {
          return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'Bodega no encontrado',
              url: '/',
              rawError: error
            }
          });
        }
      })
    } else {
      return res.view('vistas/error', {
        title: 'Error',
        error: {
          descripcion: 'Falla id Bodega',
          url: '/',
          rawError: error
        }
      });
    }
  },

  crearItem: function(req, res) {
    return res.view('vistas/Item/crearItem')
  },

  listarItems: function(req, res) {

    // Obtener items
    Item.find()
      .populate('idBodega')
      .exec(function(error, listaItems) {

        if (error) {
          return res.view('vistas/error', {
            title: 'Error',
            error: {
              descripcion: 'Falla en listar Items',
              url: '/',
              rawError: error
            }
          });
        } else {
          return res.view('vistas/Item/listarItems', {
            title: "Listar Items",
            items: listaItems
          });
        }
      });
  },

  editarItem: function(req, res) {

    parametros = req.allParams();

    if (parametros.id) {
      Item.findOne({
          id: parametros.id
        })
        .populate('idBodega')
        .exec(function(error, itemEncontrado) {
          if (error) {
            return res.view('vistas/error', {
              title: 'Error',
              error: {
                descripcion: 'Falla encontrar Item',
                url: '/',
                rawError: error
              }
            });
          }

          if (itemEncontrado) {
            return res.view('vistas/Item/editarItem', {
              title: "Listar Items",
              itemAEditar: itemEncontrado
            });
          } else {
            return res.view('vistas/error', {
              title: 'Error',
              error: {
                descripcion: 'Item no encontrado',
                url: '/',
                rawError: error
              }
            });
          }
        })
    } else {
      return res.view('vistas/error', {
        title: 'Error',
        error: {
          descripcion: 'Falla id Item',
          url: '/',
          rawError: error
        }
      });
    }
  },
};
