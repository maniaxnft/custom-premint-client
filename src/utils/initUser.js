import store from "../store";
import { getUserInfo } from "../services";
import { ACTIONS } from "../store/actions";

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
    if (user?.isFollowingFromTwitter) {
      store.dispatch({
        type: ACTIONS.IS_FOLLOWING_TWITTER,
        payload: {
          data: true,
        },
      });
    }
    if (user?.isDiscordMember) {
      store.dispatch({
        type: ACTIONS.IS_DISCORD_MEMBER,
        payload: {
          data: true,
        },
      });
    }
    if (user?.ownedNFTCount) {
      store.dispatch({
        type: ACTIONS.OWNED_NFT_COUNT,
        payload: {
          data: user.ownedNFTCount,
        },
      });
    }
    if (user?.hasRare) {
      store.dispatch({
        type: ACTIONS.HAS_RARE,
        payload: {
          data: user.hasRare,
        },
      });
    }
  } catch (e) {
    store.dispatch({
      type: ACTIONS.SET_LOADING,
      payload: {
        data: false,
      },
    });
  }
};

export default initUser;
