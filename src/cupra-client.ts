import type { AxiosInstance } from 'axios';
import axios from 'axios';
import type { AccessTokenResponse } from './models/access-token-response';
import type { CarStatus } from './models/car-status';
import type { ChargingStatusResponse } from './models/charging-status';
import type { MilageStatus } from './models/milage-status';
import type { SeatUserInfo } from './models/seat-user-info';

/**
 * Authenticates against the VW Connect oauth provider
 */
export class CupraClient {
    cupraIdentityClient: AxiosInstance;
    cupraApiClient: AxiosInstance;
    userInfoClient: AxiosInstance;

    private accessToken: AccessTokenResponse | null = null;
    private expirationTimestamp: number = -1;
    private onTokenRefresh: ((tokenInfo: AccessTokenResponse) => void) | null = null;

    CLIENT_ID = '3c756d46-f1ba-4d78-9f9a-cff0d5292d51@apps_vw-dilab_com';
    CLIENT_SECRET = 'eb8814e641c81a2640ad62eeccec11c98effc9bccd4269ab7af338b50a94b3a2';

    /**
     * gets called every time the access token is refreshed.
     *
     * @param cb the callback function
     */
    tokenInfoRefresh(cb: (tokenInfo: AccessTokenResponse) => void): void {
        this.onTokenRefresh = cb;
    }

    /**
     * Creates an instance
     *
     * @param initialRefreshToken the initial refresh token to authorize. After the instance is created refreshing will be handled internally
     */
    constructor(private initialRefreshToken: string) {
        this.cupraIdentityClient = axios.create({
            baseURL: 'https://identity.vwgroup.io',
            timeout: 10000,
        });
        this.userInfoClient = axios.create({
            baseURL: 'https://identity-userinfo.vwgroup.io',
            timeout: 10000,
        });
        this.userInfoClient.interceptors.request.use(async config => {
            const token = await this.getAccessToken();
            config.headers.set('Authorization', `Bearer ${token.access_token}`);
            return config;
        });
        this.cupraApiClient = axios.create({
            baseURL: 'https://ola.prod.code.seat.cloud.vwgroup.com',
            timeout: 10000,
        });
        this.cupraApiClient.interceptors.request.use(async config => {
            const token = await this.getAccessToken();
            config.headers.set('Authorization', `Bearer ${token.access_token}`);
            return config;
        });
    }

    /**
     * Retreives an access token from a given refresh token
     */
    private async getAccessToken(): Promise<AccessTokenResponse> {
        let refreshToken: string;
        if (this.accessToken == null) {
            refreshToken = this.initialRefreshToken;
        } else {
            refreshToken = this.accessToken.refresh_token;
        }
        if (this.accessToken == null || this.expirationTimestamp < Date.now()) {
            const response = await this.cupraIdentityClient.post(
                '/oidc/v1/token',
                {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                    client_id: this.CLIENT_ID,
                    client_secret: this.CLIENT_SECRET,
                },
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                },
            );
            this.accessToken = <AccessTokenResponse>response.data;
            // get a new access token after 90% of the expiration timespan.
            this.expirationTimestamp = this.accessToken.expires_in * 1000 * 0.9 + Date.now();
            if (this.onTokenRefresh) {
                this.onTokenRefresh(this.accessToken);
            }
        }
        return this.accessToken;
    }

    /**
     * Gets the Seat User Info
     */
    public async getUserInfo(): Promise<SeatUserInfo> {
        const response = await this.userInfoClient.get('/oidc/userinfo', {
            headers: {
                Accept: 'application/json',
            },
        });
        return <SeatUserInfo>response.data;
    }
    /**
     * Gets info about charging state of the given VIN
     *
     * @param vin the VIN of the car to query
     */
    public async getChargeState(vin: string): Promise<ChargingStatusResponse> {
        const response = await this.cupraApiClient.get(`/vehicles/${vin}/charging/status`, {
            headers: {
                Accept: 'application/json',
            },
        });
        return <ChargingStatusResponse>response.data;
    }

    /**
     * Gets Door and Light status of the car
     *
     * @param vin the VIN of the car to query
     */
    public async getCarStatus(vin: string): Promise<CarStatus> {
        const response = await this.cupraApiClient.get(`/v2/vehicles/${vin}/status`, {
            headers: {
                Accept: 'application/json',
            },
        });
        return <CarStatus>response.data;
    }

    /**
     * Gets the Milage
     *
     * @param vin the VIN of the car to query
     */
    public async getCarMileage(vin: string): Promise<MilageStatus> {
        const response = await this.cupraApiClient.get(`/v1/vehicles/${vin}/mileage`, {
            headers: {
                Accept: 'application/json',
            },
        });
        return <MilageStatus>response.data;
    }
}
