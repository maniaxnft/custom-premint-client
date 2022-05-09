import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL;

export const mainInstance = axios.create({
  baseURL,
});

export const isAuthenticated = async () => {
  try {
    const res = await mainInstance.get("/isAuthenticated", {
      withCredentials: true,
    });
    return res.data?.walletAddress;
  } catch (e) {
    return false;
  }
};

export const logout = async () => {
  try {
    await mainInstance.get("/logout", { withCredentials: true });
    return true;
  } catch (e) {
    return false;
  }
};

export const getNonce = async ({ walletAddress, captchaToken }) => {
  try {
    const res = await mainInstance.post("/nonce", {
      walletAddress,
      captchaToken,
    });
    return res?.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const validateSignature = async ({
  walletAddress,
  nonce,
  signature,
}) => {
  try {
    const res = await mainInstance.post(
      "/validate_signature",
      {
        walletAddress,
        nonce,
        signature,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const authenticateDiscord = async ({ code, captchaToken }) => {
  try {
    const res = await mainInstance.post(
      "/oauth/discord",
      {
        code,
        captchaToken,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const requestTwitterToken = async (captchaToken) => {
  try {
    const res = await mainInstance.post(
      "/oauth/twitter/request_token",
      { captchaToken },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};

export const checkTwitterResult = async () => {
  try {
    const res = await mainInstance.get("/oauth/twitter/check", {
      withCredentials: true,
    });
    return res.data;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

export const getUserInfo = async () => {
  try {
    const res = await mainInstance.get("/user", { withCredentials: true });
    return res.data;
  } catch (e) {
    throw new Error(e.message);
  }
};
