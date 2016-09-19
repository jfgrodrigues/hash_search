# Hash Search

## Resumo:

Serviço de busca de hashtags no Instagram, com possibilidade de salvar essas buscas, consultar e deletá-las posteriormente. Desenvolvido usando a stack MEAN (MongoDB, Express, AngularJS e NodeJS).

## Instalação e configuração

São pré-requisitos para instalar e rodar o serviço:
1. Ter o NodeJS (https://nodejs.org/en/) e o MongoDB (https://www.mongodb.com/download-center) instalados e rodando no host. 
2. Ter um client da API do Instagram (https://www.instagram.com/developer/clients/manage/) com o scope 'public_content' com status permitido. Sem esse requisito não será possível rodar corretamente o serviço, pois é necessário para a realização da autenticação para integrar com o  Instagram e realizar as buscas.

Com os pré-requisitos preenchidos, faça o clone dos arquivos fonte.

### Instalação

Abra o console do Node na pasta onde os arquivos-fontes foram baixados e rode o comando

```shell
$npm install
```

### Configuração

Alguns parâmetros precisam ser configurados para que a aplicação rode corretamente. Também na pasta raiz existe um arquivo chamado 'oauth.js'. Edite esse arquivo inserindo os valores de "Client ID", "Client Secret" e "redirect URI" do client da API do Instagram. Após isso, abra o arquivo 'index.js' com algum editor de texto e configure a variável 'host' com o endereço do client. Verifique também se é necessário mudar o valor da variável 'DB_url'. Se for rodar localmente, não é necessário alterar. Na variável 'port' é configurado o valor da porta em que o servidor vai rodar. Isto feito, vá para a pasta '/js/controller' e abra 'hashSearchCtrl.js' (também com um editor de texto) e configure '$scope.server', na segunda linha, com o endereço do servidor (atente para a porta).

Com as configurações feitas, basta voltar ao console do node aberto na pasta '/back' e rodar o comando de inicialização

```shell
$npm start
```
