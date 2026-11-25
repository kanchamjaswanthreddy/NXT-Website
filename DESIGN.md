# NXT Financial Group: design notes

**Current look (November 2026).** The whole site sits inside one rounded white frame with the logo
in a notch at its top, after the reference the client chose (a Dribbble concept by Nixtio for an
insurance agency). Outside the frame is a soft blur of the picture on show; inside it, warm paper,
white tiles, navy-black panels, large light type and one amber accent. It is built from scratch
with NXT's own pictures and copy; none of the reference's prices or figures are used.

- **Frame** (`components/Frame.tsx`, `.frame-*` and `.notch` in `globals.css`): fixed, takes no
  part in layout, the page scrolls normally underneath. The blur outside is one element masked by
  an SVG with the frame's shape cut out (`--mat-mask`, three sizes); if the mask cannot be drawn,
  the frame line's own wide shadow is the backdrop. `setBackdrop(src)` changes the picture.
- **Header** (`components/Nav.tsx`): glass pills either side of the notch that turn white over
  dark sections (`data-tone="dark"`, `.on-dark`), hide on the way down, and a menu sheet.
- **Home** (`app/page.tsx`, `app/home.css`, `components/home/`): `Hero` is the sentence
  "Protect your ..." with five scenes; each has a picture with a depth map (drawn in WebGL so it
  drifts and dissolves, plain images otherwise), a pinned note and a card. The first scene is also
  a film. `Hub` pins while six tiles arrive round a shield, gather, and leave "1 carrier" struck
  out beside "70+". Scene pictures come from `tools/media/scenes.py`.
- **Other pages** share the new colours, type, buttons, cards, header, closing tile and footer
  through `globals.css`; their layouts have not been redrawn one by one yet.
- The paragraphs below this point about film, the old frame and `/preview` describe earlier
  versions. `/preview` still shows the previous (Alda-style) proposal for comparison.

## Proposed new direction: `/preview`

A second look for the home page is live at **`/preview`** for sign-off. It is not linked from the
site and asks search engines not to index it. The pages above are untouched until it is approved.

**The idea.** It follows the reference the client chose: "Alda", a Framer template for financial
advisory firms (aldafinance.framer.website). Dark film behind the headline, square corners,
hairline grids, section openers split across the page's two halves, small monospaced labels,
numbered sliders, a list beside one large photograph, columns that climb, cards that stack, and
the company's initials cut out of film in the footer.

It is built from scratch in this project's own code. None of the template's files, pictures or
text are used, and the colours, typefaces, film, photographs and copy are NXT's. If the client
wants the template itself rather than a site in its style, it is sold as a Framer template and
would be licensed and built in Framer, not here.

| Part | What happens |
|---|---|
| Opening | The name is typed on a dark screen, which lifts; the headline rises line by line. Once per browser session |
| Hero | `/videos/montage-wide.mp4` and `-tall.mp4` (five scenes, 16 second loop) under a navy wash. A small caption names the scene on screen. Strip along the bottom: two facts and a moving row of carrier marks |
| Header | Takes its colours from the section under it (`data-tone` on each section), hides on the way down, returns on the way up |
| Where are you right now | Six situations in a hairline grid. Pointing at one fills it with blue and brings up the solution it leads to |
| Why independent | One photograph; five reasons in a numbered slider that moves on by itself and can be paused |
| Solutions | The six names as a list; the one pointed at, focused or tapped shows its photograph and a line about it |
| How it works | Four columns. A line across the top fills as the section is scrolled through and the numbers turn blue with it |
| Who we are | The introduction fills in word by word with the scroll |
| Numbers | Four columns that climb from left to right and grow in; the figures count up |
| Carriers | The NXT mark wired to twelve carrier logos; the lines draw, then the logos arrive |
| Values | Seven cards that stick and pile up. Each leaves its tab in view, so the pile reads P R O T E C T |
| Leadership | Eight portraits in a hairline grid, grey until pointed at |
| Testimonials | Numbered slider: who is speaking on the left, their words on a pale card |
| Call to action | Evening photograph with a slow drift |
| Questions | Heading stays put on the left; one answer open at a time on the right |
| Footer | N X T cut out of the opening shoreline film |

**Files.** `app/preview/` (page, layout, stylesheet, fonts) and `components/pv/`:
`Nav` (header, menu, back to top), `HeroFilm`, `FootFilm`, `Slider` (shared by `Advantages` and
`Voices`), `SolutionTabs`, `Faq`, `Motion`. `components/SiteFrame.tsx` leaves the site's own
header and footer off this route.

