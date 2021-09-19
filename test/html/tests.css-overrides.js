﻿// -*- coding: utf-8, tab-width: 2 -*-
/* eslint-env browser */
'use strict';

const { testUtil } = window;
const jq = window.jQuery;

jq().ready(function installLate() {
  const panel = testUtil.addTestsPanel('Custom CSS Overrides');
  panel.addForm(`
    <div class="pull-right" style="position: relative;"><input
      type="submit" value="apply"
      class="btn btn-default btn-sm btn-outline-secondary"
      style="position: absolute; right: 0; bottom: 1em;">
    </div>
    <p>Container max-width: ${[
      '20em',
      '30em',
      '40em',
      'unset',
    ].map(v => ('<label><input type="radio" name="appMaxWidth" value="'
      + v + '"> ' + v + '</label>')).join(' ')}</p>
    <p><textarea name="txa" cols="60" rows="2" wrap="off"
      style="border: 1px solid silver; overflow: scroll; resize: both;
        font-family: monospace; font-size: 85%;"
      ></textarea><style type="text/css"></style></p>
  `, function setup(form) {
    const { txa } = form.elements;
    function fv(n) { return form.elements[n].value; }
    const dest = txa.nextElementSibling;
    function upd() {
      let css = `
        #anno-app-container { max-width: ${fv('appMaxWidth')}; }
        `;
      form.find('input[type=checkbox]').each((idx, ckb) => {
        if (!ckb.checked) { return; }
        const slots = jq(ckb).closest('p').find('input[type=text]').toArray();
        const add = ckb.value.replace(/¤/g, () => slots.shift().value);
        css += add + '\n';
      });
      css += txa.value;
      dest.innerHTML = css.trim();
    }
    form.on('submit', () => { upd(); return false; });
    form.on('click', 'input[type="checkbox"],input[type="radio"]', upd);
    txa.value = `
      `.replace(/^ {6}/mg, '').trim() + '\n';
    txa.rows = (+(txa.value.match(/\n/g) || false).length || 0) + 2;
  });
});
