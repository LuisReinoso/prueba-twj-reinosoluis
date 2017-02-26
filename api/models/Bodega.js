/**
 * Bodega.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      minLength: 5
    },
    direccion: {
      type: 'string',
      minLength: 5
    },
    capacidad: {
      type: 'integer'
    },
    idItem: {
      model: 'Item',
      required: true
    }
  }
};
