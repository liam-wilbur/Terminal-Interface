## Mango Pi Terminal + Minimal C Standard Library

A tiny terminal and supporting "standard library" running bare‑metal on the Mango Pi (RISC‑V). Input comes from a PS/2 keyboard via an interrupt‑driven driver; output is rendered to a text console over a framebuffer. A simple shell ties the system together so you can interactively exercise drivers and core libc‑like utilities.

### Highlights
- **Bare‑metal RISC‑V**: No OS;
- **Interrupt‑driven PS/2**: Robust scancode capture using GPIO interrupts and a ring buffer to avoid dropped keystrokes during delays.
- **Text console**: Simple console on top of framebuffer/graphics (`fb`, `gl`, `console`).
- **Utility library**: Minimal `printf`, `strings`, dynamic memory (`malloc`), backtrace, GPIO, timer.
- **Interactive shell**: Reads from keyboard, prints to console; handy for testing drivers and exploring the system.

### Credits
Built for a CS107E‑style bare‑metal environment on Mango Pi. Tooling and runtime support via `libmango` and the RISC‑V GCC toolchain.
