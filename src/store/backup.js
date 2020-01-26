/* eslint-disable no-console */
import Vue from "vue";
import Vuex from "vuex";
import db, { getNotes } from "boot/db.js";
console.log("TCL: getNotes", getNotes);
// we first import the module
// import showcase from './showcase'

Vue.use(Vuex);

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    state: () => ({
      notes: []
    }),
    actions: {
      async loadNotes({ commit }) => {
        const notes = await getNotes()
        commit("setNotes", notes)
      }
    },
    mutations: {
      setNotes: state,payload => {
        return state.notes =
          ;
      }
    },
    strict: process.env.DEV
  });

  /*
    if we want some HMR magic for it, we handle
    the hot update like below. Notice we guard this
    code with "process.env.DEV" -- so this doesn't
    get into our production build (and it shouldn't).
  */

  return Store;
}