**How the motion is built.** Sections are plain server-rendered markup with `data-` attributes.
One script, `components/pv/Motion.tsx`, switches entrances on as things scroll into view
(`data-rv`), writes scroll progress into a CSS variable (`data-prog` sets `--p`) and tells each
stacked card how far the next one has covered it (`data-stack` sets `--c`); the stylesheet does
the rest. Without JavaScript, or with reduced motion, nothing is armed and every element is simply
in its finished place. Three things worth knowing before changing it:

- Do not hide an element with its own `clip-path` and wait for it to be reported on screen: it
  never is. Put `data-rv` on its wrapper.
- The sliders advance when a CSS animation on their progress line ends (`Slider.tsx`). Anything
  that stops the line stops the slider: the pointer resting on it, keyboard focus inside it, its
  pause button, reduced motion.
- Slides, captions and quotes that take turns share one grid cell (`.pv-sl-stack`, `.pv-tabs-cap`)
  so the block keeps the height of its longest item and the page below never jumps.

**Colour.** Navy `#0a1430` (text and dark sections), deeper navy `#060b1c` (footer), pale grey
`#f2f4f8`, blue `#2c52c9` (numbers, icons, labels on light), signal blue `#3a63f2` and ice
`#dce6ff` (the two fills), sky `#8faaff` (accents on dark). No gold outside the logo. Components
do not use these directly: they use seven roles (`--fg`, `--bg`, `--dim`, `--ln`, `--acc`,
`--fill`, `--on-fill`) that `.pv-dark` swaps, so the same button or slider is right on a light or
a dark section. The rule behind the two fills: on light, the fill is the saturated blue with white
text; on dark, it is the pale ice with navy text.

**Type.** Archivo (variable weight and width) for everything set in type: headings at weight 700
with tight tracking, the large numbers a little wider (`font-stretch: 112%`), the footer letters
at full width and weight 800. IBM Plex Mono 500, in capitals, for the small labels and button
text. Both are bundled in `app/preview/fonts` under the SIL Open Font License.

**The footer letters.** The film sits underneath; over it lies a sheet in the footer's own colour
carrying N X T in white with `mix-blend-mode: darken`, which keeps the darker of the two layers:
white gives way to the film, the dark sheet stays as it is. The film layer is first lifted to at
least the footer colour (`lighten`) so nothing darker than the sheet can show through outside the
letters. The font size and left margin come from the letters' measured width, so the N starts and
the T ends on the page margins.

**Still to settle if this is approved:** the rest of the pages in this look; the insights and
newsletter blocks on the home page; real footage for the hero if the client has any.

## Look

- **Palette** (`app/globals.css`, `@theme`): near-black navy `#060918` (text and dark sections),
  white, pale grey `#f5f5f7`, deep navy `#13224f`, action blue `#2c52c9` (links and the one
  coloured button). Gold is kept to check marks and hairlines: `#866a20` on light,
  `#d8bd7c` on dark.
- **Type:** Inter (variable, with its display optical size), bundled through
  `@fontsource-variable/inter` and imported in `app/layout.tsx`. Headings are weight 600 to 640
  with tight tracking; labels above headings are small, grey and in sentence case.
- **Shapes:** photographs and tiles have a 28px radius; buttons are pills; surfaces are separated
  by a hairline or by a change of background, not by outlines or drop shadows.
- **Building blocks** (classes in `globals.css`): `.display-xl`, `.display`, `.display-sm`,
  `.lead`, `.chip` (small label), `.btn` with `.btn-primary`, `.btn-cta`, `.btn-outline`,
  `.btn-ghost`, `.btn-light`, `.link`, `.tile`, `.card`, `.field`, `.on-dark`.

## Film and photographs

Everything is in `/public/videos` and `/public/media`, and `lib/media.ts` is the one list of what
is used where.

| File | What it is |
|---|---|
| `videos/hero-wide.mp4`, `hero-tall.mp4` (+ `.jpg`) | Home page opening film, 16:9 and 9:16, 10 second loop |
| `videos/dusk-wide.mp4`, `dusk-tall.mp4` (+ `.jpg`) | Closing film above the footer: the same shore, evening grade |
| `media/chapters/<solution>.jpg` + `-depth.jpg` | One 5:4 photograph per discipline, with its depth map |
| `media/<name>.jpg`, `media/depth/<name>.jpg` | The site's photographs, upscaled, with depth maps |

**How the films were made.** They are not stock footage. They are the site's own beach photograph
brought to life: the family stays still, the surf creeps in, the clouds drift and the far water
glints, on a loop whose last frame meets its first. The evening version is a tighter framing with
a colour grade. The scripts are in `tools/media/` (see the README there).

**To use real footage instead**, replace the four `.mp4` files and their `.jpg` still frames in
`/public/videos`, keeping the names. Nothing else needs to change. What works best under the
headline: a locked-off or slow shot, open sky in the top third, the subject in the middle.

