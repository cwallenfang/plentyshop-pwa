# SEO-001 Kategorie Canonical und hreflang korrigieren

## Ziel
Kategorieseiten liefern serverseitig korrekte Canonical- und hreflang-Tags ohne Query-Parameter-Fehler.

## Scope
In:
- Canonical-Ermittlung in Kategoriefluss
- hreflang-Erzeugung aus realen Sprach-URLs
- x-default korrekt setzen

Out:
- Produkt-hreflang-Strategie (eigener Flow)

## Technische Aufgaben
- `apps/web/app/pages/[...slug].vue`
  - Canonical erst nach `fetchProducts` aus geladenen Daten lesen.
- `apps/web/app/composables/useUrlPageMeta/useUrlPageMeta.ts`
  - Fallback-Canonical ohne nicht-indexierbare Query-Parameter.
  - hreflang-Links aus `productsCatalog.languageUrls` statt nur `route.fullPath`.

## Akzeptanzkriterien
- Kategorie ohne Filter: self-referencing canonical.
- Kategorie mit Sort/Filter: canonical auf SEO-Haupt-URL.
- hreflang-Set enthaelt aktuelle URL, alle aktiven Sprachen und x-default.
- Tags sind im SSR-Head sichtbar.

## Tests
- SSR-HTML Snapshot fuer 3 Kategorie-URL-Typen.
- E2E Pruefung der Head-Tags.

## Aufwand
M

## Abhaengigkeiten
- API liefert konsistente `languageUrls` / Canonical-Daten.
