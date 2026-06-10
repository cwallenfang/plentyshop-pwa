# SEO-002 Pagination crawlbare Links

## Ziel
Pagination auf Kategorie- und Suchseiten ist mit echten HTML-Links crawlbar.

## Scope
In:
- Umstellung von Button-Navigation auf `<a href>` / `NuxtLink`
- Prev/Next und Seitenlinks SSR-auslieferbar

Out:
- Ranking-Strategie fuer tiefe Seiten

## Technische Aufgaben
- `apps/web/app/components/ui/Pagination/Pagination.vue`
  - Klick-Buttons durch Links ersetzen.
  - URL mit `page` Query generieren.
- Optional: `rel="prev"`/`rel="next"` Konsistenz pruefen.

## Akzeptanzkriterien
- Seiten 1..N sind ohne JS ueber Links erreichbar.
- Crawler finden Seitenwechsel im HTML.
- Keine Accessibility-Regression.

## Tests
- SSR DOM Test auf `<a href*="page=2">`.
- Keyboard-Navigation/Screenreader Smoke Test.

## Aufwand
M

## Abhaengigkeiten
- Keine.
