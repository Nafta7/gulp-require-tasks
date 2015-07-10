# modula-loader

[![npm package][npm-ver-link]][modula-loader]
[![][TravisLogo]][Travis]
[![][mit-badge]][mit]

> A module loader that lets you pass parameters to your modules.

## Installation
```
npm install modula-loader
```

## Usage

`modula-loader` takes a directory name and returns a `Map`.
If options are provided, it will be passed to your modules as arguments expanded.

```js
import loader from 'modula-loader';
let modules = loader('tasks');
```

### Example

Given the following directory structure:
```
tasks
├── build
│    ├── compile:js.js
│    └── compile:sass.js
└── deploy
      ├── minify:css.js
      └── minify:js.js
```
It will return the following map:

```js
{
  'compile:js': [Function],
  'compile:sass': [Function],
  build: {
    'compile:js': Function],
    'compile_sass': [Function]
  },
  'minify:css': [Function],
  'minify:js': [Function],
  deploy: {
    'minify:css': [Function],
    'minify:js': [Function]
  }
}
```

## Options

`options`: Can be whatever you want to be made available to all of your modules. Options are dynamically expanded. See:

```js
import loader from 'modula-loader';

let path = {
  styles:  { src: 'styles/', dest: 'www/styles/' },
  scripts: { src: 'scripts/', dest: 'www/scripts/' }
};
let plugins = { browserSync: browserSync };

let modules = loader('tasks', {gulp: gulp, path: path, $: plugins});
```

With this configuration, your modules will receive each option as an argument:

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
