"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cupra_client_exports = {};
__export(cupra_client_exports, {
  CupraClient: () => CupraClient
});
module.exports = __toCommonJS(cupra_client_exports);
var import_axios = __toESM(require("axios"));
class CupraClient {
  /**
   * Creates an instance
   *
   * @param initialRefreshToken the initial refresh token to authorize. After the instance is created refreshing will be handled internally
   */
  constructor(initialRefreshToken) {
    this.initialRefreshToken = initialRefreshToken;
    this.cupraIdentityClient = import_axios.default.create({
      baseURL: "https://identity.vwgroup.io",
      timeout: 1e4
    });
    this.userInfoClient = import_axios.default.create({
      baseURL: "https://identity-userinfo.vwgroup.io",
      timeout: 1e4
    });
    this.userInfoClient.interceptors.request.use(async (config) => {
      const token = await this.getAccessToken();
      config.headers.set("Authorization", `Bearer ${token.access_token}`);
      return config;
    });
    this.cupraApiClient = import_axios.default.create({
      baseURL: "https://ola.prod.code.seat.cloud.vwgroup.com",
      timeout: 1e4
    });
    this.cupraApiClient.interceptors.request.use(async (config) => {
      const token = await this.getAccessToken();
      config.headers.set("Authorization", `Bearer ${token.access_token}`);
      return config;
    });
  }
  cupraIdentityClient;
  cupraApiClient;
  userInfoClient;
  accessToken = null;
  expirationTimestamp = -1;
  onTokenRefresh = null;
  CLIENT_ID = "3c756d46-f1ba-4d78-9f9a-cff0d5292d51@apps_vw-dilab_com";
  CLIENT_SECRET = "eb8814e641c81a2640ad62eeccec11c98effc9bccd4269ab7af338b50a94b3a2";
  /**
   * gets called every time the access token is refreshed.
   *
   * @param cb the callback function
   */
  tokenInfoRefresh(cb) {
    this.onTokenRefresh = cb;
  }
  /**
   * Retreives an access token from a given refresh token
   */
  async getAccessToken() {
    let refreshToken;
    if (this.accessToken == null) {
      refreshToken = this.initialRefreshToken;
    } else {
      refreshToken = this.accessToken.refresh_token;
    }
    if (this.accessToken == null || this.expirationTimestamp < Date.now()) {
      const response = await this.cupraIdentityClient.post(
        "/oidc/v1/token",
        {
          grant_type: "refresh_token",
          refresh_token: refreshToken,
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );
      this.accessToken = response.data;
      this.expirationTimestamp = this.accessToken.expires_in * 1e3 * 0.9 + Date.now();
      if (this.onTokenRefresh) {
        this.onTokenRefresh(this.accessToken);
      }
    }
    return this.accessToken;
  }
  /**
   * Gets the Seat User Info
   */
  async getUserInfo() {
    const response = await this.userInfoClient.get("/oidc/userinfo", {
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  }
  /**
   * Gets info about charging state of the given VIN
   *
   * @param vin the VIN of the car to query
   */
  async getChargeState(vin) {
    const response = await this.cupraApiClient.get(`/vehicles/${vin}/charging/status`, {
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  }
  /**
   * Gets Door and Light status of the car
   *
   * @param vin the VIN of the car to query
   */
  async getCarStatus(vin) {
    const response = await this.cupraApiClient.get(`/v2/vehicles/${vin}/status`, {
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  }
  /**
   * Gets the Milage
   *
   * @param vin the VIN of the car to query
   */
  async getCarMileage(vin) {
    const response = await this.cupraApiClient.get(`/v1/vehicles/${vin}/mileage`, {
      headers: {
        Accept: "application/json"
      }
    });
    return response.data;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CupraClient
});
//# sourceMappingURL=cupra-client.js.map
