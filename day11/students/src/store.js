import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";

const store = createStore({
    plugins: [createPersistedState()],
    state: {
        count: 0,
        isWhite: true
    },
    mutations: {
        setCount: (state, count) => state.count = count,
        changeTheme: (state, isWhite) => state.isWhite = isWhite,
    },
    getters: {
        getCount: (state) =>
        {
            return state.count
        },
        getTheme: (state) =>
        {
            return state.isWhite
        }
    }  
})
export default store;
