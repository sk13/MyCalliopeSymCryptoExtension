/**
 * Functionallity to do symmetric encryption / decryption.
 *
 * 
 */
//% weight=2 color=#f2c10d icon="\uf0ec"
//% advanced=true
namespace Crypto {
    let onReceivedStringHandler: () => void;
    let lastMsg: string = "";
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
        let utf8: number[] = strToUTF8(msg);
        let strEncoded: string = encodeBinary(utf8);
        let len: number = strEncoded.length;
        let index: number = 0;
        while (len > 10) {
            let s: string = strEncoded.substr(index, 10);
            radio.sendString(s);
            len -= 10;
            index += 10;
        }

        if (len > 0) {
            let s: string = strEncoded.substr(index);
            radio.sendString(s);
        }
        radio.sendNumber(strEncoded.length); //end of message

    }


    /**
            * Encrypt a message with the given key.
            */
    //% weight=2
    //% blockId=symcrypto_last_msg block="get last msg"
    export function getMsg(): string {

        return lastMsg;
    }

    function proccessReceivedPacket(packet: radio.Packet): void 
    {
        let s: string = packet.receivedString;
        if(s.length>0)
            {
                lastMsg+=s;
                return;
            }
        let n:number=packet.receivedNumber;
        if(n>0&&n==lastMsg.length)
            {    
                onReceivedStringHandler();
                lastMsg="";
            }
    }


    /**
       * Registers code to run when the we receive a large string.
       */
    //% blockId=crypto_on_receive_str 
    //% block="on msg received"
    //% draggableParameters=reporter
    export function onReceivedString(cb: () => void): void {
        radio.onDataPacketReceived(proccessReceivedPacket);
        onReceivedStringHandler = cb;
    }

    function createBufferFromArray(bytes: number[], offset: number, len: number): Buffer {
        let buf: Buffer = pins.createBuffer(len);
        for (let i = 0; i < len; ++i)
            buf[i] = bytes[i + offset];
        return buf;
    }

    function encodeBinary(bytes: number[]): string {
        let s: string = "";
        let i: number = 0;
        for (i = 0; i < bytes.length; i++) {
            s += String.fromCharCode(bytes[i]);
        }
        return s;
    }

    function strToUTF8(str: string): number[] {
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
