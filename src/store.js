import Vue from 'vue'
import Vuex from 'vuex'

import getLocalBusRoute from './js/api';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        routes: [
            {
                id: 0,
                startTime: 1568257793586,
                endTime: 1568258933586,
                fare: 0,
                transfer: 0,
                route: [
                    {
                        way: "walk",
                        line: "",
                        frm: "会津大学",
                        to: "北柳原",
                        past: 0,
                        getOn: 1568257793586,
                        getOff: 1568258933586,
                        fare: 0
                    }
                ]
            }
        ]
    },
    getters: {
        getRouteById: state => id => {
            return state.routes.filter(x => x.id === id)
        }
    },
    mutations: {
        setRoutes(res) {
            console.log("in mutations", res)
        }
    },
    actions: {
        getRoutes({commit}, payload) {
            getLocalBusRoute(
                payload,
                res => console.log(res),
                err => console.error("error with", err)
            )
        }
    }
})
