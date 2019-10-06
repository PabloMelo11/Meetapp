# Meetup

=======

# Requisitos Funcionais

- O usuário deve poder se cadastrar com nome, e-mail e senha;
- O usuário deve poder realizar login utilizando e-mail e senha;
- O usuário deve poder editar seu perfil, alterando nome, senha;
- O usuário pode criar novos meetups, edita-los e remove-los na aplicacao web;
- O usuário deve poder visualizar detalhes do evento como foto de capa, título, descrição, número de inscritos e local de realização;
- O usuário pode se inscrever e cancelar um meetup que ainda nao ocorreu na aplicacao mobile;
- Quando um usuario se inscreve no meetup, chega um email para o usuario que e dono daquele meetup mostrando os dados do inscrito;
- Os e-mails devem ser enviados através de uma fila com Redis/Kue;

# Instalação

- git clone https://github.com/PabloMelo11/Meetapp.git
- rodar o comando yarn
- Criar um banco de dados vazio no postgres (nome: meetapp)
- Alterar as configurações de conexão com o banco de dados no arquivo .env localizado na raiz do projeto
- Rodar as migrations com o comando: yarn sequelize db:migrate
- O servidor vai subir no endereço http://192.168.0.106:3333. Isso pode ser alterado no arquivo .env localizado na raiz do projeto.

# Redis

- Baixar o container Redis
- Iniciar o container Redis
- Editar o arquivo config/redis.js. No objeto local, colocar dados de conexão
- No arquivo .env localizado na raiz do projeto, configurar o REDIS_HOST
- No arquivo .env, localizado na raiz do projeto, colocar as credenciais de email MAIL_HOST - MAIL_PORT - MAIL_USER - MAIL_PASS

# Mobile

- Para iniciar a aplicação mobile, antes rodar o comando 'react-native run-android' para o app ser instalado no dispositio. Logo após rodar o comando 'react-native start'.

OBS: Meetup mobile foi desenvolvido apenas no Android. No arquivo 'api' dentro de services da aplicação mobile, a url esta setado com o IP da maquina. No arquivo 'api' dentro de services na aplicação web, a url esta setado como 'localhost'.
