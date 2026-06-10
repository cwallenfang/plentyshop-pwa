# SEO-007 OOS Redirect- und Statuscode-Matrix

## Ziel
Klare technische Umsetzung fuer kurzfristig OOS (200) und dauerhaft OOS (301/410/404).

## Scope
In:
- Entscheidungslogik dokumentieren
- technische Schnittstellen fuer Redirect-Engine definieren

Out:
- Vollstaendige Implementierung im Backend/Edge (separat)

## Technische Aufgaben
- Konzept in `apps/web/server` + Plattform-Abstimmung.
- Regeln fuer Nachfolger, Kategorie-Redirect, 410 fallback 404.

## Akzeptanzkriterien
- Eindeutige Decision-Table verabschiedet.
- Implementierungsort (Nuxt server vs. edge vs. Plenty) festgelegt.

## Tests
- Testfaelle fuer alle Matrix-Zweige.

## Aufwand
M (Konzept) / L (Umsetzung plattformabhaengig)

## Abhaengigkeiten
- Plenty/Infra/SEO-Freigabe.
