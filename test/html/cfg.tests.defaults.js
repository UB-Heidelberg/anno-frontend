﻿/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var jq = window.jQuery, cfg = {

    exportAppAsWindowProp: 'annoApp',
    // ^- In production, rather save the result of displayAnnotations.

    targetImage: ('https://upload.wikimedia.org/wikipedia/commons/thumb/'
      + 'f/fd/Ghostscript_Tiger.svg/1024px-Ghostscript_Tiger.svg.png'),
  };

  cfg.targetSource = ('http://anno.test/' + location.pathname.replace(/^\S+\//,
    '').replace(/\.\S+$/, ''));

  cfg.targetThumbnail = cfg.targetImage.replace(/\/1024px-/g, '/200px-');

  function appendFixtureAnnots() {
    var fixt = window.annotations, al;
    if (!fixt) { return; }
    al = window.annoApp.$store.state.annotationList;
    al.list = al.list.concat(fixt);
  }

  jq('#tests-toolbar-bottom input[type=button]').each(function guessId(i, e) {
    if (e.id) { return i; }
    e.id = e.value.toLowerCase().match(/[a-z]+/g).join('-');
  });
  jq('#load-fixture-annotations')[0].onclick = appendFixtureAnnots;

  // cfg.onAppReady = function ready() {};

  window.annoTestCfg = cfg;
}());
