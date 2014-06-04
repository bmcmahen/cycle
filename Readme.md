
# cycle

  Cycle through an array to select only a particular index and a specified number of neighbours.

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/cycle

## API

### new Cycle(nodes, neighbours, options)

  Neighbours specifies the number of neighbours to show, before and after the current index. `options` allows you to specify if you want to unload previously loaded, non-neighbouring nodes.

### .show(i)

  Specify the current index among the nodes in the array.

## Example

```javascript
var Cycle = require('cycle');
var arr = ['ben', 'kit', 'bacon', 'potato', 'fish', 'monster', 'word'];
var cycle = new Cycle(arr, 1, { unload: true });

cycle.on('enter', function(i, node){
  console.log('enter', i, node);
});

cycle.on('exit', function(i, node){
  console.log('exit', i, node);
});

var start = 0;
setInterval(function(){
  cycle.show(start);
  start++;
}, 5000);
```



## License

  MIT
