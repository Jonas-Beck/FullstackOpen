:::mermaid
sequenceDiagram
participant browser
participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_SPA
    activate server
    note right of browser: Updates DOM with new note and creates POST Request with new note as json data
    server-->>browser: Returns Status Code 201 Created
    deactivate server

:::mermaid
