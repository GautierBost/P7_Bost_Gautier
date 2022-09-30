export const state = () => ({
  show: false,
});

export const getters = {};

export const mutations = {
  toggle(state) {
    state.show = !state.show;
  },
  hideToggle(state) {
    state.show = false;
  },
};

export const actions = {};
