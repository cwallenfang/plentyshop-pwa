# SEO-003 Breadcrumb JSON-LD aus echten Daten

## Ziel
BreadcrumbList basiert auf echten Breadcrumb-Nodes statt Route-Split.

## Scope
In:
- JSON-LD Datengrundlage auf `breadcrumbs` Prop umstellen

Out:
- Visuelles Breadcrumb-Design

## Technische Aufgaben
- `apps/web/app/components/ui/Breadcrumbs/Breadcrumbs.vue`
  - `itemListElement` aus `breadcrumbs` generieren.
  - Korrekte Positionen und absolute URLs setzen.

## Akzeptanzkriterien
- Breadcrumb JSON-LD entspricht sichtbarer Breadcrumb.
- Keine Platzhalter-Pfade aus String-Split.

## Tests
- Unit-Test fuer 3 Ebenen Breadcrumb.
- Rich Results Test (manuell) fuer Kategorie/PDP.

## Aufwand
S

## Abhaengigkeiten
- Verfuegbare Breadcrumb-Props in Layout/Page.
