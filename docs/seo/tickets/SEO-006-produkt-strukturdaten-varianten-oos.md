# SEO-006 Produkt-Strukturdaten fuer Varianten und OOS

## Ziel
Product/Offer/AggregateRating sind valide und decken Varianten- und Verfuegbarkeitsfaelle sauber ab.

## Scope
In:
- JSON-LD Feinschliff fuer Varianten/OOS
- availability und Canonical-Strategie synchronisieren

Out:
- Externe Bewertungsprovider

## Technische Aufgaben
- `apps/web/app/composables/useStructuredData/useStructuredData.ts`
  - Variantenbezug (`hasVariant`/`isVariantOf`) wo Daten vorhanden.
  - OOS-Verfuegbarkeit konsistent setzen.

## Akzeptanzkriterien
- Rich Results Test ohne kritische Fehler fuer PDP.
- OOS zeigt korrekte availability.

## Tests
- Unit-Tests fuer JSON-LD Payload.
- Manuelle Validierung in Google Rich Results.

## Aufwand
M

## Abhaengigkeiten
- Varianten-/Stockdaten aus Plenty.
