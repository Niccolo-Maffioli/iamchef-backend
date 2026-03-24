# Backend — MyChef (iamchef-backend)

Questa documentazione copre come eseguire, inizializzare e debuggare la parte backend del progetto.

**Panoramica**
- Tecnologia: Spring Boot (Maven), JPA/Hibernate, MySQL
- Cartella principale: `backend/`
- Entry point: `com.niccolo.mychef.MychefApplication` (start con `./mvnw spring-boot:run`)

**Prerequisiti**
- Java (compatibile con la versione del progetto, es. Java 17+ / Java 21, verifica `pom.xml`)
- Maven (usare `./mvnw` incluso)
- MySQL in ascolto (es. localhost:3306)

**Configurazione principale**
- File: `backend/src/main/resources/application.properties`
- Valori rilevanti:
  - `spring.datasource.url=jdbc:mysql://localhost:3306/mychef` (modificare se necessario)
  - `spring.datasource.username` e `spring.datasource.password`
  - `spring.sql.init.mode=always` (usato per caricare `data.sql` in dev)

Esempio di avvio (da `backend/`):

```bash
# dalla root del progetto
cd backend
./mvnw clean package -DskipTests
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

Oppure solo in sviluppo rapido:

```bash
cd backend
./mvnw spring-boot:run
```

**Database e seed**
- File di seed: `backend/src/main/resources/data.sql`
- `data.sql` è stato reso idempotente (CREATE TABLE IF NOT EXISTS, INSERT ... ON DUPLICATE KEY UPDATE)
- Se riscontri errori di chiavi duplicate o dati incoerenti, puoi ricreare il DB locale o svuotare le tabelle:

```sql
-- Esempio da eseguire in MySQL
DROP DATABASE IF EXISTS mychef;
CREATE DATABASE mychef CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mychef;
-- poi riavvia l'app per far girare lo script data.sql
```

Nota: la proprietà `spring.sql.init.mode` controlla l'esecuzione dei file SQL di inizializzazione; impostala su `always` per forzare il caricamento in dev.

**Entità principali**
- `Recipe`:
  - `id` (Long)
  - `name` (String)
  - `description` (String)
  - `ingredients` (List<Ingredient>) — relazione OneToMany/ManyToMany a seconda dell'implementazione
- `Ingredient`:
  - `id` (Long)
  - `name` (String)
  - altri campi minori (se presenti: quantity, unit)

Controlla le classi in `backend/src/main/java/com/niccolo/mychef/entity/` per i dettagli.

**API (endpoints principali)**
- `GET /recipes` — restituisce lista di ricette (con ingredienti)
- `GET /recipes/{id}` — dettaglio di una ricetta
- `POST /recipes` — crea una nuova ricetta (payload JSON)
- `DELETE /recipes/{id}` — elimina una ricetta

Esempi curl:

```bash
# lista ricette
curl -sS http://localhost:8080/recipes | jq '.'

# dettaglio
curl -sS http://localhost:8080/recipes/101 | jq '.'

# creazione (esempio)
curl -X POST http://localhost:8080/recipes \
  -H "Content-Type: application/json" \
  -d '{"name":"Nuova","description":"..","ingredients":[{"name":"Sale"}] }'
```

**CORS / sviluppo locale**
- Attualmente il controller non espone `@CrossOrigin`; il frontend è stato configurato per usare il proxy Vite (`/recipes` → `http://localhost:8080`) in modo da evitare CORS in sviluppo.
- Se preferisci abilitare CORS direttamente nel backend per debug veloce, puoi riaggiungere `@CrossOrigin(origins = "http://localhost:5173")` nel controller `RecipeController`.

**Debug comuni e soluzioni**
- Duplicate primary key durante `data.sql`: ricreare DB o usare `ON DUPLICATE KEY UPDATE` come presente nel file di seed.
- Endpoint non raggiungibile dal browser: verificare che il backend ascolti su `:8080` e che il frontend usi la stessa origine o proxy.
- Porte duplicate Vite: se il frontend è servito su una porta diversa (es. 5175) assicurati che la proprietà Vite/Proxy punti correttamente al backend.

**Test e verifiche**
- Test unitari/integrati (se presenti) in `backend/src/test/java/` — esegui con Maven:

```bash
cd backend
./mvnw test
```

**Cosa ho documentato qui**
- Come avviare il backend
- Come inizializzare/seeding del DB
- Elenco degli endpoint principali e esempi
- Entità e file di interesse per esplorare il codice
- Note su CORS e proxy per sviluppo locale

**Prossimi passi suggeriti**
- Vuoi che committiamo e pushiamo questo file `backend/README.md` sul repository remoto? Posso farlo automaticamente se mi dai conferma.
- Posso anche generare una breve sezione di deploy/produzione (es. Dockerfile / configurazione cloud) se necessario.

---
Documento generato automaticamente dal tuo assistente; dimmi se vuoi aggiungere altro o tradurlo in inglese.
