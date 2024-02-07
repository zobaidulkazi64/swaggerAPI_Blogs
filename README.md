project:
  name: Express-YAML-Project
  version: 1.0.0
  description: >
    A simple Express server setup with YAML configuration and Swagger UI integration.
  author: Zobaidul Kazi
  license: MIT

dependencies:
  - name: express
    version: ^4.17.1
  - name: yamljs
    version: ^0.4.3
  - name: swagger-ui-express
    version: ^4.1.6

dev_dependencies:
  ### npm packages
       
        npm i express yamljs swagger-ui-express dotenv

scripts:
  start: node index.js
  

config:
  port: 8000
