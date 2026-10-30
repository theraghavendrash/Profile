---
name: Editorial Engineering
colors:
  surface: '#f9f9f8'
  surface-dim: '#dadad9'
  surface-bright: '#f9f9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f3'
  surface-container: '#eeeeed'
  surface-container-high: '#e8e8e7'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#464555'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1f0'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#414855'
  on-tertiary: '#ffffff'
  tertiary-container: '#59606e'
  on-tertiary-container: '#d4dbeb'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#dce2f3'
  tertiary-fixed-dim: '#c0c7d6'
  on-tertiary-fixed: '#151c27'
  on-tertiary-fixed-variant: '#404754'
  background: '#f9f9f8'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 52px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  overline:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.01em
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2.5rem
  space-xl: 4rem
---

## Brand & Style

This design system embodies the ethos of modern developer craft: calm, exact, deliberate, and free of superficial ornament. Inspired by the typographic rigor of high-end editorial publications and the structural clarity of premier engineering tools like Linear, Vercel, and Stripe, the aesthetic emphasizes quiet authority over decorative noise.

The audience consists of technical leaders, founders, design engineers, and collaborators who value meticulous execution, semantic discipline, and signal-over-noise ratio. The visual tone must elicit trust, focus, and intellectual maturity.

### Core Visual Principles
- **Restrained Monochromatism:** Contrast is driven primarily through typographic scale, weight, and absolute clarity rather than color abundance.
- **Architectonic Grid:** Interfaces rely on balanced negative space, razor-sharp hairline separation (1px borders), and flat planar surfaces.
- **Zero Skenomorphism or Gimmicks:** Strict prohibition of blurred glowing edges, radial gradient backgrounds, floating blur spheres, skeuomorphic depth, or dramatic drop shadows. Depth is planar, semantic, and structural.
- **Micro-tactile Precision:** Interactive states respond via instantaneous or crisp transitions (150ms ease-out) of borders, text tones, and crisp background shifts.

## Colors

The palette establishes an austere, gallery-like reading canvas with surgical application of deep indigo accenting.

### Palette Architecture
- **Canvas Base (`#FAFAF9`):** A warm off-white stone base that eliminates harsh screen glare while preserving high baseline luminance.
- **Surfaces (`#FFFFFF`):** Pure white flat surfaces applied to cards, code blocks, sheets, and elevated contextual modules.
- **Dominant Ink (`#111111`):** Deep near-black used for primary headlines, high-emphasis text, interactive icons, and solid primary fills.
- **Muted Ink (`#6B7280`):** Neutral slate tone for body prose secondary lines, captions, inactive states, and timestamps.
- **Hairlines & Dividers (`#E5E5E5`):** Structural 1px boundary lines. Never drop shadows where a clean hairline border can divide space.
- **Deep Indigo Accent (`#4F46E5`):** The solitary functional accent. Used strictly and sparingly for focal CTAs, focused input states, subtle live status indicators, and text hyperlinking. It must never coat large surface areas or background washes.

## Typography

The typographic hierarchy couples **Inter** for narrative rhythm with **JetBrains Mono** for technical data and metadata indexing.

### Rules of Engagement
- **Tracking Tight on Headings:** All display and title elements set in Inter use negative tracking (`-0.015em` to `-0.03em`) and 600 weight to yield a condensed, cohesive editorial appearance.
- **Uppercase Eyebrows:** Section kickers, metadata categories, and contextual flags use Inter uppercase set at 11px/12px with wide tracking (`0.08em`) and muted coloring (`#6B7280`).
- **Technical Precision in JetBrains Mono:** All source snippets, metrics, dates, commit hashes, stack tags, and status labels must utilize JetBrains Mono at 11px or 13px. Numbers are always tabular.
- **Line Length and Leading:** Body content must maintain an optimal reading measure between 58 and 68 characters per line, with open leading (1.6x) to preserve whitespace.

## Layout & Spacing

Layouts adhere strictly to an 8px modular baseline system, prioritizing generous surrounding margins over cramped density.

