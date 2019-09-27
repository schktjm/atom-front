import Vue from 'vue'
import Vuex from 'vuex'

import { getLocalBusRoute, getLocalBusByGeo } from './js/api';

Vue.use(Vuex);

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
        setRoutes(state, res) {
            const newRouteList = [];
            if (res.length > 0) {
                res.map(route => {
                    const newRoutes = {};
                    Object.keys(route).map(k => {
                        switch (k) {
                            case "id":
                                newRoutes["id"] = parseInt(route[k]);
                                break;
                            case "price":
                                newRoutes["fare"] = parseInt(route[k]);
                                break;
                            case "transitPoints":
                                newRoutes["transfer"] = parseInt(route[k]);
                                break;
                            case "path":
                                newRoutes["route"] = [];
                                route[k].map((v, idx) => {
                                    newRoutes["route"].push({"past": 0});
                                    Object.keys(v).map(rk => {
                                        switch (rk) {
                                            case "method":
                                                newRoutes["route"][idx]["way"] = route[k][idx][rk];
                                                break;
                                            case "routeName":
                                                newRoutes["route"][idx]["line"] = route[k][idx][rk];
                                                break;
                                            case "fromDate":
                                                newRoutes["route"][idx]["getOn"] = parseInt(route[k][idx][rk]) * 1000;
                                                break;
                                            case "toDate":
                                                newRoutes["route"][idx]["getOff"] = parseInt(route[k][idx][rk]) * 1000;
                                                break;
                                            case "price":
                                                newRoutes["route"][idx]["fare"] = parseInt(route[k][idx][rk]);
                                                break;
                                            case "from":
                                                newRoutes["route"][idx]["frm"] = route[k][idx][rk];
                                                break;
                                            case "to":
                                                newRoutes["route"][idx][rk] = route[k][idx][rk];
                                                break;
                                            default:
                                                break;
                                        }
                                    })
                                });
                                break;
                            default:
                                break;
                        }
                    });
                    newRoutes["startTime"] = parseInt(route["path"][0]["fromDate"]) * 1000;
                    const lastIdx = newRoutes["transfer"];
                    newRoutes["endTime"] = parseInt(route["path"][lastIdx]["toDate"]) * 1000;
                    newRouteList.push(newRoutes);
                });
            }
            state.routes = newRouteList;
        }
    },
    actions: {
        getRoutes({commit}, payload) {
            return getLocalBusRoute(
                payload,
                res => {
                    commit('setRoutes', res);
                    return true;
                },
                err => {
                    // eslint-disable-next-line
                    console.error(err);
                    return false;
                }
            )
        },
        getRoutesByGeo({commit}, payload) {
            return getLocalBusByGeo(
                payload,
                res => {
                    commit('setRoutes', res);
                    return true;
                },
                err => {
                    // eslint-disable-next-line
                    console.error(err);
                    return false;
                }
            )
        }
    }
})
