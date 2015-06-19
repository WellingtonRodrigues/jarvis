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

/src - todo o código do aplicativo
	/app
		/modules
		/templates
	/assets
		/css
		/img
		/js
		/vendor

## Módulos

- Logger: registra e consulta eventos do sistema.

- Question: banco de questões.

- Test: testes propriamente ditos, montado usando questões do banco de questões.

- Test Result: a resposta de um questionário.

- User: autenticação, autorização, cargos e competências.

- App: inicia a aplicação e faz o "glue" entre os módulos.
