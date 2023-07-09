'use strict';

const {
    relationLinkBody,
    textualHtmlBody,
    simpleTagBody,
    semanticTagBody,
    svgSelectorResource
} = require('@kba/anno-queries')

const pify = require('pify');
const pDelay = require('delay');

const eventBus = require('../../event-bus.js');
const licensesByUrl = require('../../license-helper.js').byUrl;

const simpleDateStamp = require('./simpleDateStamp.js');
const bindDataApi = require('./dataApi.js');
const formatters = require('./formatters.js');
const versionsProps = require('./versionsProps.js');
const toggleDetailBar = require('./toggleDetailBar.js');
const xrxUtilsUtils = require('./xrxUtilsUtils.js');


/**
 * ### anno-viewer
 *
 * Show an annotation as a bootstrap panel.
 *
 * #### Props
 *
 * - **`annotation`**: The annotation this viewer shows
 * - `asReply`: Whether the annotation should be displayed as a reply (no
 *   colapsing, smaller etc.)
 * - `purlId` The URL of the persistently adressed annotation.
 *   This is the legacy solution for highlighting an annotation when the
 *   annoApp was loaded from a PURL redirect.
 * - `collapseInitially`: Whether the anntotation should be collapsed after
 *   first render
 *
 * #### Events
 *
 * - `revise`: This annotation should be opened in an editor for editing
 * - `reply`: A new annotation as a reply to this annotation should be opened in an editor
 * - `startHighlighting`: Start highlighting this annotation
 * - `stopHighlighting`: Stop highlighting this annotation
 * - `mouseenter`: The mouse cursor is now on this annotation
 * - `mouseleave`: The mouse cursor has left this annotation
 * - `setToVersion`: Reset the currently edited annotation to the version passed
 */

function jsonDeepCopy(x) { return JSON.parse(JSON.stringify(x)); }
function orf(x) { return x || false; }


let openDoiBarSoonForDoi; // <-- See comments where it's used.


