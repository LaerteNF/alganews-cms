import axios from "axios";
import pkceChallenge from "pkce-challenge";
import qs from "qs";

const AUTH_SERVER = process.env.REACT_APP_AUTH_SERVER_BASE_URL;

const authServer = axios.create({
  baseURL: AUTH_SERVER,
});

authServer.interceptors.response.use(undefined, async (error) => {
  if (error?.response?.status === 401) {
    AuthService.imperativelySendToLogout();
  }

  return Promise.reject(error);
});

export interface OAuthAuthorizationTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: "bearer" | string;
  expires_in: number;
  scope: string;
  [key: string]: string | number;
}

export default class AuthService {
  public static imperativelySendToLogout() {
    window.localStorage.clear();
    window.location.href = `${AUTH_SERVER}/logout?redirect=http://localhost:3001`;
  }

  public static async getNewToken(config: {
    refreshToken: string;
    codeVerifier: string;
    scope?: string;
  }) {
    const formUrlEncoded = qs.stringify({
      refresh_token: config.refreshToken,
      code_verifier: config.codeVerifier,
      scope: config.scope,
      grant_type: "refresh_token",
      client_id: "alganews-cms",
      code_challenge_method: "S256",
    });

    console.log("new token: " + formUrlEncoded);

    return authServer
      .post<OAuthAuthorizationTokenResponse>("/oauth/token", formUrlEncoded, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data);
  }

  public static async getFirstAccessTokens(config: {
    code: string;
    codeVerifier: string;
    redirectUri: string;
  }) {
    const data = {
      code: config.code,
      code_verifier: config.codeVerifier,
      redirect_uri: config.redirectUri,
      grant_type: "authorization_code",
      client_id: "alganews-cms",
      code_challenge_method: "S256",
    };

    const encodedData = qs.stringify(data);

    console.log("DATA: " + encodedData);

    // envia a requisição do token com o data em formato de formulario no corpo da requisição
    return authServer
      .post<OAuthAuthorizationTokenResponse>("/oauth/token", encodedData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => res.data);
  }

  public static getLoginScreenUrl(codeChallenge: string) {
    const config = qs.stringify({
      response_type: "code",
      client_id: "alganews-cms",
      redirect_uri: `${window.location.origin}/authorize`,
      code_challenge: codeChallenge,
      code_challenge_metrod: "S256",
    });

    console.log(codeChallenge);

    return `http://localhost:8081/oauth/authorize?${config}`;
  }

  public static async imperativelySendToLoginScreen() {
    const { code_challenge, code_verifier } = await pkceChallenge();
    this.setCodeVerifier(code_verifier);

    console.log(code_challenge);
    console.log(code_verifier);

    const loginUrl = this.getLoginScreenUrl(code_challenge);

    // imperativo
    // gera efeito colateral enviando o usuário à tela de login
    window.location.href = loginUrl;
  }

  public static getAccessToken() {
    return window.localStorage.getItem("accessToken");
  }

  public static setAccessToken(token: string) {
    return window.localStorage.setItem("accessToken", token);
  }

  public static getRefreshToken() {
    return window.localStorage.getItem("refreshToken");
  }

  public static setRefreshToken(token: string) {
    return window.localStorage.setItem("refreshToken", token);
  }

  public static getCodeVerifier() {
    return window.localStorage.getItem("codeVerifier");
  }

  public static setCodeVerifier(getCodeVerifier: string) {
    return window.localStorage.setItem("codeVerifier", getCodeVerifier);
  }
}
