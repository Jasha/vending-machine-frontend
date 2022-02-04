import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';

import { getTokens, setTokens } from 'utils/tokenService';
import API_ENDPOINTS from 'api/constants';
import { ITokens } from 'api/types';

const vendingMachineAxios = Axios.create({
  baseURL: process.env.REACT_APP_VENDING_MACHINE_URL,
});

vendingMachineAxios.interceptors.request.use(
  async (config) => {
    const tokens = getTokens();

    if (tokens) {
      config.headers = {
        Authorization: `Bearer ${tokens.access.token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error),
);

const refreshTokens = async (tokens: ITokens) => {
  const refreshTokenResponse = await Axios.post(
    `${process.env.REACT_APP_VENDING_MACHINE_URL}${API_ENDPOINTS.REFRESH_TOKENS}`,
    {
      refreshToken: tokens.refresh.token,
    },
  );

  setTokens(refreshTokenResponse.data);
};

vendingMachineAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response.status === 401 && !config._retry) {
      config._retry = true;

      const tokens = getTokens();
      if (!tokens) return Promise.reject('Refresh token is missing.');
      try {
        await refreshTokens(tokens);
        return await vendingMachineAxios(config);
      } catch (refreshError) {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

const useAxios = makeUseAxios({
  axios: vendingMachineAxios,
});

export default useAxios;