module.exports = {
    name: 'anno-viewer', // necessary for nesting

    template: require('./anno-viewer.html'),
    style:    require('./anno-viewer.scss'),

    mixins: [
      require('../../mixin/annoUrls.js'),
      require('../../mixin/api.js'),
      require('../../mixin/auth.js'),
      require('../../mixin/bootstrap-compat.js'),
      require('../../mixin/dateFmt.js'),
      require('../../mixin/l10n.js'),
      require('../../mixin/prefix.js'),
      require('../relationlink-editor/determinePredicateCaption.js'),
    ],

    data() {
      const el = this;
      const anno = orf(el.annotation);
      const initData = {
        cachedIiifLink: '',
        collapsed: el.collapseInitially,
        currentVersion: el.initialAnnotation,
        detailBarClipCopyBtnCls: 'pull-right',
        doiResolverBaseUrl: 'https://doi.org/',
        highlighted: false,
        latestVersionDoi: anno.doi,
        mintDoiMsg: '',
      };
      return initData;
    },

  props: {
    annotation: { type: Object, required: true },
    purlId: { type: String, required: false },
    showEditPreviewWarnings: { type: Boolean, default: false },
    asReply: { type: Boolean, default: false },
    // ^-- Controls whether comment is collapsible or not
    collapseInitially: { type: Boolean, default: false },
    acceptEmptyAnnoId: { type: Boolean, default: false },
  },

  beforeCreate() {
    const viewer = this;
    viewer.dataApi = bindDataApi(viewer);
  },

  mounted() {
    const viewer = this;
    const anno = viewer.annotation;
    const initialAnnoId = orf(anno).id;
    Object.assign(viewer.$el, {
      getVueElem() { return viewer; },
      initialAnnoId,
    });
    // console.debug('viewer mounted:', { initialAnnoId, anno });

    // React to highlighting events startHighlighting / stopHighlighting / toggleHighlighting
    ;['start', 'stop', 'toggle'].forEach(state => {
      const methodName = `${state}Highlighting`;
      eventBus.$on(methodName, function manageHighlight(subjectIdUrl, expand) {
        const ourIdUrl = viewer.annoIdUrl;
        // console.debug('$on cb', { methodName, ourIdUrl, subjectIdUrl });
        if (!ourIdUrl) { return; } // early init
        if (subjectIdUrl !== ourIdUrl) { return; }
        viewer[methodName](expand);
      });
    });

    const mainDoi = viewer.latestVersionDoi;
    if (mainDoi && (mainDoi === openDoiBarSoonForDoi)) {
      openDoiBarSoonForDoi = null;
      viewer.toggleDetailBar({ barName: 'doi', barWantOpen: true });
    }

    // Expand this annotation
    eventBus.$on('expand', (annoIdUrl) => {
      console.error('Thread expand handler needs full rewrite!', { annoIdUrl });
    })

    viewer.toplevelCreated = viewer.annotation.modified;
    viewer.setToVersion(viewer.newestVersion);
  },

    computed: {
        annoIdUrl()          {return this.annotation.id},
        firstHtmlBody()      {return textualHtmlBody.first(this.annotation)},
        simpleTagBodies()    {return simpleTagBody.all(this.annotation)},
        semanticTagBodies()  {return semanticTagBody.all(this.annotation)},
        relationLinkBodies() {return relationLinkBody.all(this.annotation)},
        svgTarget()          {return svgSelectorResource.first(this.annotation)},

        title() {
          const anno = this.annotation;
          if (!anno) { return ''; }
          return String(anno['dc:title'] || anno.title || '');
        },

        targetFragment() { return (this.dataApi('findTargetFragment') || ''); },

        uiModeApproval() { return this.$store.state.initCmpApprovalMode; },

        approval() {
          const val = this.annotation['dc:dateAccepted'];
          if ((val === undefined) && (!this.uiModeApproval)) { return true; }
          const st = { val, explain: '' };
          let colorCls = '';
          if (val) {
            st.jsTs = (new Date(val)).getTime();
            st.delta = st.jsTs - Date.now();
            st.future = (st.delta > 0);
            st.active = !st.future;
            if (st.active) {
              if (!this.uiModeApproval) { return true; }
            } else {
              st.explain = (this.l10n('anno_approval_future')
                + ' ' + this.dateFmt(st.jsTs));
            }
          } else {
            st.active = false;
            st.explain = this.l10n('anno_approval_pending');
            colorCls = ' text-danger'; // No decision yet => Attention needed.
          }
          st.iconCls = 'fa fa-' + (st.active ? 'unlock' : 'lock') + colorCls;
          return st;
        },

        creatorsList() {
          const { creator } = this.annotation;
          if (!creator) { return []; }
          const list = jsonDeepCopy([].concat(creator).filter(Boolean));
          const lastItem = list.slice(-1);
          if (lastItem) { lastItem['x-is-last-in-list'] = true; }
          return list;
        },

        currentLicense() {
          const licUrl = this.annotation.rights;
          const licInfo = orf(licensesByUrl.get(licUrl));
          return licInfo;
        },

        currentVersionDoi() { return this.annotation.doi || ''; },

        licenseTitleOrUnknown() {
          return (this.currentLicense.title
            || this.l10n('license_unknown'));
        },

        problemsWarningText() {
          const viewer = this;
          const anno = orf(viewer.annotation);
          const { l10n } = viewer;
          const probs = [];

          (function checkExpectedProps() {
            const expected = [
              'dc:title',
              (viewer.acceptEmptyAnnoId ? null : 'id' /* Anno ID */),
            ];
            const miss = l10n('missing_required_field') + ' ';
            expected.forEach(function check(prop) {
              if (!prop) { return; }
              if (anno[prop]) { return; }
              probs.push(miss + l10n('annofield_' + prop, prop));
            });
          }());

          if (!probs.length) { return ''; }
          return l10n('error:') + ' ' + probs.join('; ');
        },

        purl() { return this.annoIdToPermaUrl(this.annoIdUrl); },

        newestVersion() {
          const versions = this.annotation.hasVersion
          if (!versions || versions.length <= 1) {
            return this.annotation
          } else {
            return versions[versions.length - 1]
          }
        },
    },

    methods: {
        toggleDetailBar,
        formatters,

        approve() { return simpleDateStamp(this, 'dc:dateAccepted'); },
        revise() { return eventBus.$emit('revise', this.annotation) },
        reply()  { return eventBus.$emit('reply',  this.annotation) },

        makeEventContext() {
          const viewer = this;
          return {
            annoIdUrl: viewer.annoIdUrl,
            domElem: viewer.$el,
            dataApi: viewer.dataApi,
            getVueBoundAnno() { return viewer.annotation; },
            getAnnoJson() { return jsonDeepCopy(viewer.annotation); },
          };
        },

        targetFragmentButtonClicked() {
          const viewer = this;
          const ev = {
            ...viewer.makeEventContext(),
            fragment: viewer.targetFragment,
            button: viewer.$refs.targetFragmentButton,
          };
          // console.debug('emit fragmentButtonClicked:', ev);
          eventBus.$emit('targetFragmentButtonClicked', ev);
        },

        setDoiMsg(voc, ...details) {
          const viewer = this;
          if (!voc) {
            viewer.mintDoiMsg = '';
            return;
          }
          viewer.mintDoiMsg = [
            ('[' + (new Date()).toLocaleTimeString() + ']'),
            viewer.l10n(voc),
            ...details,
          ].join(' ');
        },

        async askConfirmationToMintDoi() {
          const viewer = this;
          const { annoIdUrl, l10n, setDoiMsg } = viewer;
          console.debug('askConfirmationToMintDoi: viewer anno:',
            viewer.annotation);
          // window.viewerAnnotation = viewer.annotation;
          if (!annoIdUrl) {
            return setDoiMsg('<missing_required_field> <annofield_id>');
          }
          const askReally = (l10n('confirm_irrevocable_action')
            + '\n' + l10n('mint_doi'));
          if (!window.confirm(askReally)) {
            return setDoiMsg('confirm_flinched');
          }
          setDoiMsg('request_sent_waiting');
          let resp = viewer.$store.state.debugStubMintDoiResponse;
          let updAnno;
          try {
            if (resp) {
              await pDelay(5e3);
            } else {
              resp = await pify(cb => viewer.api.mintDoi(annoIdUrl, cb))();
            }
            updAnno = orf(orf(resp).minted)[0].minted;
          } catch (err) {
            return setDoiMsg('<error:> ', String(err));
          }
          if (updAnno.doi) {
            /*
              The upcoming mutation replaces the history of the annotation as
              well, and that seems to be necessary in order to distinguish
              the DOI for the latest version from the one for the currently
              displayed version.

              Due to the unfortunate update style explained in setToVersion(),
              we don't even know which version is currently being displayed.

              Since our update affects the anno-list further up in the
              element tree, the anno-list updates, and in doing so,
              abandons the old viewer instance and makes a new one.
              The new one starts out with all detailbars folded.
              We do not get a reference to the new instance, so we cannot
              directly command it to open the DOI detailbar.

              Instead, we use `openDoiBarSoonForDoi` as an app-global dead
              letter box that is obviously prone to race conditions, trusting
              that no-one will produce DOI updates in rapid succession.

              2022-07-18: Re-opening the DOI box works, but the
              doi.of.annotation.version field shows the non-version DOI.
              Also we currently don't have time to test whether the correct
              version will be shown after the mutation. Thus, for now,
              we have to make our users jump hoops and reload the page.
            */
            openDoiBarSoonForDoi = updAnno.doi;
            // ^-- Set before the new viewer instance is being created.
            /*
            viewer.$store.commit('INJECTED_MUTATION', [
              function mutate() { Object.assign(viewer.annotation, updAnno); }
            ]);
            */
            // viewer.$store.dispatch('fetchAnnoList');
            // ^- We cannot even do that, because automatically reloading
            //    the list would hide the success message.
            return setDoiMsg('mint_doi.success');
          }
          console.error('Unexpected mintDOI response', annoIdUrl, resp);
          viewer.$el.mintDoiResp = resp;
          return setDoiMsg('unexpected_error');
        },

        mouseenter() {
            this.startHighlighting();
            eventBus.$emit('mouseenter', this.makeEventContext());
        },
        mouseleave() {
            this.stopHighlighting();
            eventBus.$emit('mouseleave', this.makeEventContext());
        },

        startHighlighting(expand)  {
            this.highlighted = true
            if (expand) eventBus.$emit('expand', this.annoIdUrl, true)
        },
        stopHighlighting()   {this.highlighted = false},
        toggleHighlighting() {this.highlighted = ! this.highlighted},
        collapse(collapseState) {
            this.collapsed = collapseState === 'toggle' ? ! this.collapsed : collapseState === 'hide'
        },

        setToVersion(updates) {
          const viewer = this;
          /*
            Usually we'd expect the function switchVersionInplace
            below to have a "state" argument and modify data inside
            that. Our annotation would be buried deeply somewhere in
            there in the anno-list, and we'd have to find it by ID
            or something.

            Except when the viewer is used in the editor preview, of
            course. So we'd have to track our viewer's pedigree, too.

            The proper way would be to not modify the annotation in
            place, but rather have a abstraction layer that shows data
            from the selected version. That would require a major
            rewrite though, and extensive testing for whether all
            elements are updated properly.

            Fortunately, in current vuex (v3.6.2), we can ignore the
            mutation function's arguments and just use our shortcut,
            because it points to the same object:
          */
          const deepStateAnnoShortcut = viewer.annotation;
          function switchVersionInplace() {
            versionsProps.forEach(function updateInplace(key) {
              deepStateAnnoShortcut[key] = updates[key];
            });
          }
          viewer.$store.commit('INJECTED_MUTATION', [switchVersionInplace]);
        },

        isOlderVersion() {
          return this.newestVersion.created !== this.annotation.created
        },

        versionIsShown(version) {
          return version.created === this.created
        },

        renderIiifLink() {
          const viewer = this;
          viewer.cachedIiifLink = xrxUtilsUtils.calcIiifLink(viewer);
        },

        doi2url(doi) { return this.doiResolverBaseUrl + doi; },

        validateRelationLinkBody(rlb) {
          const viewer = this;
          const { l10n } = viewer;
          const errors = [];
          const vocMiss = l10n('missing_required_field') + ' ';

          (function requiredFields() {
            const missing = [
              'predicate',
              'purpose',
            ].filter(k => !rlb[k]);
            if (!missing.length) { return; }
            const uiNames = missing.map(k => l10n('relationlink_' + k));
            errors.push(vocMiss + uiNames.join(', '));
          }());

          return errors;
        },

    replyRefNumText() {
      const anno = this.annotation;
      const ref = anno[':ANNO_FE:replyRefNum'];
      const tgt = anno[':ANNO_FE:inReplyToRefNum'];
      return this.l10n(tgt ? 'reply_refnum_deep' : 'reply_refnum_lv1'
        ).replace(/@@ref@@/g, ref).replace(/@@tgt@@/g, tgt);
    },














  },
};
