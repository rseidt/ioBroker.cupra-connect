/**
 * Describes the Car status
 */
export interface CarStatus {
    /**
     * Car Lock status
     */
    locked: boolean;
    /**
     * Lights status 'on' or  'off'
     */
    lights: string;
    /**
     * 'on' or 'off'
     */
    engine: string;
    /**
     * Lock status of the hood
     */
    hood: LockStatus;
    /**
     * Lock status of the trunk
     */
    trunk: LockStatus;
    /**
     * Lock status of all doors
     */
    doors: DoorLockStatus;
    /**
     * Satus of all windows
     */
    windows: WindowStatus;
    /**
     * Date when the state was received from the car
     */
    updatedAt: number;
}

/**
 * Contains info about the lock status and the open/close status
 */
export interface LockStatus {
    /**
     * is the door open
     */
    open: boolean;
    /**
     * is the door locked
     */
    locked: boolean;
}

/**
 * container for the lock status of the car's doors
 */
export interface DoorLockStatus {
    /**
     * Front Left Status
     */
    frontLeft: LockStatus;
    /**
     * Front Right Status
     */
    frontRight: LockStatus;
    /**
     * Rear Left Status
     */
    rearLeft: LockStatus;
    /**
     * Rear Right Status
     */
    rearRight: LockStatus;
}

/**
 * close status of the windows
 */
export interface WindowStatus {
    /**
     * 'open' or 'closed'
     */
    frontLeft: string;
    /**
     * 'open' or 'closed'
     */
    frontRight: string;
    /**
     * 'open' or 'closed'
     */
    rearLeft: string;
    /**
     * 'open' or 'closed'
     */
    rearRight: string;
}
