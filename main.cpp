#include "pxt.h"

using namespace pxt;

namespace Crypto 
{
//% async
void sendRawPacket(Buffer msg) 
{
    //uBit.radio.datagram.send(msg->data, msg->len);
}

void setRxBufferSize(int i)
{
    uBit.serial.setRxBufferSize(i);
}

int getRxBufferSize()
{
    return uBit.serial.getRxBufferSize();
}

}
