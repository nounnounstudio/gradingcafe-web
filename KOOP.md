# Koop-Grundlage im Grading Café (Stand v2.4)

Das Spiel ist so gebaut, dass später **Online-Koop für 2–4 Spieler** ergänzt werden kann,
ohne das Spiel neu zu schreiben. Ein Server ist noch **nicht** angeschlossen – im Solo-Spiel
verhält sich alles wie vorher.

## Was schon drin ist

| Baustein | Wo im Code (`spiel/index.html`) | Wozu |
|---|---|---|
| Spielerliste `PLAYERS`, `LOCAL_ID`, `P` austauschbar | bei `let P = {...}` | Jeder Spieler hat Position, Blickrichtung und eigene Hände (`held`) |
| Aktions-Zentrale `act(type, data)` | Abschnitt „KOOP-GRUNDLAGE“ | Benutzen (`use`) und Ablegen (`drop`) laufen nicht mehr direkt, sondern über `act()` |
| `runAction` + `withPlayer` | ebenda | Führt eine Aktion **für einen bestimmten Spieler** aus (der Code nutzt intern weiter `P`) |
| Feste IDs | `it.id` für alle Interaktionen, `deco:…` für Deko, `c.uid` für Gäste | Host und Clients reden über dieselben Dinge |
| Fenster merken ihren Spieler | `ovActor` bei `openOv` | Klicks in Kasse, Regal, Börse usw. wirken für den Spieler, der das Fenster geöffnet hat |
| `Coop`-Modul | ebenda | Rollen `solo`/`host`/`client`, Spieler beitreten/verlassen, Zustand senden/übernehmen, Avatare der Mitspieler zeichnen |
| Host-Autorität | Hauptschleife | Im Koop simuliert nur der Host Zeit, Gäste, Kurier usw.; Clients bekommen 5× pro Sekunde den Zustand |

Getestet: Ein zweiter Spieler nimmt Booster aus dem Regal und legt sie zurück, ohne den
ersten Spieler zu beeinflussen; Host und Client in zwei Browserfenstern sehen sich gegenseitig,
Uhrzeit und Gäste laufen synchron.

## Nachrichten (JSON)

- `hello {pid, name}` – Client tritt bei
- `move {pid, x, z, yaw, pitch}` – Client-Position (jedes Bild)
- `act {pid, type, data}` – Client-Aktion, z. B. `{type:'use', data:{tid:'i3'}}`
- `snap {snap}` – Host-Zustand (Spielstand `S`, Spieler, sichtbare Gäste)

## Was für echten Online-Koop noch fehlt

1. **Server / Verbindung:** Ein kleiner WebSocket-Relay (z. B. Cloudflare Durable Objects,
   Supabase Realtime oder ein eigener Node-Server) mit Raum-Codes („Café beitreten: ABC123“).
   Anschluss im Spiel: `Coop.attach(adapter, 'host' | 'client')` – der Adapter braucht nur
   `send(obj)` und ruft `onmessage(obj)` auf.
2. **Fenster beim Client:** Fenster (Kasse, Regal, Börse …) werden heute auf dem Gerät des
   Hosts geöffnet. Für Koop öffnet der Client sie lokal und jeder Knopf schickt eine eigene
   Aktion (`act('shelfTake', {set, n})` usw.). Das geht Fenster für Fenster.
3. **Hände der Mitspieler:** `Coop.heldChanged()` zeigt noch nicht an, was ein Mitspieler trägt.
4. **Lobby-Menü:** „Café hosten“ / „Café beitreten“ im Hauptmenü.
5. **Spielstand:** Der Host speichert; Clients spielen im Café des Hosts mit.
