import type * as utils from '@iobroker/adapter-core';
import type { CarStatus } from './models/car-status';
import type { ChargingStatusResponse } from './models/charging-status';
import type { MilageStatus } from './models/milage-status';

/**
 * Heper class used to create Objects and satates
 */
export class StateManager {
    /**
     * Instanciates a Statemanager class
     *
     * @param adapter the adapter where used to managed states
     */
    constructor(private adapter: utils.AdapterInstance) {}

    /**
     * Initializes the userinfo States
     */
    public async CreateUserInfoStates(): Promise<void> {
        await this.adapter.setObjectNotExistsAsync('userInfo.sub', {
            type: 'state',
            common: {
                name: 'Seat User ID',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync('userInfo.name', {
            type: 'state',
            common: {
                name: 'User Full Name',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync('userInfo.nickname', {
            type: 'state',
            common: {
                name: 'User Nick Name',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync('userInfo.givenName', {
            type: 'state',
            common: {
                name: 'User First Name',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync('userInfo.familyName', {
            type: 'state',
            common: {
                name: 'User Family Name',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync('userInfo.email', {
            type: 'state',
            common: {
                name: 'User E-Mail',
                type: 'string',
                role: 'text',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync('userInfo.picture', {
            type: 'state',
            common: {
                name: 'User Picture URL',
                type: 'string',
                role: 'url',
                read: true,
                write: false,
            },
            native: {},
        });
    }

    /**
     * Creates the Access Token states
     */
    public async CreateAccessTokenStates(): Promise<void> {
        await this.adapter.setObjectNotExistsAsync('accessTokenInfo', {
            type: 'state',
            common: {
                name: 'Access Token',
                type: 'string',
                role: 'json',
                read: true,
                write: false,
            },
            native: {},
        });
    }
    /**
     * Create states for the given VIN
     *
     * @param vin the VIN
     * @param chargeInfo the queried Info
     */
    public async CreateAndFillChargeStates(vin: string, chargeInfo: ChargingStatusResponse): Promise<void> {
        await this.adapter.setObjectNotExistsAsync(`${vin}.battery.carCapturedTimestamp`, {
            type: 'state',
            common: {
                name: 'State received from car',
                type: 'number',
                role: 'date',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.battery.currentSOCPct`, {
            type: 'state',
            common: {
                name: 'SoC in Percent',
                type: 'number',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.battery.cruisingRangeElectricKm`, {
            type: 'state',
            common: {
                name: 'Remaining Range with current SOC',
                type: 'number',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.carCapturedTimestamp`, {
            type: 'state',
            common: {
                name: 'State received from car',
                type: 'number',
                role: 'date',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.remainingChargingTimeToCompleteMin`, {
            type: 'state',
            common: {
                name: 'Remaining minutes to complete charging',
                type: 'number',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.chargingState`, {
            type: 'state',
            common: {
                name: 'Info about charge readiness',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.chargePowerKW`, {
            type: 'state',
            common: {
                name: 'Power of Charge',
                type: 'number',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.chargeRateKmph`, {
            type: 'state',
            common: {
                name: 'Km per hour in current charge',
                type: 'number',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.chargeType`, {
            type: 'state',
            common: {
                name: 'Type of Plug (AC/DC)',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.chargeMode`, {
            type: 'state',
            common: {
                name: 'Charge Mode',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.charging.chargingSettings`, {
            type: 'state',
            common: {
                name: 'Charge Settings',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.plug.carCapturedTimestamp`, {
            type: 'state',
            common: {
                name: 'State received from car',
                type: 'number',
                role: 'date',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.plug.plugConnectionState`, {
            type: 'state',
            common: {
                name: 'Charge Settings',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.plug.plugLockState`, {
            type: 'state',
            common: {
                name: 'Plug Lock State',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.plug.externalPower`, {
            type: 'state',
            common: {
                name: 'External Power',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });

        await this.adapter.setState(
            `${vin}.battery.carCapturedTimestamp`,
            chargeInfo.status.battery.carCapturedTimestamp,
            true,
        );
        await this.adapter.setState(
            `${vin}.battery.cruisingRangeElectricKm`,
            chargeInfo.status.battery.cruisingRangeElectric_km,
            true,
        );
        await this.adapter.setState(`${vin}.battery.currentSOCPct`, chargeInfo.status.battery.currentSOC_pct, true);
        await this.adapter.setState(
            `${vin}.charging.carCapturedTimestamp`,
            chargeInfo.status.charging.carCapturedTimestamp,
            true,
        );
        await this.adapter.setState(`${vin}.charging.chargeMode`, chargeInfo.status.charging.chargeMode, true);
        await this.adapter.setState(`${vin}.charging.chargePowerKW`, chargeInfo.status.charging.chargePower_kW, true);
        await this.adapter.setState(`${vin}.charging.chargeRateKmph`, chargeInfo.status.charging.chargeRate_kmph, true);
        await this.adapter.setState(`${vin}.charging.chargeType`, chargeInfo.status.charging.chargeType, true);
        await this.adapter.setState(
            `${vin}.charging.chargingSettings`,
            chargeInfo.status.charging.chargingSettings,
            true,
        );
        await this.adapter.setState(`${vin}.charging.chargingState`, chargeInfo.status.charging.chargingState, true);
        await this.adapter.setState(
            `${vin}.charging.remainingChargingTimeToCompleteMin`,
            chargeInfo.status.charging.remainingChargingTimeToComplete_min,
            true,
        );
        await this.adapter.setState(
            `${vin}.plug.carCapturedTimestamp`,
            chargeInfo.status.plug.carCapturedTimestamp,
            true,
        );
        await this.adapter.setState(`${vin}.plug.externalPower`, chargeInfo.status.plug.externalPower, true);
        await this.adapter.setState(
            `${vin}.plug.plugConnectionState`,
            chargeInfo.status.plug.plugConnectionState,
            true,
        );
        await this.adapter.setState(`${vin}.plug.plugLockState`, chargeInfo.status.plug.plugLockState, true);
    }
    /**
     * Creates and fills states of the car overall locking status
     *
     * @param vin the car's VIN
     * @param carStatus the new status objecgt
     */
    public async CreateAndFillCarStatus(vin: string, carStatus: CarStatus): Promise<void> {
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.updatedAt`, {
            type: 'state',
            common: {
                name: 'State received from car',
                type: 'number',
                role: 'date',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.locked`, {
            type: 'state',
            common: {
                name: 'Car locked',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.lights`, {
            type: 'state',
            common: {
                name: 'Lights',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.engine`, {
            type: 'state',
            common: {
                name: 'Engine',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.hood.open`, {
            type: 'state',
            common: {
                name: 'Hood Opended',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.hood.locked`, {
            type: 'state',
            common: {
                name: 'Hood Locked',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.trunk.open`, {
            type: 'state',
            common: {
                name: 'Trunk Open',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.trunk.locked`, {
            type: 'state',
            common: {
                name: 'Trunk Locked',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.frontLeft.open`, {
            type: 'state',
            common: {
                name: 'Front Left Door Opened',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.frontLeft.locked`, {
            type: 'state',
            common: {
                name: 'Front Left Door Locked',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.frontRight.open`, {
            type: 'state',
            common: {
                name: 'Front Right Door Opened',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.frontRight.locked`, {
            type: 'state',
            common: {
                name: 'Front Right Door Locked',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.rearRight.open`, {
            type: 'state',
            common: {
                name: 'Rear Right Door Opened',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.rearRight.locked`, {
            type: 'state',
            common: {
                name: 'Rear Right Door Opened',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.rearLeft.open`, {
            type: 'state',
            common: {
                name: 'Rear Left Door Opened',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.doors.rearLeft.locked`, {
            type: 'state',
            common: {
                name: 'Rear Left Door Opened',
                type: 'boolean',
                role: 'indicator',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.windows.frontLeft`, {
            type: 'state',
            common: {
                name: 'Front Left Window Status',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.windows.frontRight`, {
            type: 'state',
            common: {
                name: 'Front Right Window Status',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.windows.rearLeft`, {
            type: 'state',
            common: {
                name: 'Rear Left Window Status',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setObjectNotExistsAsync(`${vin}.carStatus.windows.rearRight`, {
            type: 'state',
            common: {
                name: 'Rear Right Window Status',
                type: 'string',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setState(`${vin}.carStatus.doors.frontLeft.locked`, carStatus.doors.frontLeft.locked, true);
        await this.adapter.setState(`${vin}.carStatus.doors.frontLeft.open`, carStatus.doors.frontLeft.open, true);
        await this.adapter.setState(
            `${vin}.carStatus.doors.frontRight.locked`,
            carStatus.doors.frontRight.locked,
            true,
        );
        await this.adapter.setState(`${vin}.carStatus.doors.frontRight.open`, carStatus.doors.frontRight.open, true);
        await this.adapter.setState(`${vin}.carStatus.doors.rearLeft.locked`, carStatus.doors.rearLeft.locked, true);
        await this.adapter.setState(`${vin}.carStatus.doors.rearLeft.open`, carStatus.doors.rearLeft.open, true);
        await this.adapter.setState(`${vin}.carStatus.doors.rearRight.locked`, carStatus.doors.rearRight.locked, true);
        await this.adapter.setState(`${vin}.carStatus.doors.rearRight.open`, carStatus.doors.rearRight.open, true);
        await this.adapter.setState(`${vin}.carStatus.engine`, carStatus.engine, true);
        await this.adapter.setState(`${vin}.carStatus.hood.locked`, carStatus.hood.locked, true);
        await this.adapter.setState(`${vin}.carStatus.hood.open`, carStatus.hood.open, true);
        await this.adapter.setState(`${vin}.carStatus.lights`, carStatus.lights, true);
        await this.adapter.setState(`${vin}.carStatus.locked`, carStatus.locked, true);
        await this.adapter.setState(`${vin}.carStatus.trunk.locked`, carStatus.trunk.locked, true);
        await this.adapter.setState(`${vin}.carStatus.trunk.open`, carStatus.trunk.open, true);
        await this.adapter.setState(`${vin}.carStatus.updatedAt`, carStatus.updatedAt, true);
        await this.adapter.setState(`${vin}.carStatus.windows.frontLeft`, carStatus.windows.frontLeft, true);
        await this.adapter.setState(`${vin}.carStatus.windows.frontRight`, carStatus.windows.frontRight, true);
        await this.adapter.setState(`${vin}.carStatus.windows.rearLeft`, carStatus.windows.rearLeft, true);
        await this.adapter.setState(`${vin}.carStatus.windows.rearRight`, carStatus.windows.rearRight, true);
    }

    /**
     * Fills the Mileage
     *
     * @param vin the VIN of the car to query
     * @param mileage the mileage status of the car
     */
    public async CreateAndFillMileage(vin: string, mileage: MilageStatus): Promise<void> {
        await this.adapter.setObjectNotExistsAsync(`${vin}.mileage`, {
            type: 'state',
            common: {
                name: 'Mileage of the car (km)',
                type: 'number',
                role: 'state',
                read: true,
                write: false,
            },
            native: {},
        });
        await this.adapter.setState(`${vin}.mileage`, mileage.mileageKm, true);
    }
}
