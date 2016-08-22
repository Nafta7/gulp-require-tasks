# modula-loader

[![npm package][npm-ver-link]][modula-loader]
[![][TravisLogo]][Travis]
[![][mit-badge]][mit]

> A module loader for node.

## Installation
```
npm install modula-loader
```

## Usage

`modula-loader` takes a directory name. Only works up to one level deep.

```js
import loader from 'modula-loader';
let modules = loader('tasks');
```

## API

**loader(dir)**

Load modules inside the specified directory.

```js
let moduls = loader(dir)
```

**loader(dir[, config])**

Additionally `modula-loader` supports `options` and `arguments` via `configuration`.


```js
let moduls = loader(dir, {
  opts: {
    flat: true
  },
  args: {
    arg1: arg1,
    arg2, arg2
    ...
  }
})
```

## opts

Available `options` include:
 - `flat`: attribute used to ignore subdir structure (default `false`).
 - `include`: specify the file(s) to load
 - `exclude`: specify the file(s) to not load

## args

Any desired arguments to be passed to the modules.

## Examples

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

And the code bellow:

```js
import loader from 'modula-loader';
let modules = loader('tasks');
```

It will return the following to modules:

```js
{
  'compile:js': [Function],
  'compile:sass': [Function],
  build: {
    'compile:js': Function],
    'compile:sass': [Function]
  },
  'minify:css': [Function],
  'minify:js': [Function],
  deploy: {
    'minify:css': [Function],
    'minify:js': [Function]
  }
}
```

## Example with arguments

`args`: Can be whatever you want to be made available to all of your modules.
`args` are dynamically expanded.

See:

```js
import loader from 'modula-loader';

let path = {
  styles:  {
    src: 'styles/',
    dest: 'www/styles/'
  },
  scripts: {
    src: 'scripts/',
    dest: 'www/scripts/'
  }
}

let plugins = {
  browserSync: browserSync
}

let modules = loader('tasks', {
  args: {
    gulp: gulp,
    path: path,
    $: plugins
  }
})
```

With this configuration, your modules will receive each `arg` as an argument:

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

## Example with options

Only load a specific set of files

```js
import loader from 'modula-loader';

let modules = loader('tasks', {
  opts: {
    include: ['compile:js', 'compile:sass']
  }
})
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
