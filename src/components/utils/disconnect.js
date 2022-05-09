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
  store.dispatch({
    type: ACTIONS.IS_FOLLOWING_TWITTER,
    payload: {
      data: false,
    },
  });
  store.dispatch({
    type: ACTIONS.IS_DISCORD_MEMBER,
    payload: {
      data: false,
    },
  });
  store.dispatch({
    type: ACTIONS.OWNED_NFT_COUNT,
    payload: {
      data: 0,
    },
  });
  store.dispatch({
    type: ACTIONS.HAS_RARE,
    payload: {
      data: false,
    },
  });
};

export default disconnect;
