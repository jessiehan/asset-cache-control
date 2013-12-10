# asset-cache-control

control the cache of assets by appending md5 hash to asset url

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-cache --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-cache');
```

## The "cache" task

### Overview
In your project's Gruntfile, add a section named `cache` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
    cache: {
      js: {
        options: {
        },
		assetUrl:'demo/js/hello.js',
        files: {
          'tmp': ['demo/index.html'],
        },
      },
    },
});
```



### Usage Examples

#### Default Options
In this example, we have index.html which contains hello.js and hello.css.
In Gruntfile.js, write as below, then `grunt`, we can get the index.html which has assets url with md5.

```js
grunt.initConfig({
    cache: {
      js: {
        options: {
        },
		assetUrl:'demo/js/hello.js',
        files: {
          'tmp': ['demo/index.html'],
        },
      },
      css: {
        options: {
        },
		assetUrl:'demo/css/hello.css',
        files: {
          'tmp': ['demo/index.html'],
        },
      },
    },
});
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
