# mychef - Setup e istruzioni di sviluppo

Breve guida per clonare, configurare e avviare il progetto (frontend React + backend Spring Boot + MySQL).

## Requisiti
- Node.js 18+ (consigliato)
- pnpm (opzionale ma consigliato) o npm
- Java JDK 17+ (o versione richiesta dal `pom.xml`)
- Maven (incluso tramite `./mvnw`)
- MySQL server (con permessi per creare database)

## Clone
```bash
git clone <repository-url>
cd templateProgetto
```

## Struttura del progetto
- `backend/` — applicazione Spring Boot
  - `src/main/java/...` — controller, entity, repository
  - `src/main/resources/application.properties` — configurazioni
  - `src/main/resources/data.sql` — script SQL per creare e popolare le tabelle
- `frontend/` — applicazione React + Vite
  - `src/` — componenti, hook, pagine, stili
  - `package.json`, `pnpm-lock.yaml` — dipendenze

File rilevanti:
- `backend/src/main/resources/application.properties` ([link](backend/src/main/resources/application.properties#L1-L50))
- `backend/src/main/resources/data.sql` ([link](backend/src/main/resources/data.sql#L1-L200))
- `frontend/package.json` ([link](frontend/package.json))

## Installazione frontend
1. Entra nella cartella frontend:
```bash
cd frontend
```
2. Installa dipendenze:
```bash
pnpm install
# oppure: npm install
```
3. (Opzionale) Configura variabili ambiente, per esempio `VITE_BACKEND_URL` se il backend non è su `http://localhost:8080`.

## Installazione backend
Il backend usa Maven wrapper (`./mvnw`). Le dipendenze sono definite in `pom.xml`.
1. Controlla e configura `application.properties` (credenziali DB, porta ecc.).
2. Per avviare localmente si usa il wrapper Maven (vedi sotto).

## Creazione del database e popolamento
Il progetto include `data.sql` che crea e popola le tabelle.

Esegui manualmente (esempio con utente `root`):
```bash
# crea il database (se non esiste)
mysql -u root -p -e "CREATE DATABASE mychef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# importa lo script di popolamento
mysql -u root -p mychef < backend/src/main/resources/data.sql
```

Oppure lascia che Spring Boot importi automaticamente `data.sql` all'avvio se in `application.properties` è impostato `spring.sql.init.mode=always`.

Se hai errori di DDL o duplicate key durante l'inizializzazione, ricrea il DB vuoto prima dell'avvio:
```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS mychef; CREATE DATABASE mychef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

## Avviare l'applicazione

### Backend
```bash
cd backend
./mvnw spring-boot:run
# il server di default ascolta su http://localhost:8080
```

### Frontend
In un altro terminale:
```bash
cd frontend
pnpm dev
# apre Vite su http://localhost:5173
```

Verifica che il backend risponda:
```bash
curl http://localhost:8080/recipes
```

## Verifiche funzionali
- Endpoint principale: `GET /recipes` deve restituire elenco delle ricette con `ingredients`.
- Frontend: apri `http://localhost:5173` e prova la ricerca ingredienti.

## Problemi comuni
- Errore DDL / foreign key: ricrea il DB vuoto come sopra.
- Duplicate key in `data.sql`: assicurati il DB sia vuoto prima dell'import.
- Frontend non trova backend: verifica `VITE_BACKEND_URL`, CORS e che il backend sia attivo.

## Consigli per sviluppo
- Usa `pnpm` per performance e coerenza.
- Per evitare che `data.sql` reinserisca dati in modo imprevisto, puoi impostare `spring.sql.init.mode=never` in `application.properties` e importare manualmente lo script quando serve.

## Comandi rapidi
- Install frontend: `pnpm install`
- Start frontend: `pnpm dev`
- Start backend: `./mvnw spring-boot:run`
- Recreate DB: `mysql -u root -p -e "DROP DATABASE IF EXISTS mychef; CREATE DATABASE mychef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`

---
Se vuoi, posso aggiungere un file `.env.example` e uno script `scripts/init-db.sh` per automatizzare la creazione del DB.
