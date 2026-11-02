# <Site> — Motion & Scroll System (Instrumented)

Measured by sampling computed transforms at fixed scroll increments (pass 5). Every curve
below is observed, not guessed; anything not directly observed is marked `[INFERENCE]`.

## Stack
- Scroll engine (Lenis/GSAP/native), animation approach (scroll-linked vs tweened),
  GPU discipline (`will-change`, `contain`, which properties animate).

## Easing & duration vocabulary
| Curve | Use |
|---|---|
| … | … |
Durations: micro / element / ambient. Scroll-linked motion has no duration — progress is
the timeline.

## The effects
### 1. <Effect name>
Measured curve table:
| progress | transform values | state |
|---|---|---|
| … | … | … |
Key properties (what stays constant, what overlaps, what fades where).

### 2. …

## Rules to reuse
1. …
