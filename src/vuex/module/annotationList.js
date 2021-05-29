function _sortByDateTime(field, dir=1) {
    return function(a, b) {
        a = a[field] || 0
        b = b[field] || 0
        return dir * (!(a||b) ? 0 : !a ? +1 : !b ? -1 : a < b ? -1 : a > b ? +1 : 0)
    }
}

function _sortAlpha(field, dir=1) {
    return function(a, b) {
        [a, b] = [a, b].map(x => {
            x = x[field]
            if (!x) return ''
            if (x && typeof x.displayName === 'string') x = x.displayName
            if (typeof x === 'string') return x.toLowerCase()
            return ''
        })
        return dir * (!(a||b) ? 0 : !a ? +1 : !b ? -1 : a < b ? -1 : a > b ? +1 : 0)
    }
}

const sorters = {
    created_az: _sortByDateTime('created'),
    created_za: _sortByDateTime('created', -1),
    modified_az: _sortByDateTime('modified'),
    modified_za: _sortByDateTime('modified', -1),
    title_az: _sortAlpha('title'),
    title_za: _sortAlpha('title', -1),
    creator_az: _sortAlpha('creator'),
    creator_za: _sortAlpha('creator', -1),
}


const annoList = {
    state: {
        list: [],
        sortedBy: 'created_az',
        allCollaped: 'false',
    },
    getters: {
        numberOfAnnotations(state) {return state.list.length},
    },
    actions: {

        sort({commit, state}, sortBy) {
            commit('SORT_LIST', sortBy)
        },

        // TODO
        // resetAnnotationToVersion({commit, state}, {annotation, newState}) {
        //     commit('REPLACE_ANNOTATION', {annotation, newState})
        // }

    },
    mutations: {

        SORT_LIST(state, sortBy) {
            if (!sortBy) sortBy = state.sortedBy
            state.list.sort(sorters[sortBy])
            state.sortedBy = sortBy
        },

        // TODO
        // REPLACE_ANNOTATION_IN_LIST(state, {annotation, newState}) {
        //     const idx = state.list.indexOf(annotation)
        //     Object.keys(state.list[idx]).forEach(k => {
        //         if (k === 'hasReply' || k === 'hasVersion') return
        //         else if (k in newState) state.list[idx][k] = newState[k]
        //         else state.list[idx][k] = null
        //     })
        // },

        REPLACE_LIST(state, list) {
            state.list = list
        },

        ADD_TO_LIST(state, v) {
            state.list.push(v)
        },
    }
}

module.exports = annoList;
// ^-- also found as annoApp.$store.state.annotationList
