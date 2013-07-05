
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
  }], document.getElementById('colored'))
  , selectHTML = new Select([{
    value: 'blue',
    html: '<span class="circle blue"></span> blue',
    selected: true
  }, {
    value: 'green',
    html: '<span class="circle green"></span> green'
  }, {
    value: 'yellow',
    html: '<span class="circle yellow"></span> yellow'
  }], document.getElementById('html'));

select.on('select', function (value) {
  console.log('selected', value);
});
