/**
 * The response from the token endpoint when acquireing an access token from a refresh token
 */
export interface AccessTokenResponse {
    /**
     * The access token
     */
    access_token: string;
    /**
     * Then NEW refresh token, replace the oled one with this
     */
    refresh_token: string;
    /**
     * constant 'Bearer'
     */
    token_type: string;
    /**
     * Seconds until the access token expires
     */
    expires_in: number;
}
