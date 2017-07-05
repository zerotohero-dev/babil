## Unmaintained Software

This was just an **experimental** project, and there’s no need to reinvent [`babel`](https://babel.io) and/or create a wrapper around `babel`.

I’m not planning to contribute to this project for a while.

If you are interested in being a contributor, [please let me know](mailto:volkan.io).

Thanks,

Volkan.

----

```
 ____    __    ____  ____  __
(  _ \  /__\  (  _ \(_  _)(  )
 ) _ < /(__)\  ) _ < _)(_  )(__
(____/(__)(__)(____/(____)(____)
```

## About This Repository

This repository is a part of the [Byte-Sized JavaScript VideoCasts][vidcast].

```
  _               __
 |_)   _|_  _ __ (_  o _   _   _|
 |_) \/ |_ (/_   __) | /_ (/__(_|
     /        |  _.     _. (_   _ ._ o ._ _|_
            \_| (_| \/ (_| __) (_ |  | |_) |_
                                       |
            »»  bytesized.tv  ««
```

## Byte-Sized What?!

[Byte-Sized JavaScript][vidcast].

It is a compilation of short (*around ten minutes*) monthly screencasts about **JavaScript** and related technologies.

[vidcast]: https://bytesized.tv/ "ByteSized.TV"

## About `babil`

`babil` is a helper module that transpiles your dependencies.

Currently you can do what `babil` can do [with a simple `babel` command when you set things up correctly](https://github.com/jsbites/babil/issues/30). So this is more like an **experimental** projects that wraps around `babel`.

So putting something like…

```
  "scripts": {
    …
    "build": "babel lib --source-maps -d release"
  },
```

in your `package.json` is a much leaner option than using `babil`.

That said,

```
babil.initialize().then(babil.transpile)
```

does not look that bad either.

If you have any recommendations and thoughts, [feel free to create an issue](https://github.com/jsbites/babil/issues/new).

## Requirements

I haven’t checked; though I’m sure you’ll need a recent version of Node.JS (> 5.x.x) because it’s using modern JavaScript syntax.

Feel free to create a PR to make it backwards-compatible.

## Usage Example

First install `babil` via `npm`:

```
npm install babil --save-dev
```

Then use it in your scripts:

```
#!/usr/bin/env node

// file: PROJECT_ROOT/bin/transpile.js

var babil = require( 'babil' );
var transpile = babil.transpile;
var ROOT_PATH = require( 'path' ).join( __dirname, '..' );

//
// Assuming that `babel-cli` is “locally” installed in `PROJECT_ROOT/node_modules`
// the following call transpiles all JS files inside `PROJECT_ROOT/lib`,
// into `PROJECT_ROOT/release`.
// It adds source maps to help debugging, too.
//
babil
    .initialize( { rootPath: ROOT_PATH } )
    .then( transpile );
```

## Wanna Help?

Any help is more than appreciated.

If you want to contribute to the source code, **fork this repository** and **create a pull request**.

> In lieu of a formal style guide, take care to maintain the existing coding style.

Also, don’t forget to add unit tests for any new or changed functionality.

If you want to report a bug; or share a comment or suggestion, [file an issue](https://github.com/jsbites/babil/issues/new).

## I’ve Found a Bug; I Have an Idea

[For bug reports and suggestions, please file an issue](https://github.com/jsbites/babil/issues/new).

## Contact Information

* **Project Maintainer**: [Volkan Özçelik](https://volkan.io/)
* **Project Website**: [bytesized.tv](https://bytesized.tv/)

## License

MIT-licensed. — [See the license file for details](LICENSE.md).

## Code of Conduct

We are committed to making participation in this project a harassment-free experience for everyone, regardless of the level of experience, gender, gender identity and expression, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, or nationality.

[See the code of conduct for details](CODE_OF_CONDUCT.md).

[vidcast]: https://bytesized.tv/
[ticket]: https://github.com/jsbites/babil/issues/new
