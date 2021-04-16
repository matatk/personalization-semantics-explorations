Personalization Semantics Explorations
======================================

This is a partial implementation of [Personalization Semantics Content Module 1.0 \[Editor's Draft\]](https://w3c.github.io/personalization-semantics/content/), intended for exploring design/implementation choices in the spec (i.e. **this is _not_ a demo of what using personalised content would be like for users**). This repo provides two things:

* A demo page that allows you to trigger transformations manually.
* A browser extension that performs all supported transformations on all pages after they're loaded.
  - Changes made to the page after load are not yet reflected, but easily could be with the addition of mutation observation.

Table of contents
-----------------

* [Installation and usage](#installation-and-usage)
* [Support for personalization semantics](#support-for-personalization-semantics)
* [Development](#development)
  * [Building](#building)
  * [Running](#running)
* [Acknowledgements](#acknowledgements)

Installation and usage
----------------------

The [demo page](https://matatk.github.io/personalization-semantics-explorations/demo.html) can be accessed on the web. This contains examples of how Module 1 is currently specified, plus a couple of test scenarios that we may explore. On the demo page, you need to trigger a button to perform the transformations.

When you clone this repo, it comes with the latest version of the browser extension, which you can run locally, per the [Running](#running) section below. When running the browser extension, all pages are adapted on load.

You can also follow the steps in the [Building](#building) section to build the browser extension.

Support for personalization semantics
-------------------------------------

The starting point was the W3C Editor's Draft 14 January 2021; the latest version is available at: <https://w3c.github.io/personalization-semantics/content/>

Supported so far:

* Some `@action` values.
* Some `@destination` values.
* Some `@purpose` values.

Also included, for experimentation purposes:

* Some values for a combined `@purpose` attribute that encompasses the current `@action`, `@destination` and `@purpose` attributes.
* Some values for a combined `@purpose` attribute that encompasses the current `@action` and `@destination` and a `@meaning` attribute that encompasses the current `@purpose` attribute but can be applied to static content too.

The `test/` directory contains a series of fixtures, each of which represents a specific attribute and value, so check there for the full list of what's supported.

**Note about attribute names:** for shorthand purposes, this repo refers to the attributes without the leading `data-` prefixes.

Development
-----------

### Building

You can build and run the current code locally as follows.

1.  Clone [the repository on GitHub](https://github.com/matatk/personalization-semantics-explorations) to your computer.

2.  Ensure you have all the required build tools with `npm install` (you will need [Node.js](https://nodejs.org/)).

3.  Run the tests and build script via `npm run build`. The latest extension files will be put into the `browser-extension/` directory. Follow the [Running](#running) steps below to load and use it.

Some further info on the test/build process:

-   Automated tests are run as a pre-requisite part of the build process; you can also run them with `npm test`.

-   The `pre-commit` hook is used to ensure only code that passes tests is committed (it does this by running a build, which, in turn, runs the tests). [Husky](https://github.com/typicode/husky) manages this so that a build is run before you are asked for a commit message.

### Running

The extension files are kept in the `browser-extension/` directory (they're there when you clone the repo, and are updated when you run a build).

* **Firefox:** either:
  - refer to [Temporary installation in Firefox](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/), or
  - you could use [`web-ext`](https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/) to start the extension in a temporary new profile, if you have it installed.
* **Chrome:** follow [Google's instructions on loading the extension](https://developer.chrome.com/extensions/getstarted#manifest).
* **Edge:** refer to [Sideload an extension](https://docs.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading).
* **Opera:** refer to [Testing and Debugging](https://dev.opera.com/extensions/testing/).

Acknowledgements
----------------

The specification is owned and developed by the W3C's [Personalization Task Force](https://www.w3.org/WAI/APA/task-forces/personalization/), which is part of the [Accessibile Platform Architectures Working Group](https://www.w3.org/WAI/APA/), both of which I'm a member.

Thanks to [TPGi](https://www.tpgi.com/) for sponsoring my W3C membership.

**If any of this interests you, there are several ways to [contribute to the Task Force's work](https://www.w3.org/WAI/APA/task-forces/personalization/#contribute) (note: you can contribute via [our GitHub repo](https://github.com/w3c/personalization-semantics/) without joining the Task Force), and your input would be most welcome!**

My personal interest in adaptations and personalization for accessibility began with my postgraduate research, most of which was carried out under the [Sus-IT project](http://sus-it.lboro.ac.uk/). Example publication: [The potential of adaptive interfaces as an accessibility aid for older web users](https://repository.lboro.ac.uk/articles/conference_contribution/The_potential_of_adaptive_interfaces_as_an_accessibility_aid_for_older_web_users/9403556).
