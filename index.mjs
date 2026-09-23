import commonPrefix from 'generic-common-prefix';
import eq from 'equal-pmb';
import saniLib from 'sanitize-html';

import pkgManif from './package.json' with { type: 'json' };


const EX = {

  as22plugin: {
    name: pkgManif.name,
    async installOnto(instCtx) {
      const { mustPopCfg, srv } = instCtx;
      const implKey = 'annoFrontendPluginFile';
      const implFile = (mustPopCfg('undef | nul | str', implKey)
        || EX.defaultAnnoFrontendPluginFile);
      const factory = (await import(implFile)).default;
      EX.saniFunc = factory({ injected: { sani: saniLib } });
      srv.runHook.add('submitAnno/parse/after', EX.checkAnno);
      console.info('D:', pkgManif.name, 'is now on duty.');
    },
  },

  defaultAnnoFrontendPluginFile: './plugin.sanitize-html.@local.js',

  saniFunc() { throw new Error('Implementation not loaded yet!'); },

  checkAnno(hookCtx) {
    const { anno, req } = hookCtx;

    anno.body.forEach(function validate(body, idx) {
      const { format, value } = body;
      if (format !== 'text/html') { return; }
      const clean = EX.saniFunc(value);
      if (clean === value) { return; }
      const msg = ('HTML sanitization mismatch in body #' + (idx + 1)
        + ' after ' + commonPrefix.measure(value, clean)
        + ' acceptable characters.');
      if (req.serverDebugFlags.reportHtmlSanitizerComplaints) {
        let complaint;
        try { eq(clean, value); } catch (caught) { complaint = caught; }
        req.logCkp('sanit!', msg,
          complaint || EX.emptyComplaintBugMsg);
      }
      throw new Error(msg);
    });
  },



};


EX.probablyBugMsg = 'This is probably a bug in the HTML sanitizer.';
EX.emptyComplaintBugMsg = 'No diff report. ' + EX.probablyBugMsg;





export default EX;