**Photographs.** The originals were 640 to 1200 pixels wide. They were enlarged two times with
Real-ESRGAN, and each has a depth map from Depth Anything V2, which is what lets a still
photograph move like a slow camera (`lib/depth-gl.ts`). Two invented company names that appeared
inside the AI-made office photographs were removed (a sign on a window, text on a tablet).

## Motion

All of it follows the scroll position. Each piece has a plain fallback, listed last.

| Where | What happens | Component |
|---|---|---|
| Home, top | Headline lifts away; the film draws back into a rounded frame | `FilmHero.tsx`, `Film.tsx` |
| Home, introduction | The paragraph fills in word by word | `Manifesto.tsx` |
| Home, numbers | Count up once, when they arrive | `motion.tsx` (`Counter`) |
| Home, solutions | The section holds; the list steps through five disciplines while one photograph dissolves into the next, each with depth | `SolutionsFilm.tsx` |
| Home, independence | The headline fills in word by word; the carrier dots light in a wave | `ScrollWords.tsx`, `CarrierDots.tsx` |
| Any photograph with depth | Moves like a slow camera as it passes; leans towards the pointer | `DepthPhoto.tsx` |
| Every page, end | The evening film rises as a frame and opens to fill the screen | `ClosingFilm.tsx` |
| Header | Clear at the top, frosted once moving, dark glass over dark sections | `Nav.tsx` |

- **Reduced motion:** no film plays, nothing pins, the frames stay full size, text is solid.
- **Phones:** the solutions section becomes a row of cards to swipe; the films switch to their
  tall versions.
- **No JavaScript:** every section is a normal block and all text is visible (`<noscript>` rule in
  `app/layout.tsx`).
- **Pinned layouts** turn on from CSS media queries (`scripting`, width, height, motion); the same
  strings are in `lib/use-media.ts` so the script and the stylesheet agree.
- Scroll-linked fades use `useRamp` (`lib/ramp.ts`) rather than the array form of `useTransform`;
  the comment there explains why.
- Films have a pause button, load only when near the screen, pause when off screen, and do not
  load at all for visitors who ask for reduced motion or data saving.

## Home page sections (`app/page.tsx`)

1. `FilmHero`: the original headline, two buttons, the three assurances.
2. `Manifesto`, then four numbers.
3. `SolutionsFilm`: annuities, life, care, Medicare, disability; Home & Auto linked beneath.
4. The plan section, carriers, the captive-agent comparison, testimonials (one sideways row),
   questions, insights, the newsletter.
5. `ClosingFilm` and the footer come from `app/layout.tsx`.

## Wording added with the design

These lines were written with the design and should be reviewed like any other copy:

- "Explore annuities" and the other four link labels in the solutions section; "Also from NXT:
  Home & Auto insurance".
- The six points in the captive-agent comparison in `app/page.tsx`. They paraphrase the original
  site's paragraph on the same point; the three about captive agents go beyond it.
- "Every dot is a carrier on our list." and "One carrier." under the dots.
- Photograph descriptions (alt text) in `lib/media.ts`.
- Small labels: "Page not found", and the "Tools" heading in the footer.
- On `/preview` only: the six situations ("Retiring within ten years" and the rest), the section
  headings and the short lines beside them, the four step names (Listen, Compare, Place, Review),
  the scene captions on the film, and "See where you stand." The reasons in the slider and the
  step descriptions are adapted from sentences on the live home page, the questions and the
  solution pages. The seven value cards split
  each About page sentence into a headline and a line; "Earned, never assumed." is a tightening of
  "Trust is not assumed. It is earned".

The rest of the copy is carried over from the original site.

## Things to know

- The newsletter form does not send anywhere yet; it only shows its confirmation.
- Carrier counts differ between places: the copy says "70+", the list in `lib/carriers.ts` has 69.
- The Home & Auto pages still use the office atrium photograph; there is no home or car picture
  in the project.

## Movement tied to the scroll (home)

- `components/pv/Motion.tsx` (imported as `ScrollVars`) sets `--p` on every `[data-prog]` inside `main`. Modes: default, `exit`, `enter`, `reveal`, `pin`.
- Hero (`data-prog="exit"`): picture pushes in, headline lifts and fades as it leaves.
- Solutions (`.sol-track` / `.sol-pin`, `data-prog="pin"`): on screens 1000px and wider the section holds and the six pictures travel sideways, with a thin line showing how far along. Plain grid on phones, with reduced motion, or without scripting.
- `.band`: two lines of large words sliding in opposite directions.
- `.steps-wrap`: the four numbers light amber in turn and a line runs under them.
- `.frame-prog`: amber page-progress line on the frame's lower edge.
- Under `@supports (animation-timeline: view())`: tiles settle in, headings sharpen, pictures pan inside their tiles. Browsers without it show the finished state.
- All of it is off under `prefers-reduced-motion`; CSS defaults are the finished states.
