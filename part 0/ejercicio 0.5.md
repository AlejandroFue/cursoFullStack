```mermaid
sequenceDiagram
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/spa
Server->>Browser: HTML-Code
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Server->>Browser: main.css
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
Server->>Browser: main.js
Note over Browser: El navegador ejecuta el codigo js y solicita el JSON al servidor
Browser->>Server: HHTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Server->>Browser: data.json
Note over Browser: El navegador lista las notas