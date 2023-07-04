﻿/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, browser: true */
/* -*- tab-width: 2 -*- */
(function () {
  'use strict';
  var cfg = {

    makeDebugLogger: Function.bind.bind(console.debug, console),

    exportAppAsWindowProp: 'annoApp',
    // ^- In production, rather save the result of displayAnnotations.

    iiifUrlTemplate: ('http://iiif.anno.test/someProjectName'
      + ':_image/%ir/full/0/default.jpeg'),
    debugIiifBounds: true,

    uiDebugMode: true,
    acl: {
      '*': { '*': true },
      // 'debug:skipFetchAcl': true,
      // 'debug:override:isLoggedIn': true,
    },

    events: {},
  };

  cfg.targetSource = ('http://anno.test/' + location.pathname.replace(/^\S+\//,
    '').replace(/\.\S+$/, ''));

  cfg.diglitBaseUrl = 'https://digi.ub.uni-heidelberg.de/diglit/';

  cfg.initCmpOnVersionSelected = cfg.makeDebugLogger('Version selected:');

  // cfg.events.appReady = function ready() {};


  window.annoTestCfg = cfg;
}());
