# Validation

- `npm run typecheck`: passed.
- `npm run build`: passed; static export generated successfully.
- Desktop browser viewport: 1440 × 1000.
- Mobile browser viewport: 390 × 844; additional overflow check at 320 × 740.
- No client-side runtime errors in the exercised flows.
- No horizontal document overflow at the tested sizes.
- No broken image assets detected.
- Destination category filtering: passed.
- Destination detail dialog: passed.
- Experience tab switching: passed.
- Planner selections preserved in downloaded text outline: passed.
- Escape closes the dialog: passed.
- FAQ disclosure: passed.
- Mobile menu opens, navigates and closes: passed.
- Reduced-motion mobile rendering: checked.
- Final desktop hero content is visible after the entrance animation.
- Nepali display font is locally bundled; desktop and mobile screenshots included.

This is practical browser smoke testing, not a comprehensive accessibility or cross-browser audit. A live booking backend is intentionally not included.
