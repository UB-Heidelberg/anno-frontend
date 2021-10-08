﻿/* -*- tab-width: 2 -*- */
'use strict';

// eslint-disable-next-line no-undef
const win = ((typeof window !== 'undefined') && window);

const annoDataCfg = {

  targetFragment: null,
  targetImage: null,
  targetImageHeight: -1,
  targetImageWidth: -1,
  targetSource: (win && win.location.href),
  targetThumbnail: null,

  iiifUrlTemplate: null, // for `enableIIIF`, see `user-interface.js`

  purlTemplate: null,
  purlId: null,


};


module.exports = annoDataCfg;
