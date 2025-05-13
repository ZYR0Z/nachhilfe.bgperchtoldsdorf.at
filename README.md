# Nachhilfe-Webseite
> [!NOTE]
> Die Seite ist vorläufig auf [https://nachhilfe.zyroz.dev](https://nachhilfe.zyroz.dev) erreichbar. Und wird der Einfachkeit halber auf Vercel gehostet. Wenn die Seite finalisiert ist, wird sie mit Docker lokal gehostet werden.

> [!NOTE]
> Manche Sachen die im `README` beschrieben sind funktionieren noch nicht oder wurden noch gar nicht implemntiert. _Es soll nur eine idealisierte Idee sein, welche nach und nach umgesetzt wird_

# Installation & Lokales Setup

Zuerst müssen alle Node-Module installiert werden. 

```bash
npm install
# oder
yarn install
# oder
pnpm install
# oder
bun install
```

Dann kann der lokale Server gestartet werden (Development-Mode). 

```bash
npm run dev
# oder
yarn dev
# oder
pnpm dev
# oder
bun dev
```
Der Server läuft dann auf [http://localhost:3000](http://localhost:3000).

# Infrastruktur / Design
- Alle GET-Requests werden unendlich lange gecacht (nur wenn sich der Inhalt ändert, wird neu geladen um keine unnötigen Datenbank-Abfragen zu machen).
- Zur _BUILD_-Zeit werden alle bereits vorhandenen Nachhilfe-Angebote gebaut und erst wenn ein neues Angebot erstellt wird, wird diese beim ersten Aufrufen "kompiliert".
- Sobald ein Angebot erstellt / bearbeitet wird, werden die passenden Seit gebaut und wieder gecacht (4ms Acess-Time statt 100ms)
- Authentifizierung wird über [Auth.js](https://authjs.dev/) durchgeführt (und Microsoft Entra-ID).
- Datenbank ist eine lokale PostgreSQL Instanz mit [Dirzzle ORM](https://orm.drizzle.team/) und [Zod](https://zod.dev/) für die Validierung.
- Alle Design / UI-Elemente sind von [Shadcn](https://ui.shadcn.com/) zusammengebastelt. 
- Als reverse Proxy wird [Nginx](https://www.nginx.com/) oder [Traefik](https://traefik.io/) verwendet.

## Seitenübersicht mit einer MAP:
> [!IMPORTANT] 
> Bild von Excalidraw einfügen

## Datenbank Schema 
Dies kann entweder in der Drizzle Datei: `db/schema.ts` oder mit dem lokalen Drizzle Studio (`npm run drizzle:studio`) angesehen werden.
Weitere nützliche Befehle sind:

```bash
# Migration erstellen
npm run drizzle:migrate
# Migration ausführen
npm run drizzle:push
# Migration zurücksetzen
npm run drizzle:rollback
```
## Deployment (Zero-Downtime mit Docker)
Wir nutzen Github Actions um automatisch bei jedem Push auf `master` die Seite neu zu bauen. Der Ablauf sieht wie folgt aus:

1. Github Action wird getriggert
2. SSH-Connection in den Server wird aufgebaut
3. Docker-Container wird neu gebaut (mit dem Cache)
4. Docker-Container wird gestartet und es wird gewartet, bis er healthy ist (siehe `docker/healthchecks.sh`)
5. Der Traffic wird auf den neuen Container umgeleitet
6. Der alte Container wird gestoppt und gelöscht

> [!CAUTION]
> Der PostgresSQL-Container wird nie gelöscht und auch nie neu gebaut und bleibt immer auf der festgelegten Version (`17.5-alpine` siehe `docker/docker-compose.yml`). Es muss manuell geupdated werden. 

Vielleicht sollte die Datenbank auch gebackuppt werden (am besten an einem anderen Ort), aber das ist noch nicht implementiert.
