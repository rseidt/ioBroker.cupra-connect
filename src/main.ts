/*
 * Created with @iobroker/create-adapter v3.1.2
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
import * as utils from '@iobroker/adapter-core';
import { CupraClient } from './cupra-client';
import { StateManager } from './state-manager';

// Load your modules here, e.g.:
// import * as fs from 'fs';

class CupraConnect extends utils.Adapter {
    private pollInterval: ioBroker.Interval | null = null;
    private cupraClient: CupraClient | null = null;
    private stateManager: StateManager = new StateManager(this);
    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({
            ...options,
            name: 'cupra-connect',
        });
        this.on('ready', this.onReady.bind(this));
        this.on('stateChange', this.onStateChange.bind(this));
        // this.on('objectChange', this.onObjectChange.bind(this));
        // this.on('message', this.onMessage.bind(this));
        this.on('unload', this.onUnload.bind(this));
    }

    /**
     * Is called when databases are connected and adapter received configuration.
     */
    private async onReady(): Promise<void> {
        // Initialize your adapter here

        // Reset the connection indicator during startup

        // The adapters config (in the instance object everything under the attribute "native") is accessible via
        // this.config:
        if (!this.config.initialRefreshToken) {
            this.log.error('No refresh token configured. Cannot authenticate.');
            await this.setState('info.connection', false, true);
            return;
        }
        if (!this.config.vin) {
            this.log.error('No VIN specified. Cannot continue.');
            await this.setState('info.connection', false, true);
            return;
        }

        this.log.debug('using refresh token to acquire access token...');

        const accessTokenValue = await this.getStateAsync('accessTokenInfo');
        if (accessTokenValue && accessTokenValue.val) {
            const info = JSON.parse(<string>accessTokenValue.val);
            this.cupraClient = new CupraClient(info.refresh_token);
        } else {
            this.cupraClient = new CupraClient(this.config.initialRefreshToken);
        }
        this.cupraClient.tokenInfoRefresh(tokenInfo => {
            void this.setState('accessTokenInfo', JSON.stringify(tokenInfo), true);
        });
        const seatUserInfo = await this.cupraClient.getUserInfo();
        await this.stateManager.CreateUserInfoStates();
        await this.setState('userInfo.sub', seatUserInfo.sub, true);
        await this.setState('userInfo.name', seatUserInfo.name, true);
        await this.setState('userInfo.nickname', seatUserInfo.nickname, true);
        await this.setState('userInfo.givenName', seatUserInfo.given_name, true);
        await this.setState('userInfo.familyName', seatUserInfo.family_name, true);
        await this.setState('userInfo.email', seatUserInfo.email, true);
        await this.setState('userInfo.picture', seatUserInfo.picture, true);
        await this.setState('info.connection', true, true);
        this.pollInterval = this.setInterval(async () => {
            const chargeInfo = await this.cupraClient!.getChargeState(this.config.vin);
            await this.stateManager.CreateAndFillChargeStates(this.config.vin, chargeInfo);
            const carStatus = await this.cupraClient!.getCarStatus(this.config.vin);
            await this.stateManager.CreateAndFillCarStatus(this.config.vin, carStatus);
            const mileage = await this.cupraClient!.getCarMileage(this.config.vin);
            await this.stateManager.CreateAndFillMileage(this.config.vin, mileage);
        }, 60000)!;
    }

    /**
     * Is called when adapter shuts down - callback has to be called under any circumstances!
     *
     * @param callback - Callback function
     */
    private onUnload(callback: () => void): void {
        try {
            if (this.pollInterval) {
                clearInterval(this.pollInterval);
            }
            // Here you must clear all timeouts or intervals that may still be active
            // clearTimeout(timeout1);
            // clearTimeout(timeout2);
            // ...
            // clearInterval(interval1);

            callback();
        } catch (error) {
            this.log.error(`Error during unloading: ${(error as Error).message}`);
            callback();
        }
    }

    // If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
    // You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
    // /**
    //  * Is called if a subscribed object changes
    //  */
    // private onObjectChange(id: string, obj: ioBroker.Object | null | undefined): void {
    //     if (obj) {
    //         // The object was changed
    //         this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
    //     } else {
    //         // The object was deleted
    //         this.log.info(`object ${id} deleted`);
    //     }
    // }

    /**
     * Is called if a subscribed state changes
     *
     * @param id - State ID
     * @param state - State object
     */
    private onStateChange(id: string, state: ioBroker.State | null | undefined): void {
        if (state) {
            // The state was changed
            this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);

            if (state.ack === false) {
                // This is a command from the user (e.g., from the UI or other adapter)
                // and should be processed by the adapter
                this.log.info(`User command received for ${id}: ${state.val}`);

                // TODO: Add your control logic here
            }
        } else {
            // The object was deleted or the state value has expired
            this.log.info(`state ${id} deleted`);
        }
    }
    // If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
    // /**
    //  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
    //  * Using this method requires "common.messagebox" property to be set to true in io-package.json
    //  */
    //
    // private onMessage(obj: ioBroker.Message): void {
    //     if (typeof obj === 'object' && obj.message) {
    //         if (obj.command === 'send') {
    //             // e.g. send email or pushover or whatever
    //             this.log.info('send command');
    //             // Send response in callback if required
    //             if (obj.callback) this.sendTo(obj.from, obj.command, 'Message received', obj.callback);
    //         }
    //     }
    // }
}
if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new CupraConnect(options);
} else {
    // otherwise start the instance directly
    (() => new CupraConnect())();
}
