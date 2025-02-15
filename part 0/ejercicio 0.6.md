```mermaid
sequenceDiagram
Browser->>Server: HHTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
Server->>Browser: Status Code: 201 Created
Note over Browser: El navegador utiliza el js para volver a renderizar la lista de notas