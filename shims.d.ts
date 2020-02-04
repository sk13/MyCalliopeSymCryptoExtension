declare namespace Crypto {

 
    //% async shim=Crypto::sendRawPacket
    function sendRawPacket(msg: Buffer): void;

/**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% weight=60
    //% blockId=serial_getrxbuffersize
    //% shim = Crypto::getRxBufferSize
    function getRxBufferSize():number;

/**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% weight=60
    //% blockId=serial_setrxbuffersize
    //% shim = Crypto::setRxBufferSize
    function setRxBufferSize(size:number):void;
    }
