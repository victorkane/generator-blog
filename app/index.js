'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var BlogGenerator = module.exports = function BlogGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BlogGenerator, yeoman.generators.Base);

BlogGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'blogName',
    message: 'What do you want to call your blog?',
  }];

  this.prompt(prompts, function (props) {
    this.blogName = props.blogName;

    cb();
  }.bind(this));
};

BlogGenerator.prototype.app = function app() {
  this.mkdir('posts');
  this.template('_index.md', 'posts/index.md');
  
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('index.html', 'index.html');

  this.template('_bower.json', 'bower.json');
  this.template('_config.json', 'config.json');
  this.template('_package.json', 'package.json');
  this.copy('wordmap.json', 'wordmap.json');
};

BlogGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
};

BlogGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
