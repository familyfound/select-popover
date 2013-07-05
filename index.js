
/**
 * Module Dependencies
 */

var Tip = require('tip')
  , events = require('event')
  , classes = require('classes')
  , inherit = require('inherit');

module.exports = Select;

function el(name, cls, attrs) {
  var node = document.createElement(name);
  if (cls) node.className = cls;
  if (!attrs) return node;
  for (var attr in attrs) {
    node.setAttribute(attr, attrs[attr]);
  }
  return node;
}

function Select(items, label) {
  var div = el('div')
    , self = this
    , item;
  this.nodes = {};
  this.items = {};
  for (var i=0; i<items.length; i++) {
    if (items[i].selected) {
      this.selected = items[i].value;
    }
    this.items[items[i].value] = items[i];
    this.nodes[items[i].value] = this.newItem(items[i]);
    div.appendChild(this.nodes[items[i].value]);
  }
  if (typeof(this.selected) === 'undefined') {
    this.selected = items[0].value;
  }
  classes(this.nodes[this.selected]).add('selected');
  Tip.call(this, div);
  this.classname = 'select-popover';
  this.position('north');
  this.label = label;
  if (label) {
    label.innerText = this.items[this.selected].title;
    events.bind(label, 'click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      self.show(label);
      return false;
    });
  }
  var hide = function (e) {
    self.hide();
  };
  this.on('show', function () {
    events.bind(document, 'click', hide);
  });
  this.on('hide', function () {
    events.unbind(document, 'click', hide);
  });
}

inherit(Select, Tip);

Select.prototype.newItem = function (item) {
  var node = el('div', 'item' + (item['class'] ? ' ' + item['class'] : ''))
  , self = this;
  node.innerText = item.title || item.value;
  events.bind(node, 'click', function (){
    self.select(item.value);
    self.hide();
  });
  return node;
};

Select.prototype.select = function (value) {
  this.emit('select', value);
  classes(this.nodes[this.selected]).remove('selected');
  this.selected = value;
  classes(this.nodes[this.selected]).add('selected');
  if (this.label) {
    this.label.innerText = this.items[value].title;
  }
};
