'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var PostGenerator = module.exports = function PostGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  //console.log('You called the post subgenerator with the argument ' + this.name + '.');
};

util.inherits(PostGenerator, yeoman.generators.NamedBase);

PostGenerator.prototype.files = function files() {
  var today = new Date();

  var prefix = today.getUTCMonth() + 1;
  prefix += '-' + today.getDate();
  prefix += '-' + today.getFullYear();

  var filename = prefix + '-' + this._.slugify(this.name) + '.md';
  this.write('posts/' + filename, '# ' + this.name);
};
