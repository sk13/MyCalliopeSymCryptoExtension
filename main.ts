/**
 * Functionallity to do symmetric encryption / decryption.
 *
 * 
 */
//% weight=2 color=#f2c10d icon="\uf0ec"
//% advanced=true
namespace Crypto
{  
 /**
     * Encrypt a message with the given key.
     */
    //% weight=1
  //% blockId=symcrypto_encrypt block="encrypts the message  %msg| with key %key"
       export function encrypt(msg: string = "", key: string = ""): string {
           radio.setTransmitPower(7);
           return "hello world!";
    }
}
