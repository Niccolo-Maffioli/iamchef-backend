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
Il progetto include `data.sql` che crea e popola le tabelle. Nota importante sul comportamento:

- Se esegui `data.sql` manualmente con il client MySQL, lo script può creare il database e selezionarlo (se contiene `CREATE DATABASE` e `USE`). In questa repository `backend/src/main/resources/data.sql` è stato aggiornato per creare e selezionare il database `iamchef` quando viene eseguito manualmente.

- Se ti affidi a Spring Boot (`spring.sql.init.mode=always`), Spring esegue il contenuto di `data.sql` usando la connessione definita in `spring.datasource.url`. In questo caso il database indicato nella URL deve esistere già: Spring non può creare il database perché non riuscirebbe ad aprire la DataSource.

Come procedere (opzioni):

1) Eseguire tutto manualmente (consigliato per sviluppo locale quando vuoi che lo script crei il DB):

```bash
# crea il database (se non esiste) e importa lo script che popola tabelle/dati
mysql -u root -p < backend/src/main/resources/data.sql
```

oppure (se preferisci specificare il DB):

```bash
mysql -u root -p iamchef < backend/src/main/resources/data.sql
```

2) Usare Spring Boot per importare SOLO tabelle/dati (database deve esistere):

```bash
# crea il database (una tantum) prima di avviare l'app
mysql -u root -p -e "CREATE DATABASE iamchef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# poi avvia Spring Boot; Spring importerà data.sql sulla connessione configurata
./mvnw spring-boot:run
```

3) Automatizzare (script helper): puoi aggiungere uno script `scripts/init-db.sh` che esegue la creazione del DB e importa `data.sql` in un solo comando (posso aggiungerlo io se vuoi).

Se vedi errori di DDL o chiavi duplicate, ricrea il DB vuoto prima dell'import:

```bash
mysql -u root -p -e "DROP DATABASE IF EXISTS iamchef; CREATE DATABASE iamchef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
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
- Recreate DB: `mysql -u root -p -e "DROP DATABASE IF EXISTS iamchef; CREATE DATABASE iamchef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`
