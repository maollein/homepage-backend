# Backend for my personal homepage
Personal homepage for actual use and for practicing web
development.

Server is written in *TypeScript* using *Node* with *Express*.
Database is *PostgreSQL*. Server offers a *REST API* to 
be consumed by a client.

## Installing database
To create empty instance of the needed database (for Windows 10):

- Install PostgreSQL
- Add the folder containing psql.exe to Path
- Log in to Postgres with **psql -U postgres**
- Create user maollein **CREATE USER maollein WITH ENCRYPTED PASSWORD your-password-here;**
  - db.dmp expects maollein. Other username can be used but I can't be bothered to look up
    the commands that are needed.
- In the regular command line (not psql) run 
  **psql -U maollein -d your-db-name-here < path-to-bd-folder/db.dmp**

## Dumping database
When changes to the database are made, they must be propagated to the 
db/db.dmp file. To do this run 
**pg_dump -U maollein -s your-db-name-here > path-to-db-folder-here/db.dmp**

If you want to create a backup of your database, run
*pg_dump -U maollein -d devdb > your-dump-file-path*. 
**This must not be used to overwrite db/db.dmp**, because there we want 
only the database schema.

## Initializing database for use
Create the user:

- Hash a password using bcrypt
- start psql and run 
  **INSERT INTO user_acount (username, name, password) VALUES (your-username, your-name, your-hashed-pasword);**

Create login_counter row for that user:

- **INSERT INTO login_counter (user_id) VALUES (id-of-the-user-you-created);**

## Setting environment variables
Create a **.env** file to the project root with the following values:

```
PORT=3001 (if another port is used, this must be taken into account at least in the frontend webpack devserver config)
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<database>
JWT_SECRET=secret-for-jsonwebtoken
COOKIE_SECRET=secret-for-cookie-signing
FAKE_PASSWORD_HASH=bcrypt-hash
```