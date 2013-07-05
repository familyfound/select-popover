
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
    this.select(this.selected, true);
  }
  Tip.call(this, div);
  this.classname = 'select-popover';
  this.position('north');
  this.label = label;
  if (label) {
    this.select(this.selected, true);
    events.bind(label, 'click', function (e) {
      events.unbind(document, 'click', hide);
      self.show(label);
    });
  }
  var hide = function (e) {
    self.hide();
  };
  this.on('show', function () {
    setTimeout(function () {
      events.bind(document, 'click', hide);
    }, 0);
  });
  this.on('hide', function () {
    events.unbind(document, 'click', hide);
  });
}

inherit(Select, Tip);

Select.prototype.newItem = function (item) {
  var node = el('div', 'item' + (item['class'] ? ' ' + item['class'] : ''))
  , self = this;
  if (item.html) {
    node.innerHTML = item.html;
  } else {
    if (!item.title) item.title = item.value;
    node.innerText = item.title;
  }
  events.bind(node, 'click', function (e){
    e.preventDefault();
    e.stopPropagation();
    self.select(item.value);
    self.hide();
    return false;
  });
  return node;
};

Select.prototype.addClass = function (cls) {
  this.classname += ' ' + cls;
};

Select.prototype.select = function (value, silent) {
  if (!this.nodes[value] || value === this.selected) return;
  if (!silent) {
    this.emit('select', value);
  }
  if (this.nodes[this.selected]) {
    classes(this.nodes[this.selected]).remove('selected');
  }
  this.selected = value;
  classes(this.nodes[this.selected]).add('selected');
  if (this.label) {if (this.items[value].html) {
      this.label.innerHTML = this.items[value].html;
    } else {
      this.label.innerText = this.items[value].title;
    }
  }
};
