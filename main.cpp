#include "pxt.h"

using namespace pxt;

namespace Crypto 
{
//% async
void sendRawPacket(Buffer msg) 
{
    //uBit.radio.datagram.send(msg->data, msg->len);
}
 
/**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% weight=60
    //% blockId=serial_setrxbuffersize
void setRxBufferSize(int i)
{
    uBit.serial.setRxBufferSize(i);
}

/**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% weight=60
    //% blockId=serial_getrxbuffersize
int getRxBufferSize()
{
    return uBit.serial.getRxBufferSize();
}

}
