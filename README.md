# Projeto colaborativo para aplicação de avaliações objetivas.

## Requisitos

1. NodeJS/NPM
2. Git
3. MongoDB

## Documento de requisitos de segurança

https://docs.google.com/document/d/1IP1yQXQx0vLCqB0tyDUAtsIRGrQk6_yuZUCi42BvWs0/edit

## Style guide

Nomeclatura em inglês.

Para contribuir com a legibilidade do código, o projeto está se baseando no seguinte guia de estilos: https://github.com/felixge/node-style-guide.

## Estrutura de pastas

```
/src
	/app
		/modules
		/templates
	/assets
		/css
		/img
		/js
		/vendor
```

## Módulos

### App

Inicia a aplicação e faz o "glue" entre os módulos. ([README](https://github.com/sergioaugrod/jarvis/tree/master/src/app/modules/app))

### Logger

Registra e consulta eventos do sistema. ([README](https://github.com/sergioaugrod/jarvis/tree/master/src/app/modules/logger))

### Question

Banco de questões. ([README](https://github.com/sergioaugrod/jarvis/tree/master/src/app/modules/question))

### Test

Testes propriamente ditos, montado usando questões do banco de questões. Também é responsável por gerar, aplicar e exibir o resultado de testes. ([README](https://github.com/sergioaugrod/jarvis/tree/master/src/app/modules/test))

### User

Autenticação, autorização, cargos e competências. ([README](https://github.com/sergioaugrod/jarvis/tree/master/src/app/modules/user))

### Importer

Importa arquivos exportados pelo Moodle.
