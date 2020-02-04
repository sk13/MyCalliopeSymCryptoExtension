#include "pxt.h"

using namespace pxt;

namespace Crypto 
{

void sendRawPacket(Buffer msg) 
{
    //uBit.radio.datagram.send(msg->data, msg->len);
}
 
/**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    
void setRxBufferSize(int i)
{
    uBit.serial.setRxBufferSize(i);
}

/**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    
int getRxBufferSize()
{
    return uBit.serial.getRxBufferSize();
}

}
