# Transforming the Portfolio into a Cinematic Cosmic 3D Experience

This plan outlines the steps to evolve the existing portfolio into a single, immersive interstellar environment using Three.js, React Three Fiber, and Spline, fulfilling the request for a premium, cinematic cosmic aesthetic.

## User Review Required

> [!IMPORTANT]
> The current "Floating Orb" in the Experience section uses an `iframe` to embed a Spline scene. To make it a globally floating, reactive entity across the entire website, we need to extract it into a global layout component using `@splinetool/react-spline` and position it using fixed coordinates that update based on scroll and hover events. I will replace the iframe with a proper `<Spline>` component.

> [!WARNING]
> Converting the background to a global 3D cosmic scene (starfields, fog, nebula) requires a full-screen `<Canvas>` in the background with `pointer-events-none`. This will replace the current CSS-based radial gradients in individual sections to ensure the "one connected interstellar environment" feel.

## Proposed Changes

### Global Environment & Dependencies
We need to install some missing dependencies for advanced 3D effects and tracking:
- `react-intersection-observer` (for triggering animations when sections are in view)
- `react-use-measure` (for responsive 3D elements)
- `maath` (for math utilities in 3D, like smooth dampening)
- `simplex-noise` (for procedural cosmic fog/nebula generation)
- `three-stdlib` (if needed for postprocessing)

### Components

#### [NEW] `components/cosmic-background.tsx`
- A global React Three Fiber `<Canvas>` component that will render:
  - `Stars` (from drei) with animated rotation.
  - Custom particles for deep space dust.
  - Volumetric cosmic lighting (using point lights and ambient light).
  - Nebula gradients (using custom shaders or postprocessing).
- Placed in `app/page.tsx` behind all content, spanning the entire viewport (`fixed inset-0 z-0 pointer-events-none`).

#### [NEW] `components/global-orb.tsx`
- A globally positioned `<Spline>` component for the orb.
- Uses Framer Motion's `useScroll`, `useTransform`, and `useSpring` to track scroll position and cursor (`mousemove`).
- Interacts via Zustand store or React Context to know which "Experience" card is hovered/active, and lerps its position to orbit/crawl towards that card.
- Will replace the localized `FloatingOrb` currently inside `experience-section.tsx`.

#### [MODIFY] `app/page.tsx`
- Integrate `<CosmicBackground>` and `<GlobalOrb>` to establish the continuous interstellar environment.
- Remove the local CSS background gradients and boxed containers to allow the cosmic background to flow seamlessly.

#### [MODIFY] `components/business-impact-section.tsx`
- Replace `BusinessImpactSpline` with a new component rendering the **Glass Knot Vortex** Spline scene: `https://prod.spline.design/6alTqxrY3HyygLTzbLWOOqPc/scene.splinecode`.
- Position the KPI metrics to float dynamically around the vortex using 3D transforms or Framer Motion.

#### [MODIFY] `components/spline-scenes.tsx`
- Add `GlassKnotVortex` Spline component.
- Add `FloatingCommandTerminal` (Macbook Mockup) Spline component: `https://prod.spline.design/RADKgmvSa4peohIwHWa4sb8p/scene.splinecode`.
- Include auto-open animation, glowing screens, and holographic UI projections.

#### [MODIFY] `components/experience-section.tsx`
- Remove the `iframe` based orb.
- Setup event triggers (e.g., `onMouseEnter`, `onMouseLeave`, or Intersection Observers) on the experience cards to dispatch position updates to the `GlobalOrb`.

#### [MODIFY] `components/hero-section.tsx` & `components/skills-section.tsx`
- Update backgrounds to transparent to let the cosmic environment show through.
- Add hover physics and magnetic buttons to interactive elements using Framer Motion.

## Verification Plan

### Automated Tests
- Run `npm run build` and `npm run dev` to ensure no TypeScript or build errors are introduced.

### Manual Verification
- Verify the global cosmic background feels continuous and doesn't break on scroll.
- Test the global orb's reactivity to scroll and cursor, ensuring it transitions smoothly between sections.
- Verify the Glass Knot Vortex and Floating Command Terminal load correctly and maintain high performance.
- Test responsive layout on mobile (ensuring 3D elements scale appropriately or degrade gracefully).
