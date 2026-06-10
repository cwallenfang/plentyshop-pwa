# SEO-005 Filter- und Facetten-Indexsteuerung

## Ziel
Nicht-SEO-relevante Filterseiten werden konsistent auf Haupt-URL kanonisiert und optional noindex gesetzt.

## Scope
In:
- Regeln fuer Sortierung, irrelevante Facetten, Preis-Filter
- Canonical/Robots Regelwerk

Out:
- robots.txt Infrastruktur (separat)

## Technische Aufgaben
- `apps/web/app/composables/useUrlPageMeta/useUrlPageMeta.ts`
- `apps/web/app/composables/useStructuredData/useStructuredData.ts`
- `apps/web/app/composables/useCategoryFilter/useCategoryFilter.ts`
  - Query-Klassen definieren: indexierbar vs. nicht indexierbar.

## Akzeptanzkriterien
- Irrelevante Filter: canonical auf Hauptkategorie.
- Bei Regelverletzung: `meta robots=noindex,follow`.
- SEO-relevante Filterkombis optional freigebbar.

## Tests
- Matrix-Test fuer 10 URL-Typen (sort, facets, page, preis).

## Aufwand
M

## Abhaengigkeiten
- SEO-Regelwerk final abstimmen.
