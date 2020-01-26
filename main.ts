/**
 * Modem functionality to send and received AT commands and responses.
 *
 * @author Matthias L. Jugel
 */
//% weight=2 color=#f2c10d icon="\uf0ec"
//% advanced=true
//% parts="modem
namespace Crypto
{
    // enabling DEBUG allows to follow the AT flow on the USB serial port
    // this switches the serial back and forth and introduces delays
    let DEBUG = false;
    
 /**
     * Enable AT command debug.
     */
    //% weight=1
    //% blockId=modem_setDEBUG block="enable DEBUG %debug"
    //% parts="modem"
    export function enableDebug(debug: boolean = false): void {
        DEBUG = debug;
    }
}
