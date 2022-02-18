# Terv (v0.1)

## Alapötlet
Asztalfoglalást lehetővé tevő alkalmazás éttermek, kocsmák és egyéb vendéglátóipari egységek számára.

## Technológiák
 - backend Laravel
 - RESTful API
 - üzenet adatformátuma json
 - adatbázis? SQLite?

## User groupok
 - admin
 - egység tulajdonos
 - egység kezelő (tulajdonos adhatja hozzá, veheti el a jogosultságot)
 - vendég

## Feature-ök
 - grafikus alaprajz készítő
 - grafikus foglaló felület
 - napra-órára-asztalra lebontva foglalás kezelés

### Alaprajz rajzoló
 - valószínűleg a megjelenítővel azonos modul
 - csak étteremtulajnak elérhető
 - mondjuk 1x1m-es négyzetrácson körülbelüli alaprajz rajzolása
 - négyszög, esetleg kerek asztalok megrajzolása
 - asztal adatok felvitele
  - asztal elnevezése
  - helyek száma
 - asztal letevése gomb
 - szék letevése
 - pad letevése
 - felirat elhelyezése
 - ajtó elhelyezés
 - egyedi alakzatok rajzolása (vertex alapon)
 - minimalista kinézetű
 - tulaj is foglalhatja az asztalokat
 - tulaj kezeli a foglalásokat (CRUD)

## Entitások
 - user
 - unit (vendéglátóipari egység)
 - alaprajz
   - helyiségek csak továbbfejlesztési lehetőség
   - asztalok
   - székek
   - egyéb alakzatok (pult, oszlop, térelválasztó, stb.)
 - foglalások
