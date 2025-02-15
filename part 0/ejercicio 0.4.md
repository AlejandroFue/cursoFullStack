```mermaid
sequenceDiagram
Browser->>Server: HHTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
Server->>Browser: Status Code: 302
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/notes
Server->>Browser: HTML-Code
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server->>Browser: main.css
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
Server->>Browser: main.js
Note over Browser: El navegador ejecuta el codigo js y solicita el JSON al servidor
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server->>Browser: data.json
Note over Browser: El navegador vuelve a listar las notas