# SEO-004 Dynamische Sitemap fuer Produkte und Kategorien

## Ziel
Sitemap enthaelt indexierbare Kategorie- und Produkt-URLs inklusive hreflang-Alternates.

## Scope
In:
- Erweiterung Sitemap-Generierung mit dynamischen Quellen
- lastmod und hreflang je URL

Out:
- News-/Image-Sitemaps

## Technische Aufgaben
- `apps/web/modules/sitemap/index.ts`
  - Dynamische URL-Quelle anbinden (Plenty/API).
- `apps/web/modules/sitemap/runtime/sitemap.xml.ts`
  - hreflang pro URL stabil ausgeben.
- Ausschlussregeln fuer noindex/privat/checkout beibehalten.

## Akzeptanzkriterien
- PDP/PLP URLs sind in Sitemap.
- hreflang Paare und x-default konsistent.
- Keine 404-URLs in Sitemap.

## Tests
- Sitemap Snapshot Test.
- URL-Stichprobe mit Statuscode 200.

## Aufwand
L

## Abhaengigkeiten
- API fuer URL-Listen und Sprach-Mapping.
