# Nicht rein im Frontend loesbar

## 1. Feed-Steuerung fuer Merchant Center und Preisvergleiche
Warum nicht rein im Frontend:
- Feed-Selektion (welcher Artikel in GMC/Idealo landet) wird i. d. R. im PIM/ERP/Feed-Export gesteuert.

Noetig:
- Plenty-/Feed-Regeln fuer "SEO-Unique-Artikel" vs. geklonte Marktplatzartikel.

## 2. Dauerhaft OOS: 301/410 Lebenszyklus-Automation
Warum nicht rein im Frontend:
- Redirect- und Statuscode-Entscheidungen brauchen zentrale URL-Lifecycle-Logik und Traffic-/Backlink-Signale.

Noetig:
- Backend/Edge-Regeln oder Plenty-seitiges URL-Management.

## 3. Hreflang nur auf wirklich existierende Ziel-URLs
Warum nicht rein im Frontend:
- Sicheres hreflang erfordert ein verifizierbares Mapping von existierenden Sprachversionen je URL.

Noetig:
- Verlaessliches Plenty-API Mapping pro Seite und Sprache.

## 4. Klon-/Variantenstrategie gegen Kannibalisierung
Warum nicht rein im Frontend:
- Technik kann Canonical/Robots setzen, aber inhaltliche Einzigartigkeit und Katalogstrategie liegen im Daten- und Content-Prozess.

Noetig:
- Produktdaten-Governance und SEO-Content-Prozess.

## 5. robots.txt Governance
Warum nicht rein im Frontend:
- robots.txt liegt oft an Hosting/CDN/Server-Ebene.

Noetig:
- Deployment-/Infra-Prozess fuer robots.txt je Umgebung.
