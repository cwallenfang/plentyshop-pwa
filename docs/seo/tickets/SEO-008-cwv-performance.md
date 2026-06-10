# SEO-008 Core Web Vitals Performance Hardening

## Ziel
LCP < 2.5s, CLS < 0.1 fuer zentrale Templates (Homepage, Kategorie, PDP).

## Scope
In:
- LCP-Elemente priorisieren
- Lazy-Loading/Preload/Script-Budget optimieren

Out:
- Grundsaetzliche Redesigns

## Technische Aufgaben
- `apps/web/app/components/ui/ProductCard/ProductCard.vue`
- `apps/web/app/components/Gallery/Gallery.vue`
- `apps/web/nuxt.config.ts`
  - LCP-Bilder, Critical Path JS, Hydration-Strategie optimieren.

## Akzeptanzkriterien
- Lighthouse und CrUX-Ziele je Template erreicht oder klarer Gap dokumentiert.

## Tests
- Lighthouse CI mobile + desktop.
- Real User Monitoring falls verfuegbar.

## Aufwand
M

## Abhaengigkeiten
- Hosting/CDN Caching Setup.
