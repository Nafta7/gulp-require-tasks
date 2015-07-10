# modula-loader

[![npm package][npm-ver-link]][modula-loader]
[![][TravisLogo]][Travis]
![][mit-badge][mit]

## About

A module loader that lets you pass parameters to your modules.

## Installation
```
npm install modula-loader
```

## Usage

### `modulaLoader(dir [, options])` => [Map]

Takes a directory and returns a `Map`.
If options are provided, it will be passed to your modules as arguments expanded.

#### Example

```js
import modulaLoader from 'modula-loader';
let modules = modulaLoader('tasks');
```
Given the following directory structure:
```
tasks/
  build/
    compile_js.js
    compile_sass.js
  deploy/
    minify_css.js
    minify_js.js
```
`modulaLoader` will return the following map:

```js
{
  compile_js: [Function: compile_js],
  compile_sass: [Function: compile_sass],
  build: {
    compile_js: Function: compile_js],
    compile_sass: [Function: compile_js]
  },
  minify_css: [Function: minify_css],
  minify_js: [Function: minify_js],
  deploy: {
    minify_css: [Function: minify_css],
    minify_js: [Function: minify_js]
  }
}
```

## Options

`options`: Can be whatever you want to be made available to all of your modules,
options are dynamically expanded to the modules. See:

```js
import modulaLoader from 'modula-loader';

let path = {
  styles:  { src: 'styles/', dest: 'www/styles/' },
  scripts: { src: 'scripts/', dest: 'www/scripts/' }
};
let plugins = { browserSync: browserSync };

let modules = modulaLoader('tasks', {gulp: gulp, path: path, $: plugins});
```

With this configuration, your modules will receive all options expanded. See
a module example:

```js
// tasks/build/compile:sass.js <- A simple node module
import sass from 'gulp-sass';
import rename from 'gulp-rename';

module.exports = (gulp, path, $) => {
  return () => {
    gulp.src([`${path.styles.src}**/*.sass`])
    .pipe(sass())
    .pipe(gulp.dest(path.styles.dest))
    .pipe($.browserSync.stream());
  };
};
```

## License

MIT

[modula-loader]: https://www.npmjs.com/package/modula-loader

[mit-badge]: https://img.shields.io/badge/license-MIT-lightgrey.svg?style=flat-square
[mit]: https://github.com/Nafta7/modula-loader/blob/master/LICENSE

[npm-pkg-link]: https://www.npmjs.org/package/modula-loader

[npm-ver-link]: https://img.shields.io/npm/v/modula-loader.svg?style=flat-square

[TravisLogo]: http://img.shields.io/travis/Nafta7/modula-loader.svg?style=flat-square
[Travis]: https://travis-ci.org/Nafta7/modula-loader
