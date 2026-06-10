# SEO Backlog fuer etc-shop.de

## Kontext
Diese Ticketliste basiert auf dem Dokument "Technisches Pflichtenheft fuer etc-shop.de - SEO-Standards" und der technischen Analyse des aktuellen Projekts.

## Priorisierte Reihenfolge
1. SEO-001: Kategorie Canonical und hreflang korrigieren
2. SEO-002: Crawlbare Pagination mit echten Links
3. SEO-003: Breadcrumb JSON-LD aus echten Breadcrumb-Daten
4. SEO-004: Dynamische Sitemap fuer Kategorie- und Produkt-URLs
5. SEO-005: Filter-/Facetten-Indexsteuerung
6. SEO-006: Strukturierte Produktdaten fuer Varianten und OOS sauberstellen
7. SEO-007: OOS Redirect-/Statuscode-Matrix (301/410/404)
8. SEO-008: CWV Performance Hardening
9. SEO-009: SEO QA, Monitoring und Regression Checks

## Dateien
- `docs/seo/tickets/SEO-001-kategorie-canonical-hreflang.md`
- `docs/seo/tickets/SEO-002-pagination-crawlbare-links.md`
- `docs/seo/tickets/SEO-003-breadcrumb-jsonld.md`
- `docs/seo/tickets/SEO-004-dynamische-sitemap.md`
- `docs/seo/tickets/SEO-005-filter-indexsteuerung.md`
- `docs/seo/tickets/SEO-006-produkt-strukturdaten-varianten-oos.md`
- `docs/seo/tickets/SEO-007-oos-redirect-statuscodes.md`
- `docs/seo/tickets/SEO-008-cwv-performance.md`
- `docs/seo/tickets/SEO-009-seo-qa-monitoring.md`
- `docs/seo/nicht-im-frontend-loesbar.md`

## Aufwand (Grob)
- Sprint 1: SEO-001 bis SEO-003
- Sprint 2: SEO-004 bis SEO-006
- Sprint 3: SEO-007 bis SEO-009

## Definition of Done (global)
- Anforderungen aus Ticket-Akzeptanzkriterien sind erfuellt.
- SSR-HTML, Statuscodes, Canonicals, hreflang und strukturierte Daten wurden in Render-Tests geprueft.
- Keine SEO-Regression in vorhandenen Flows.
