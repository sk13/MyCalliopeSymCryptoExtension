/**
 * Functionallity to do symmetric encryption / decryption.
 *
 * 
 */
//% weight=2 color=#f2c10d icon="\uf0ec"
//% advanced=true
namespace Crypto {
    let onReceivedStringHandler: (receivedString: string) => void;
    /**
        * Encrypt a message with the given key.
        */
    //% weight=1
    //% blockId=symcrypto_encrypt block="encrypts the message  %msg| with key %key"
    export function encrypt(msg: string = "", key: string = ""): string {

        return "hello world!";
    }


    /**
     * Send a large message (up to 2413 bytes).
     */
    //% weight=1
    //% blockId=symcrypto_sendmsg block="sends the message  %msg"
    export function sendMsg(msg: string = ""): void {
        let buff: number[] = strToBuffer(msg);
        let len: number = buff.length;
        let index: number = 0;
        while (len > 19) {
            let b: Buffer = createBufferFromArray(buff, index, 19);
            radio.sendBuffer(b);
            len -= 19;
            index += 19;
        }
        if (len > 0) {
            let b: Buffer = createBufferFromArray(buff, index, len);
            radio.sendBuffer(b);
        }

    }


    function proccessReceivedBuffer(receivedBuffer: Buffer): void {
        onReceivedStringHandler("hello");
    }

    /**
    * Registers code to run when the we receive a large string.
    */
    //% blockId=crypto_on_receive_str 
    //% block="on msg received $receivedString"
    //% draggableParameters
    export function onReceivedString(cb: (receivedString: string) => void) {
        radio.onReceivedBuffer(proccessReceivedBuffer);
        onReceivedStringHandler = cb;
    }


    function createBufferFromArray(bytes: number[], offset: number, len: number): Buffer {
        let buf: Buffer = pins.createBuffer(len);
        for (let i = 0; i < len; ++i)
            buf[i] = bytes[i + offset];
        return buf;
    }

    function strToBuffer(str: string): number[] {
        let utf8: number[] = [];
        for (let i = 0; i < str.length; i++) {
            let charcode = str.charCodeAt(i);
            if (charcode < 0x80) utf8.push(charcode);
            else if (charcode < 0x800) {
                utf8.push(0xc0 | (charcode >> 6));
                utf8.push(0x80 | (charcode & 0x3f));
            }
            else if (charcode < 0xd800 || charcode >= 0xe000) {
                utf8.push(0xe0 | (charcode >> 12));
                utf8.push(0x80 | ((charcode >> 6) & 0x3f));
                utf8.push(0x80 | (charcode & 0x3f));
            }
            // surrogate pair
            else {
                i++;
                charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff)
                utf8.push(0xf0 | (charcode >> 18));
                utf8.push(0x80 | ((charcode >> 12) & 0x3f));
                utf8.push(0x80 | ((charcode >> 6) & 0x3f));
                utf8.push(0x80 | (charcode & 0x3f));
            }
        }
        return utf8;
    }
}
