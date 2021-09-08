import { LocalStorage } from "quasar";
export default {
  namespaced: true,
  state: {
    settings:{
      show12Hoursformat: false,
      showTaskInOneList: false,
    }
  },

  mutations: {
    toggle12HoursFormat(state, payload){
      state.settings.show12Hoursformat = payload
    },
    toggleTaskInOneList(state, payload){
      state.settings.showTaskInOneList = payload
    },
    setSettings(state, payload){
      Object.assign(state.settings, payload)
    }
  },
  actions: {
    toggle12HoursFormat({commit, dispatch}, payload ){
      commit('toggle12HoursFormat', payload);
      dispatch('saveSettings')
    },
    toggleTaskInOneList({commit, dispatch}, payload){
      commit('toggleTaskInOneList', payload)
      dispatch('saveSettings')
    },
    saveSettings({state}){
      LocalStorage.set('settings', state.settings);
    },
    getSettings({ commit }){
      let settings = LocalStorage.getItem('settings');
      if(settings){
        commit('setSettings', settings)
      }
    }
  },
  getters: {
    getSettings(state){
      return state.settings;
    }
  },
}