
<!--#echo json="package.json" key="name" underline="=" -->
as22-plugin-html-sanitizer
====================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Plugin stub to allow the anno-frontend HTML sanitizer plugin to also run in
anno-server-22.
<!--/#echo -->


Install
-------

1.  Installing this plugin assumes you have already installed
    [`anno-server-22`](https://github.com/UB-Heidelberg/anno-server-22).
1.  In (the top level of) your anno server directory,
    as the anno server user,
    1.  `git clone --single-branch --branch as22-plugin-html-sanitizer https://github.com/UB-Heidelberg/anno-frontend.git plugins/html-sanitizer`
    1.  `cd plugins/html-sanitizer`
1.  You now need a local copy of the exact anno-frontend plugin
    (`test/html/plugin.sanitize-html.js`)
    that you use on your webserver.
    * They need to always stay in sync, so it's recommended to use a symlink
      to the version on your webspace.
    * However, when you run anno server inside docker,
      your webspace may not be visible from inside the container,
      so you may need to use alternative methods like
      * Creating a (cascade of) hard link(s) to reach the webspace's
        anno-frontend directory from a place where docker can see it.
      * Manually keeping them synchronized.
1.  Create a symlink `plugin.sanitize-html.@local.js` to said local copy of
    the frontend plugin, or move/rename it to that name directly.
    You can also use a different filename, but then you'll need to ensure
    it's configured correctly in the `annoFrontendPluginFile` setting of
    the server plugin config (next step).
1.  In your anno server config directory, there should be a config
    topic directory `plugins`. (If not, double-check your server version.)
    There, create a plugin config according to
    [this example config](docs/example/sanitize_anno_html.yaml).
1.  Adjust the plugin config if needed.
1.  Back in (the top level of) your anno server directory,
    now as a docker-capable user,
    run: `./util/install_dockerized.sh`
    * It should automatically detect the new plugin and report something like
      `install_npm_module @ /app/plugins/html-sanitizer`
1.  Changes will take effect the next time you start your anno server.
    * If should print a startup message like
      `D: as22-plugin-html-sanitizer is now on duty.`



Usage
-----

The anno server will use this plugin automatically when installed correctly,
and will engage it automatically when a new annotation submission is received.




<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key="license" -->
MIT
<!--/#echo -->
