# User Module

Gerencia usuários, cargos, autenticação e autorização.

## Rotas

- `/users` Lista todos os usuários
- `/users/new` Adiciona um novo usuário através de um usuário logado
- `/users/auth` Autentica usuário
- `/users/register` Registra um novo usuário através de um usuário deslogado (esse usuário se torna um estudante como padrão)
- `/users/:userId/remove` Remove um usuário
- `/users/logout` Limpa a autenticação do usuário

## Models

- User
