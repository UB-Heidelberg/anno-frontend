/**
 * ### bootstrap-button
 *
 * A bootstrap button
 *
 * #### Properties
 *
 * ....
 *
 */
module.exports = {
    mixins: [require('@/mixin/l10n')],
    props: {
        title:       String,
        prefix:      {type: String, default: 'ubhdannoprefix_zoneeditor'},
        iconText:    String,    // for using Unicode as icons
        iconFa:      String,
        src:         String,
        alt:         String,
        clickTarget: {type: Object},
        btnSize:     {type: String, default: 'sm'},
        btnClass:    {type: String, default: 'default'},
        elem:        {String: String, default: 'button'},
    },
    template: require('./bootstrap-button.html'),
}
