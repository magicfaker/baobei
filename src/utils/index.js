import utils from './utils'

const plugin = {
    install (Vue) {
        Vue.$utils = utils
        Vue.mixin({
            created: function () {
                this.$utils = Vue.$utils
            }
        })
    }
}

export default plugin
export const install = plugin.install
