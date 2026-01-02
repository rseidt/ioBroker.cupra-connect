/**
 * User info of Seat Account
 */
export interface SeatUserInfo {
    /**
     * The UUID, will be used in other API requests
     */
    sub: string;
    /**
     * Display Name
     */
    name: string;
    /**
     * Given Name
     */
    given_name: string;
    /**
     * Last Name
     */
    family_name: string;
    /**
     * Nickname
     */
    nickname: string;
    /**
     * E-Mail
     */
    email: string;
    /**
     * Weather the e-mal is confirmed
     */
    email_verified: boolean;
    /**
     * Epoch timestamp when the profile was last updated
     */
    updated_at: number;
    /**
     * orl of picture (needs access token to get retured)
     */
    picture: string;
}
