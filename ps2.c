/* File: ps2_assign7.c
 * -------------------
 *  ps2_assign7.c reworks the existing ps2 module to read each bit of an incoming scancode individually using interrupts to trigger a handler function for each bit
 */
#include "gpio.h"
#include "gpio_extra.h"
#include "gpio_interrupt.h"
#include "uart.h"
#include "malloc.h"
#include "ps2.h"
#include "timer.h"
#include "ringbuffer.h"
#include "printf.h"

// A ps2_device is a structure that stores all of the state and information
// needed for a PS2 device. The clock field stores the gpio id for the
// clock pin, and the data field stores the gpio id for the data pin.
// Read ps2_new for example code that sets and uses these fields.
//
// You may extend the ps2_device structure with additional fields as needed.
// A pointer to the current ps2_device is passed into all ps2_ calls.
// Storing state in this structure is preferable to using global variables:
// it allows your driver to support multiple PS2 devices accessed concurrently
// (e.g., a keyboard and a mouse).
//
// This definition fills out the structure declared in ps2.h.
struct ps2_device {
    gpio_id_t clock;
    gpio_id_t data;
    uint16_t scancode;
    int bitNum; // tracks just number of data bits
    int onBits;
    int state; // 0 - start, 1 - data, 2 - parity, 3 - stop
    rb_t *rb;

};

static void ps2_interrupt_handler(void *aux_data) {
    ps2_device_t *dev = (ps2_device_t *)aux_data;
    int data = gpio_read(dev->data);
    // putchar 1 or 0 based on value of data bit
    /*  if (data == 1) {
       uart_putchar('1');
    }
    else if (data == 0) {
       uart_putchar('0');
    } */

    // Assign 7:
    // Check what state dev->state is in
    // for start, check if dev->data is 0, change struct values, return
    // for data, change scancode, then return
    // for parity, check dev->onBits, then return
    // for stop, check if dev-> data is 1, change struct values, return
    //
    // always change state to increase or reset

    // check start bit
    if (dev->state == 0) {
       if (data == 0) {
	  // reinitialize parameters for resets
          dev->scancode = 0;
	  dev->bitNum = 0;
	  dev->onBits = 0;
	  dev->state = 1; // now data state
       }
    }
    // check data bits
    else if (dev->state == 1) {
       // adds data to scancode starting with least significant bit 
       dev->scancode |= (data << dev->bitNum);
       dev->bitNum++;
       // check if all data bits have been found
       if (dev->bitNum >= 8) {
          dev->state = 2;
       } 

       if (data == 1) {
          dev->onBits++; // check onBits for parity
       }
    }
    // check parity
    else if (dev->state == 2) {
       int even = (dev->onBits % 2 == 0);
       if ((even && data == 1) || (!even && data == 0)) {
          dev->state = 3;
       }
       else {
          dev->state = 0;
       }
    }
    // check stop bit
    else if (dev->state == 3) {
       if (data == 1) {
	   if (rb_full(dev->rb)) {  
              rb_dequeue(dev->rb); 
	   }
           rb_enqueue(dev->rb, dev->scancode); // queues completed scancode
       }

       // reset given all bits have been identified
       dev->state = 0;
    }

    // prevents retriggering
    gpio_interrupt_clear(dev->clock);
}

// Creates a new PS2 device connected to given clock and data pins,
// The gpios are configured as input and set to use internal pull-up
// (PS/2 protocol requires clock/data to be high default)
ps2_device_t *ps2_new(gpio_id_t clock_gpio, gpio_id_t data_gpio) {
    // consider why must malloc be used to allocate device
    ps2_device_t *dev = malloc(sizeof(*dev));

    dev->clock = clock_gpio;
    gpio_set_input(dev->clock);
    gpio_set_pullup(dev->clock);

    dev->data = data_gpio;
    gpio_set_input(dev->data);
    gpio_set_pullup(dev->data);

    dev->bitNum = 0;
    dev->onBits = 0;
    dev->state = 0;
    dev->scancode = 0;
    dev->rb = rb_new();

    gpio_interrupt_init();
    gpio_interrupt_config(dev->clock, GPIO_INTERRUPT_NEGATIVE_EDGE, 0);
    gpio_interrupt_register_handler(dev->clock, ps2_interrupt_handler, dev); 
    gpio_interrupt_enable(dev->clock);
    return dev;
}

// Read a single PS2 scancode. Always returns a correctly received scancode:
// if an error occurs (e.g., start bit not detected, parity is wrong), the
// function should read another scancode.
uint8_t ps2_read(ps2_device_t *dev) {
    while(rb_empty(dev->rb)) {} // loops until a scancode is completed and enqueued to ring buffer
    uint8_t sc = rb_dequeue(dev->rb);
    return sc; // returns dequeued scancode 

}
