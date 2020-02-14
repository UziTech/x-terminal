# [x-terminal](https://atom.io/packages/x-terminal)

This is a fork of [atom-xterm](https://github.com/amejia1/atom-xterm/)

## Updates

1. Updated dependencies
   - xterm v4 introduced new plugins
   - faster performance with webgl
2. Themes
   - Easily change terminal colors in settings
3. Font Family
   - Change font family in settings

Atom plugin for providing terminals inside your Atom workspace.

![CI](https://github.com/UziTech/x-terminal/workflows/CI/badge.svg)
[![dependencies Status](https://david-dm.org/UziTech/x-terminal/status.svg)](https://david-dm.org/UziTech/x-terminal)

![X-Terminal demo](https://github.com/UziTech/x-terminal/raw/b7b9d4b073d9eea4f54806be5385d81d4fdd2393/resources/atom-xterm-demo.gif)

## Built in Terminal for Atom Feature Request

If you're reading this and you would rather see Atom have a built-in terminal
by default, please go over to the built-in terminal feature request
[here](https://github.com/atom/atom/issues/14490), give it a thumbs up, **and**
give an explanation as to why you need a built-in terminal in Atom by default.

# Installation

To install, simply search for the *x-terminal* package via Atom's package
manager. It can also be installed via command-line with the
[apm](https://github.com/atom/apm) command.

```
apm install x-terminal
```

## One time prerequisites

The *x-terminal* package requires
[node-pty](https://www.npmjs.com/package/node-pty). That package currently
requires building some native bindings on the local system using
[node-gyp](https://github.com/nodejs/node-gyp). Providing prebuilt binaries
is still [work in progress](https://github.com/Microsoft/node-pty/issues/46)
so for now, you'll need to install certain packages on your system before
installing *x-terminal*. Below are what you'll need to install only once before
installing *x-terminal*.

### Windows

Download and install [Node.js](https://nodejs.org/en/download/). It's recommended
to install the LTS version of Node.js.

Then, install the *windows-build-tools* package via npm.

```plain
npm install --global --production windows-build-tools
```

### Linux

#### Debian/Ubuntu based Linux distributions

Follow the instructions [here](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
to install Node.js. It's recommended to install the LTS version of Node.js.

Then install the *build-essential* and *python2.7* .deb packages.

```plain
sudo apt-get install build-essential python2.7
```

### macOS

Install Node.js using the instructions provided
[here](https://nodejs.org/en/download/package-manager/#macos). Then, install
the programs listed [here](https://github.com/nodejs/node-gyp#on-mac-os-x)

# Usage

## Opening Terminals

To open terminals, just open them through the menu.

![X-Terminal menu](https://raw.githubusercontent.com/UziTech/x-terminal/9dfb79f31df4df67b12be74f541c39d498d2212f/resources/atom-xterm-menu.png)

There's also various key bindings you can use to open terminals. See the
available key bindings for the x-terminal package.

There's also menu items available for opening terminals via right clicking on a
text editor or on a terminal.

Finally, terminal tabs are automatically reopened at the spot you placed them
when you last exited Atom.

## Organizing Terminals

To quickly organize your terminal tabs, simply use the main menu. You can also
find menu items by right-clicking on a terminal to organize your terminals.

And of course, there's the old fashion way of just moving the tabs where you
want them. Feel free to place your terminal tabs anywhere in your workspace to
include any of the docks.

![X-Terminal moving terminals demo](https://github.com/UziTech/x-terminal/raw/b7b9d4b073d9eea4f54806be5385d81d4fdd2393/resources/atom-xterm-moving-terminals-demo.gif)

## Profiles

The x-terminal package supports saving and loading profiles. What this allows
you to do is save commonly used commands and settings for later use.

![X-Terminal profiles demo](https://raw.githubusercontent.com/UziTech/x-terminal/5604f0433291a452ceffcc722c61fa2835d8b67a/resources/atom-xterm-profiles-demo.gif)

## Notifications

The x-terminal package provides notifications about terminal process exit
successes and failures. Notifications will appear in Atom's own notification
manager as well as on the terminal tab triggering the notification.

Success

![X-Terminal exit success](https://raw.githubusercontent.com/UziTech/x-terminal/master/resources/atom-xterm-exit-success.png)

Failure

![X-Terminal exit failure](https://raw.githubusercontent.com/UziTech/x-terminal/master/resources/atom-xterm-exit-failure.png)

There's also activity notifications for terminal tabs not in focus.

![X-Terminal activity notification](https://raw.githubusercontent.com/UziTech/x-terminal/master/resources/atom-xterm-activity-notification.png)

## Services

For plugin writers, the `x-terminal` package supports one service method which
can be used to easily open terminals. This method is provided using Atom's [services](http://flight-manual.atom.io/behind-atom/sections/interacting-with-other-packages-via-services/)
API. To use it, add a consumer method to consume the `x-terminal` service, or
rather a JavaScript object that provides an
[openTerminal()](https://github.com/UziTech/x-terminal/blob/b9578414e93b6fd164e19e03e2fbd5140934c3cb/lib/atom-xterm.js#L368) method. The `openTerminal()` method behaves just like Atom's
[open()](https://github.com/atom/atom/blob/v1.23.3/src/workspace.js#L912)
method except that the first argument must be a JSON object describing the
terminal profile that should be opened. Docs about this JSON object can be
found [here](https://github.com/UziTech/x-terminal/blob/b9578414e93b6fd164e19e03e2fbd5140934c3cb/lib/atom-xterm-profiles.js#L295).

As an example on how to use the provided `openTerminal()` method, your
`package.json` should have the following.

```javascript
{
  "consumedServices": {
    "atom-xterm": {
      "versions": {
        "^2.0.0": "consumeAtomXtermService"
      }
    }
  }
}
```

Your package's main module should then define a `consumeAtomXtermService`
method, for example.

```javascript
// In ECMAScript 6

import { Disposable } from 'atom'

export default {
  atomXtermService: null,

  consumeAtomXtermService (atomXtermService) {
    this.atomXtermService = atomXtermService
    return new Disposable(() => {
      this.atomXtermService = null
    })
  },

  // . . .
}
```

Once the service is consumed, use the `openTerminal()` method that is provided
by the service, for example.

```javascript
// Launch `somecommand --foo --bar --baz` in a terminal.
this.atomXtermService.openTerminal({
  command: 'somecommand',
  args: [
    '--foo',
    '--bar',
    '--baz'
  ]
})
```

# Development

Want to help develop x-terminal? Here's how to quickly get setup.

First use the [apm](https://github.com/atom/apm) command to clone the
[x-terminal repo](https://github.com/UziTech/x-terminal).

```
apm develop x-terminal
```

This should clone the x-terminal package into the `$HOME/github/x-terminal`
directory. Go into this directory and install its dependencies.

```
cd $HOME/github/x-terminal
npm install
```

Rebuild any native binaries that were installed (such as the binaries from the
[node-pty](https://github.com/Tyriar/node-pty) package) so that they can be
used inside Atom.

```
apm rebuild
```

Finally, open this directory in Atom's dev mode and hack away.

```
atom --dev
```

There's a test suite available for automated testing of the x-terminal package.
Simply go to `View > Developer > Run Package Specs` in Atom's main menu or
use the hotkey. You can run the full test suite (which includes running lint
tools) via command-line by running `npm run test` inside the x-terminal
directory.

Various lint tools are being used to keep the code "beautified". To run only
the lint tools, simply run `npm run lint`.

## Pull Requests

Whenever you're ready to submit a pull request, be sure to submit it
against a fork of the main [x-terminal repo](https://github.com/UziTech/x-terminal)
master branch that you'll own. Fork the repo using Github and make note of the
new `git` URL. Set this new git URL as the URL for the `origin` remote in your
already cloned git repo is follows.

```
git remote set-url origin ${NEW_GIT_URL}
```

Ensure your new changes passes the test suite by running `npm run test`.
Afterwards, push your changes to your repo and then use Github to submit a new
pull request.

## [xterm.js](https://github.com/xtermjs/xterm.js)

The terminals that users interact with in this package is made possible with
major help from the [xterm.js](https://github.com/xtermjs/xterm.js) library. As
such, often times it's necessary to make changes to xterm.js in order to fix
some bug or implement new features.

If you want to work on xterm.js for the benefit of a bug fix or feature to be
supported in x-terminal, here's how you can quickly get setup.

First make a fork of [xterm.js](https://github.com/xtermjs/xterm.js). Next,
clone your newly created fork as follows.

```
git clone ${YOUR_XTERMJS_FORK} ${HOME}/github/xterm.js
```

Go into your newly cloned repo for xterm.js.

```
cd ${HOME}/github/xterm.js
```

Install all needed dependencies.

```
npm install
```

Build xterm.js.

```
npm run build
```

Ensure the test suite passes.

```
npm run test
npm run lint
```

Add a global link for xterm.js to your system.

```
npm link
```

Inside your x-terminal directory, link against the global `xterm` link.

```
cd ${HOME}/github/x-terminal
npm link xterm
```

Finally, perform a rebuild with the [apm](https://github.com/atom/apm) program
inside the x-terminal directory.

```
apm rebuild
```

You're all set for developing xterm.js. Hack away in your xterm.js directory,
run `npm run build`, then reload your Atom window to see the changes to your
terminals.

# Credits and Legal

See the [NOTICE](NOTICE) and [LICENSE](LICENSE) files for copyright and license
info about this package respectively.

See the [THIRD-PARTY](THIRD-PARTY) file for info about the dependencies used in
the x-terminal package.

# Feedback

Need to submit a bug report? Have a new feature you want to see implemented in
*x-terminal*? Please feel free to report them through the
[issues page](https://github.com/UziTech/x-terminal/issues). For bug reports,
please also provide images or demos showing your issues if you can.
