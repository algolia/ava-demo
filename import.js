var algoliasearch = require('algoliasearch');
const chunk = require('lodash.chunk')
const records = require('./small.json');

const chunks = chunk(records, 1000);

var client = algoliasearch('0OUJYWJ1L8', '72c9934e9914c92deae273e90e58326a');
var index = client.initIndex('products');

chunks.map(function(batch) {
  return index.addObjects(batch);
});
