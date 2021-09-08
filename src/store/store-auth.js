import { firebaseAuth } from 'boot/firebase';
import { LocalStorage, Loading } from 'quasar';
import { showErrorMessage } from 'src/functions/function-show-error-message';

export default {
  namespaced: true,
  state: {
    logged_in: false,
  },

  mutations: {
    setLoggedIn(state, value){
      state.logged_in = value
    }
  },
  actions: {
    registerUser({  }, payload){//Register
      Loading.show();
      firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userCredential) => {
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        showErrorMessage(errorMessage);
      });
    },
    loginUser({}, payload){
      Loading.show();
      firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then((userCredential) => {
      }).catch((error) => {
        // console.log(error);
        const errorMessage = error.message;
        showErrorMessage(errorMessage);
        Loading.hide();
      });
      
    },
    logoutUser(){//Login
      firebaseAuth.signOut();
      this.$router.replace('/auth');
    },
    handleAuthStateChange({ commit, dispatch}){
      firebaseAuth.onAuthStateChanged((user)=>{
        Loading.hide();
        if(user){
          commit('setLoggedIn', true);
          LocalStorage.set('logged_in', true)
          this.$router.push('/').catch(()=>{});
          dispatch('task/firebaseReadData', null, {root: true});
        }else{
          commit('setLoggedIn', false)
          commit('task/setTaskDownloaded', false, {root: true});
          commit('task/clearTasks', false, {root: true});
          LocalStorage.set('logged_in', false)
          this.$router.push('/auth').catch(()=>{
            
          });
        }
      })
    }
  },
  getters: {
    getLoggedInStatus(state){
      return state.logged_in;
    }
  }
}