### Breakpoints & Canvas Architecture
- **Desktop (HL
NŠŠˆX^ÛÛZ[™\ˆÚYØ\Y]LLŒ›ÜˆÛÛ\™Z[œÚ]™H\Ú›Ø\™ÈÜˆÍ›ÜˆY]ÜšX[\XÛ\È[™›Ú™XİØ\ÙHİYY\ËˆX\™Ú[ˆ
Ü™[JKÜšYˆL‹XÛÛ[[ˆÚ]
K\™[JHİ]\œË‚‹H
Š•X›]
ÍHLŒÜ
NŠŠˆXÛÛ[[ˆ^[İ]Ú]İ]\œÈ[™Ìœİ]\ˆY[™Ë‚‹H
Š“[Øš[H
Í
NŠŠˆXÛÛ[[ˆ^[İ]Ú]Mœİ]\œÈ[™ŒX\™Ú[œËˆİXÚÜÈØ\™È[™Z\™YY]Y]H›İÜÈ™\XØ[K‚‚ˆÈÈÈš]Hš[˜Ú\\Â‹H[\›˜[Ø\™Y[™È\ÈÛÛœÚ\İ[H
ÜXÙK[Y
HÛˆ\ÚİÜ™YXÚ[™ÈÈMœÛˆ[Øš[K‚‹HÙXİ[Û‹]Ë\ÙXİ[Ûˆœ™XZÜÈ\ÙHÜXÙK^

HÈÜ™X]Hœ™X][™È›ÛÛH™]ÙY[ˆ\ØÜ™]H›Ú™Xİ›ÙY\È[™Ø\™Y\ˆ\ØÚË‚‹HYÚZXÜ›Ë\ÜXÚ[™ÜÈ
È
H\™H™\Ù\™Y›ÜˆX™[]ËZ[œ]Z\š[™ÜÈ[™YÈ[Ë‚‚ˆÈÈ[]˜][Ûˆ	ˆ\‚•\È\ÚYÛˆŞ\İ[H\ÛZ\ÜÙ\ÈX]H›ÜÚYİÜË›\œ™Y[XšY[ÛİÜË[™ÚÙ][Û[ÜœXÈYÚY™™XİÈ[ˆ˜]›ÜˆÙˆ›][˜\ˆ[™\È[™Z\›[™HÙYÛY[][Û‹‚‚ˆÈÈÈ[˜\ˆ\˜Ú]Xİ\™B‹H
Š“^Y\ˆ
Ø[˜\ÊNŠŠˆÛ™HÑQQXˆH›İ[™][ÛˆÙˆ[š[X\HYÙ\Ë‚‹H
Š“^Y\ˆH
Ø\™ÈÛÛZ[™\ŠNŠŠˆÛ™HÑ‘‘‘‘‘˜ˆXÙYİ™\ˆ^Y\ˆ[[™X]YÛÛ[HHH\ÛÛY›Ü™\ˆÙˆÑMQMQMXˆ›È›ÜÚYİÈHY˜][‚‹H
Š’İ™\ˆÈ›Øİ\È˜[œÚ][ÛŠŠˆ[\˜Xİ]™HØ\™ÈXZ[Z[ˆZ\ˆ›]İXİ\™NÈÛˆİ™\‹H›Ü™\ˆÚYÈÜš\ÜHœ›ÛHÑMQMQMXÈÑÜˆÌLLLLLXÚ]HZXÜ›Ë[Ù™œÙ]
K™Ë‹˜[œÛ]VJL\
X
K‚‹H
Š“İ™\›^\ÈÈY[\ÎŠŠˆİXHÛÛ^X[Üİ™\œÈ[™ÛÛ[X[™[]\È\ÙHÑ‘‘‘‘‘˜[˜ÛÜÙYHH\ÑMQMQMX›Ü™\ˆXØÛÛ\[šYYH[ˆ[˜K\İXKÚ\œ[XšY[›ÜÚYİÈ
Lœ™Ø˜JŒ
X
Kˆ™]™\ˆ\ÙH›\œ™YÛ\ÜÈÜˆ˜XÚÙ›ÜYÛÛÜˆÛYX\œË‚‚ˆÈÈÚ\\Â‚•H\ÚYÛˆŞ\İ[H[\Ş\ÈH™\İ˜Z[™YÙ[ÛY]šXÈÚ[İY]HÚ][ˆXœÛÛ]HX^[][H˜Y]\ÈØ\ÙˆLœ
Í\™[X
K]›ÚY[™È^Ù\ÜÚ]™H›İ[™[™ÈÜˆÚ\˜İ[\ˆØ\İ[\È›ÜˆİXİ\˜[ÛÛZ[™\œË‚‚ˆÈÈÈÚ\HÙ[ÛY]HY\œÂ‹H
Š”İXİ\˜[ÛÛZ[™\œÈ	ˆØ\™ÎŠŠˆ›İ[™Y]ÈLœ
›İ[™Y[ØÈ›İ[™Y^
K‚‹H
Š’[\˜Xİ]™HÛÛ›ÛÈ
[œ]Ë]ÛœÊNŠŠˆ›İ[™Y]œ
›İ[™Y
K‚‹H
Š˜YÙ\È	ˆXÚ›ÛÙŞHÚ\ÎŠŠˆİXHÛÜ›™\ˆ˜Y]\È
›İ[™Y\ÛX
K[™›Ü˜Ú[™ÈHXÚšXØ[[™Ú[™Y\™Y›Ü›H˜XİÜˆ˜]\ˆ[ˆ^Y[X˜›H[Ë‚‹H
Š‘]šY\œÈ	ˆİ›ÚÙ\ÎŠŠˆ\™XİÜˆ[™\ÈÚ]Ú\œ[™Ë‚‚ˆÈÈÛÛ\Û™[Â‚ˆÈÈÈ]ÛœÂ‹H
Š”š[X\NŠŠˆÛÛYÍ‘MXš[Ú]\™HÑ‘‘‘‘‘˜\ÙÜ˜\H
[\ˆLÜÙZYÚL
KˆZYÚÍœÜš^›Û[Y[™ÈM˜Y]\Èœˆİ™\ˆ˜XÚÙÜ›İ[™˜[œÚ][ÛœÈÈÍÌÎĞXˆXİ]™NˆÌÍÌÌLØ‚‹H
Š”ÙXÛÛ™\HÈÚÜİŠŠˆÑ‘‘‘‘‘˜š[Ú]\›Ü™\ˆÑMQMQMX[™ÌLLLLLX^ˆİ™\ˆ›Ü™\ˆÛÛÜœÈÈÌLLLLLXÜˆİXH˜XÚÙÜ›İ[™[ÑQQ‚‹H
Š“Z[š[X[^ŠŠˆÍÌ^Ú]İ]İ][™Kˆİ™\ˆÌLLLLLX‚‚ˆÈÈÈ˜YÙ\È	ˆXÚšXØ[Ú\Â‹H
Š”İXÚÈÈXÚYÜÎŠŠˆ[Û›ÜÜXÙH
™]œ˜Z[œÈ[Û›ØL\
K\\˜Ø\ÙHÜˆİ[™\™Ø\Ú[™ËÍÌ^Ñ‘‘‘‘‘˜˜XÚÙÜ›İ[™[˜Ø\ÙY[ˆH\ÑMQMQMX›Ü™\‹ˆ˜Y]\È‚‹H
ŠXØÙ[[™XØ]ÜŠŠˆHœÛÛYÚ\˜İ[\ˆ\[ˆÍ‘MXZ\™YÚ]Y]Y]H^È[›İHXİ]™H\Ş[Y[ÈÜˆ]™HŞ\İ[\Ë‚‚ˆÈÈÈØ\™È	ˆØ\ÙHİYHX\Ù\œÂ‹H
Š˜\ÙHİ[NŠŠˆÑ‘‘‘‘‘˜˜XÚÙÜ›İ[™\ÛÛYÑMQMQMX›Ü™\‹ÜˆLœ›Ü™\‹\˜Y]\Ë[\›˜[Y[™Ë‚‹H
Š’[\˜Xİ[ÛŠŠˆİ™\ˆİ]HšYÙÙ\œÈH\›Ü™\ˆÚYÈÌLLLLLXÚ]HÛX[ˆML\È˜[œÚ][Û‹ˆ›ÈØØ[[™È\™Ù\ˆ[ˆ\™\XØ[˜[œÛ][Û‹‚‚ˆÈÈÈ[œ]šY[Â‹H
Š˜\ÙHİ[NŠŠˆÑ‘‘‘‘‘˜˜XÚÙÜ›İ[™\ÑMQMQMX›Ü™\‹˜Y]\Ë[\ˆM^[ˆÌLLLLLXÚ]XÙZÛ\ˆ[ˆÎPĞLĞQ˜‚‹H
Š‘›Øİ\ÎŠŠˆ\›Ü™\ˆÍ‘MXÚ][ˆXØÛÛ\[Z[™ÈÜš\Ü\š[™È
›Ş\ÚYİÎˆ\Í‘MX
Kˆ›ÈY™\ÙHÛİË‚‚ˆÈÈÈÙ[Xİ[ÛˆÛÛ›ÛÈ
ÚXÚØ›Ş\È	ˆ˜Y[ÜÊB‹H
Š‘Ù[ÛY]NŠŠˆMœÜ]X\™H
ÚXÚØ›ŞÜ˜Y]\ÊHÜˆMœÚ\˜ÛH
˜Y[ÊK‚‹H
Š•[˜ÚXÚÙYŠŠˆÑ‘‘‘‘‘˜İ\™˜XÙHÚ]\Ñ›Ü™\‹‚‹H
ŠÚXÚÙYŠŠˆÛÛYÌLLLLLXÜˆÍ‘MXš[Ú]HÜš\ÜÚ]HXÚËÙİ‚‚ˆÈÈÈÛÙH›ØÚÜÈ	ˆ\›Z[˜[Ú[™İÜÂ‹H
Š‘œ˜[YNŠŠˆÑ‘‘‘‘‘˜˜XÚÙÜ›İ[™ÜˆİXHÑQQ™XÙ\ÜËœ˜[YYHH\ÑMQMQMX›İ[™\Kˆ‹H
Š•\ÙÜ˜\NŠŠˆ™]œ˜Z[œÈ[Û›ØLÜÚ]Kˆ[™HZYÚˆ[™H[X™\œÈ[ˆÎPĞLĞQ˜Ş[^YÚYÚ[™ÈİšXİHZ[š[X[
Ü˜^\ØØ[H˜\ÙHÚ]Ù[Xİ]™HÍ‘MXÚÙ[œÊK