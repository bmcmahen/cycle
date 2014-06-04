/**
 * Module dependencies
 */

var Emitter = require('emitter');
var each = require('each');

/**
 * Expose Cycle
 */

module.exports = Cycle;

/**
 * Cycle Constructor
 * @param {Array} nodes
 * @param {Number} neighbours to select
 * @param {Object} options
 */

function Cycle(nodes, neighbours, options){
  if (!(this instanceof Cycle)) return new Cycle(nodes, neighbours, options);
  options = options || {};
  this.unload = options.unload;
  this.nodes = nodes;
  this.neighbours = neighbours || 0;
  this.showing = {};
}

Emitter(Cycle.prototype);

/**
 * Show particular index and emit changes
 * @param  {Number} i index
 * @return {Cycle}   
 */

Cycle.prototype.show = function(i){

  var indexes = this.getIndexes(i);

  // If we are unloading non neighbouring nodes, then
  // we need to iterate through our new range & get a diff
  // with our old range, removing those that are no
  // longer present. Note that this really isn't very
  // efficient, but should be fine for smaller data sets.

  if (this.unload) {
    each(this.showing, function(key, node){
      var contained = false;
      key = parseInt(key);
      for (var i = indexes.start; i <= indexes.end; i++) {
        if (i === key) {
          contained = true;
          break;
        }
      }
      if (!contained) {
        this.emit('exit', key, this.nodes[key]);
        delete this.showing[key];
      }
    }.bind(this), this);
  }

  // Determine those newly entered.
  for (var i = indexes.start; i <= indexes.end; i++) {
    if (!this.showing[i]) this.emit('enter', i, this.nodes[i]);
    this.showing[i] = true;
  }

  return this;
};

// throw error if i is less than our start, or
// greater than our length?
Cycle.prototype.getIndexes = function(i){
  var n = this.neighbours;
  var start = (i - n) < 0 ? 0 : (i - n);
  var end = (i + n) > (this.nodes.length - 1)
    ? this.nodes.length - 1
    : i + n;

  this.range = { start : start, end : end };
  return this.range;
};


