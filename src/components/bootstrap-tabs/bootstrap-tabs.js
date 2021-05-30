const HelpButton = require('@/components/help-button')

module.exports = {
    mixins: [require('@/mixin/l10n')],
    template: require('./bootstrap-tabs.html'),
    style: require('./bootstrap-tabs.scss'),
    components: {HelpButton},
    data() {
        return {
            tablist: []
        }
    },
    methods: {
        clickHandler(ev) {
            this.$emit('shown.bs.tab', ev)
        }
    },
    props: {
      helpUrlTemplate: {type: String, required: true},
      helpUrlManual: {type: String, required: false},
    },
    mounted() {
      this.tablist = this.$children.map(c => ({
          name: c.name,
          title: c.title,
          active: c.active,
          topic: c.topic,
      }))
    }
}
