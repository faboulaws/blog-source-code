const { Types: { ObjectId } } = require('mongoose');

exports.convertObjectIds = (entity, props) => props.reduce((obj, prop) => {
  obj[prop] = ObjectId(obj[prop]);
  return obj;
}, entity);

