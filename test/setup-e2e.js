
var div = document.getElementById('el')
  , Select = require('select-popover')

  , select = new Select([{value: 10, title: 'Ten', selected: true}, {value: 20, title: 'Twenty'}], div)
  , select2 = new Select([{
    value: 'active',
    'class': 'active',
    title: 'Active',
    selected: true
  }, {
    value: 20,
    title: 'Twenty'
  }], document.getElementById('colored'));

select.on('select', function (value) {
  console.log('selected', value);
});
