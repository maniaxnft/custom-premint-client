import store from "../store";
import { ACTIONS } from "../store/actions";

const setLoading = async (data) => {
  store.dispatch({
    type: ACTIONS.SET_LOADING,
    payload: {
      data,
    },
  });
};

export default setLoading;
