/**
 * The API Response of /{{VIN}}/charging/status
 */
export interface ChargingStatusResponse {
    /**
     * Charging status
     */
    status: ChargingStatus;
}

/**
 * Collection of States related charging
 */
export interface ChargingStatus {
    /**
     * the battery status
     */
    battery: BatteryStatus;
    /**
     * charge progess if car is plugged in
     */
    charging: ChargeProgress;
    /**
     * Holds info if and since when the car is plugged in
     */
    plug: PlugStatus;
}

/**
 * Describes the state of the Battery
 */
export interface BatteryStatus {
    /**
     * When was the state received from the car
     */
    carCapturedTimestamp: number;
    /**
     * State of Charge in percent
     */
    currentSOC_pct: number;
    /**
     * remaining Raing at current SoC
     */
    cruisingRangeElectric_km: number;
}

/**
 * Info about ongoing charge
 */
export interface ChargeProgress {
    /**
     * When was the state received from the car
     */
    carCapturedTimestamp: number;
    /**
     * remaining time to complete charge
     */
    remainingChargingTimeToComplete_min: number;
    /**
     * info about charge readiness, for example if car is not plugged in it is 'notReadyForCharging'
     */
    chargingState: number;
    /**
     * Power which is used to charge
     */
    chargePower_kW: number;
    /**
     * added kilometers to range per hour of charge
     */
    chargeRate_kmph: number;
    /**
     * AC or DC or invalid
     */
    chargeType: string;
    /**
     * info about the charge mode
     */
    chargeMode: string;
    /**
     * infor about the charge settings
     */
    chargingSettings: string;
}

/**
 * Information about the plug the car is connected to
 */
export interface PlugStatus {
    /**
     * When was the state received from the car
     */
    carCapturedTimestamp: number;
    /**
     * 'connected' or 'disconnected'
     */
    plugConnectionState: string;
    /**
     * Locked or unlocked
     */
    plugLockState: string;
    /**
     * Info about available power ('available' or 'unavailable')
     */
    externalPower: string;
}
