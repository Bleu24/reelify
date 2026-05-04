---
name: Kinetic Pulse
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e8bcbd'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#ae8789'
  outline-variant: '#5e3e40'
  surface-tint: '#ffb2b7'
  primary: '#ffb2b7'
  on-primary: '#67001b'
  primary-container: '#ff516a'
  on-primary-container: '#5b0017'
  inverse-primary: '#be0039'
  secondary: '#ecb2ff'
  on-secondary: '#520071'
  secondary-container: '#cf5cff'
  on-secondary-container: '#480063'
  tertiary: '#00ddd6'
  on-tertiary: '#003735'
  tertiary-container: '#00a29c'
  on-tertiary-container: '#00302e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdadb'
  primary-fixed-dim: '#ffb2b7'
  on-primary-fixed: '#40000d'
  on-primary-fixed-variant: '#92002a'
  secondary-fixed: '#f8d8ff'
  secondary-fixed-dim: '#ecb2ff'
  on-secondary-fixed: '#320047'
  on-secondary-fixed-variant: '#74009f'
  tertiary-fixed: '#29fcf3'
  tertiary-fixed-dim: '#00ddd6'
  on-tertiary-fixed: '#00201e'
  on-tertiary-fixed-variant: '#00504d'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Spline Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Spline Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Spline Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Spline Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin: 32px
---

## Brand & Style

This design system is engineered to capture the high-velocity energy of short-form video content while maintaining the rigorous precision of an automation powerhouse. The brand personality is aggressive yet controlled—evoking the feeling of a high-performance engine behind a sleek, neon-lit dashboard. 

The aesthetic is a hybrid of **Minimalism** and **Glassmorphism**. By stripping away unnecessary ornamentation and utilizing frosted-glass layers, the interface achieves a sense of depth and sophistication. This approach ensures that while the vibrant accents provide "pop," the core experience remains professional and focused on data clarity. The target audience—creators and marketers—should feel empowered, efficient, and plugged into the "viral" frequency.

## Colors

The palette is anchored by a **Deep Charcoal** (#121212) base, providing a high-contrast canvas that allows functional elements to recede or advance through tonal shifts. The primary driver is **Electric Pink** (#FF0050), used for high-intent actions and critical status indicators. **Electric Purple** (#BD00FF) serves as a secondary accent to create gradients and visual interest in data visualizations. 

For additional utility, a **Cyber Cyan** (#00F2EA) is introduced to represent growth and success metrics, completing the neon-inspired spectrum. Surfaces are built using tiered shades of charcoal to define hierarchy without relying on heavy borders. White is reserved for high-readiness typography and icons to ensure maximum legibility against the dark void.

## Typography

This design system utilizes a dual-font strategy to balance personality with utility. **Spline Sans** is used for headlines and hero statements; its wide, geometric aperture provides a fresh, tech-forward energy that feels native to the entertainment industry.

For all functional data, dashboard labels, and long-form body text, **Inter** provides the necessary neutrality and clarity. Given the data-heavy nature of automation metrics, Inter’s high x-height ensures readability at small sizes. All labels use slightly increased letter-spacing to prevent "crowding" in tight UI layouts.

## Layout & Spacing

The layout model is a **12-column fluid grid** designed for density and scalability. In dashboard views, sidebars occupy a fixed width of 260px, while the main content area expands to fill the viewport. 

Spacing follows a strict 8px rhythmic scale. For complex data tables and analytics cards, use "sm" (12px) internal padding to maintain high information density. For marketing pages or landing screens, "md" (24px) and "lg" (48px) spacing should be used to provide visual breathing room. Grid gutters are fixed at 24px to ensure distinct separation between data widgets.

## Elevation & Depth

Visual hierarchy in this design system is achieved through **Glassmorphism** and **Tonal Layering**. Unlike traditional light-themed apps that use heavy shadows, this system uses "Backdrop Blurs" (16px to 24px) and thin, high-frequency outlines.

1.  **Level 0 (Background):** Deep Charcoal (#121212).
2.  **Level 1 (Cards/Widgets):** Semi-transparent charcoal with a 1px solid border (White @ 8% opacity).
3.  **Level 2 (Modals/Popovers):** Glassmorphic surfaces with a 40% blur and a subtle inner glow on the top edge to simulate a light source.
4.  **Level 3 (Floating Actions):** Use vibrant gradients (Pink to Purple) with a soft, tinted glow (20px blur, 15% opacity of the primary color) to indicate interactivity.

## Shapes

The shape language is consistently **Rounded**, using a base radius of 0.5rem (8px). This creates a modern, friendly feel that softens the "technical" nature of automation. 

- **Standard Elements:** 0.5rem (Buttons, Inputs, Small Cards).
- **Large Containers:** 1rem (Main Dashboard Cards, Section Wrappers).
- **System Overlays:** 1.5rem (Modals, Large Feature Banners).

Avoid sharp corners entirely to maintain the sleek, modern aesthetic. Interactive elements like checkboxes should maintain a slightly softer radius (4px) to remain distinct from circular radio buttons.

## Components

### Buttons
Primary buttons use a vibrant linear gradient from **Electric Pink** to **Electric Purple**. Secondary buttons use a "Ghost" style with a 1px white border at 20% opacity. All buttons have a hover state that increases the brightness of the background or border.

### Cards
Cards are the primary container for analytics. They must feature a subtle glass effect with `backdrop-filter: blur(12px)`. Headlines inside cards should be **Headline-sm** using **Spline Sans** for a punchy, editorial look.

### Input Fields
Inputs are dark-filled with a subtle bottom-border highlight in **Electric Pink** only when focused. Error states use a high-saturation red, while success states use **Cyber Cyan**.

### Data Visualization
Charts should utilize the accent palette (Pink, Purple, Cyan) against the charcoal background. Use "Glow Lines" (lines with a soft drop shadow in the same color) to represent trends, mimicking the neon aesthetic of the brand.

### Chips & Badges
Small status indicators should use a low-opacity fill of the status color (e.g., Pink @ 15%) with a high-saturation label of the same color to ensure readability without being visually overwhelming.