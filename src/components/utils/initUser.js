import store from "../../store";
import { getUserInfo } from "../../services";
import { ACTIONS } from "../../store/actions";

const initUser = async () => {
  try {
    const user = await getUserInfo();
    if (user?.discordName) {
      store.dispatch({
        type: ACTIONS.SET_DISCORD_NAME,
        payload: {
          data: user.discordName,
        },
      });
    }
    if (user?.twitterName) {
      store.dispatch({
        type: ACTIONS.SET_TWITTER_NAME,
        payload: {
          data: user.twitterName,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default initUser;
