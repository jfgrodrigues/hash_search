# Hash Search

## Resumo:

Serviço de busca de hashtags no Instagram, com possibilidade de salvar essas buscas, consultar e deletá-las posteriormente. Desenvolvido usando a stack MEAN (MongoDB, Express, AngularJS e NodeJS).

## Instalação e configuração

São pré-requisitos para instalar e rodar o serviço:

1. Ter o NodeJS (https://nodejs.org/en/) e o MongoDB (https://www.mongodb.com/download-center) instalados e rodando no host. 

2. Ter um client da API do Instagram (https://www.instagram.com/developer/clients/manage/) com o scope 'public_content' com status permitido. Sem esse requisito não será possível rodar corretamente o serviço, pois é necessário para a realização da autenticação para integrar com o  Instagram e realizar as buscas.

Com os pré-requisitos preenchidos, faça o clone dos arquivos fonte.

### Instalação

Abra o console do Node na pasta onde os arquivos-fontes foram baixados e rode o comando:

```shell
$npm install
```

### Configuração

Alguns parâmetros precisam ser configurados para que a aplicação rode corretamente. Abra para edição o arquivo 'config.js' e preencha os valores de "Client ID", "Client Secret" e "redirect URI" do client da API do Instagram na key 'oauth', os dados do servidor (host/port) na key 'server' e os dados de conexão com o banco de dades (url) na key 'db'. Isto feito, vá para a pasta '/js/controller' e abra 'hashSearchCtrl.js' (também com um editor de texto) e configure '$scope.server', na segunda linha, com o endereço do servidor (atente para a porta). Obs.: se o deploy for feito para rodar localmente, não é necessário mudar os parâmetros de endereço pré-configurados (apenas inserir os valores de configuração do API client).

Com as configurações feitas, certifique-se de que o serviço do mongodb (mongod) está rodando, volte ao console do node e rode o comando de inicialização:

```shell
$npm start
```
