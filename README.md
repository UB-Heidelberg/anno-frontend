﻿
<!--#echo json="package.json" key="name" underline="=" -->
anno-frontend
=============
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
UB Heidelberg Annotations Web Frontend
<!--/#echo -->



<!-- BEGIN-MARKDOWN-TOC -->
* [Demo](#demo)
* [Usage](#usage)
	* [`displayAnnotations(options)`](#displayannotationsoptions)
		* [Options](#options)
		* [Methods](#methods)
			* [`startHighlighting(annoId, open)`](#starthighlightingannoid-open)
			* [`stopHighlighting(annoId)`](#stophighlightingannoid)
			* [`expand(annoId)`](#expandannoid)
		* [Events](#events)
	* [Structure of the application](#structure-of-the-application)
	* [Integration into serv7](#integration-into-serv7)
* [Development](#development)
	* [Prerequisites](#prerequisites)
	* [Building the development bundle](#building-the-development-bundle)
	* [Building for deployment](#building-for-deployment)
* [Javascript API ](#javascript-api-)
* [Components](#components)
	* [anno-editor](#anno-editor)
	* [anno-list](#anno-list)
		* [Events](#events-1)
		* [Methods](#methods-1)
			* [`collapseAll(state)`](#collapseallstate)
	* [anno-viewer](#anno-viewer)
		* [Props](#props)
		* [Events](#events-2)
	* [bootstrap-button](#bootstrap-button)
		* [Properties](#properties)
	* [html-editor](#html-editor)
	* [semtags-editor](#semtags-editor)
	* [tags-editor](#tags-editor)
* [Mixins](#mixins)
	* [`this.api`](#thisapi)
	* [`this.$auth(cond, id)`](#thisauthcond-id)
	* [`this.l10n(text)`](#thisl10ntext)
	* [`this.prefix`](#thisprefix)

<!-- END-MARKDOWN-TOC -->

Demo
----

* Standalone [CDN-based online demo](test/html/displayAnnotations.dev.html)
* Self-hosted offline demo: See HTML comment in
  [`test/html/displayAnnotations.nm.html`](test/html/displayAnnotations.nm.html)
* Integration in DWork: http://digi.ub.uni-heidelberg.de/diglit/annotationen_test/0002?template=ubhd3



## Usage

See [`src/display-annotations.md`](src/display-annotations.md).



### Structure of the application

All assets are bundled into a JS files in the `dist/` subdirectory:

* `anno-frontend.dev.js`: Development build, optimized for debugging.
* `anno-frontend.prod.js`: Production build, optimized for performance.

Both install the application factory function into the property
`displayAnnotations`
of the window global.

Choose either one and include it as a script tag into the website in which
the annotations sidebar app shall run.

This factory function can then be used to initialize an instance of the
annotations sidebar app into an existing DOM element.

Currently, only one instance of the app can run per browser frame.


### Example

See source code of
[`test/html/displayAnnotations.nm.html`](test/html/displayAnnotations.nm.html).



## Development

See [`docs/development/README.md`](docs/development/README.md).



&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
MIT
<!--/#echo -->
