import store from "../../store";
import { ACTIONS } from "../../store/actions";

const disconnect = async () => {
  store.dispatch({
    type: ACTIONS.SET_DISCORD_NAME,
    payload: {
      data: "",
    },
  });
  store.dispatch({
    type: ACTIONS.SET_TWITTER_NAME,
    payload: {
      data: "",
    },
  });
  store.dispatch({
    type: ACTIONS.SET_WALLET_ADDRESS,
    payload: {
      data: "",
    },
  });
};

export default disconnect;
