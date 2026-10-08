# Design notes — Yatra Nepal

## Direction

An editorial journey from the spectacular Himalayan landscape to intimate travel moments. The hero echoes the supplied reference's large destination lettering behind the landscape, compact navigation and small destination preview. The page expands into a coherent Nepal travel experience.

## Palette

| Token | Value | Role |
|---|---|---|
| Paper | #F7F6F2 | Page background |
| Forest | #172823 | Text, controls, dark surfaces |
| Ember | #DB513B | Brand accent and focus outlines |
| Muted | #727770 | Secondary copy |
| Line | #DCDFD6 | Subtle dividers |

## Typography

- Manrope variable: navigation, NEPAL title, body and UI; weights 400–800.
- Playfair Display variable, italic: editorial emphasis inside large headings.
- Main body copy: 16px, spacious leading.
- Fluid heading sizes, responsive layouts at 1100px, 767px and 380px.
- Font files and SIL licenses included under public/fonts/.

## Motion

- GSAP entrance timeline: navigation enters, NEPAL letters stagger, supporting content follows.
- ScrollTrigger: foreground and background move together; title moves independently to create depth.
- Scroll-triggered editorial reveals and reading-progress indicator.
- CSS image zoom, button hover and short tab/filter transitions.
- `prefers-reduced-motion` disables animation and smooth scrolling. Content remains visible without GSAP animation.
- GSAP matchMedia/context revert on unmount to prevent duplicate animations.

## Asset map

| File | Location |
|---|---|
| himalaya.jpg | Hero, mountain mask, Himalayas card, adventure experience |
| pokhara.jpg | Pokhara card, preview, slow-travel experience, closing invitation |
| bhaktapur.jpg | Bhaktapur card and culture experience |

The mountain foreground is an SVG clipping mask applied to the source photograph, preserving its actual texture and scene. It is authored in the component and is not a separate PNG. Photos and local fonts are bundled; no image CDN is required at runtime.

## Interaction map

- Explore Nepal → destination section.
- Hero preview arrows/dots → selected destination teaser.
- Preview/card → destination detail dialog.
- Filter → category-matched destination cards.
- Experience tabs → corresponding photo and story; keyboard arrows/Home/End supported.
- Plan your trip → local outline builder.
- Download outline → text file reflecting the chosen style, duration and group size.
- FAQ → native disclosure panels.
