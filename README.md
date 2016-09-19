# Hash Search

## Resumo:

Serviço de busca de hashtags no Instagram, com possibilidade de salvar essas buscas, consultar e deletá-las posteriormente. Desenvolvido usando a stack MEAN (MongoDB, Express, AngularJS e NodeJS).

## Instalação e configuração

São pré-requisitos para instalar e rodar o serviço:

1. Ter o NodeJS com npm (https://nodejs.org/en/) e o MongoDB (https://www.mongodb.com/download-center) instalados e rodando no host. 

2. Ter um client da API do Instagram (https://www.instagram.com/developer/clients/manage/) com o scope 'public_content' com status permitido. Sem esse requisito não será possível rodar corretamente o serviço, pois é necessário para a realização da autenticação para integrar com o  Instagram e realizar as buscas.

Com os pré-requisitos atendidos, baixe e instale os pacotes da hash_search.

### Instalação

Faça o clone dos arquivos fonte pelo console:

```shell
$git clone https://github.com/jfgrodrigues/hash_search.git
```

Depois de baixar os arquivos fonte, vá para a pastarecém-baixada (hash_search) e rode o npm para instalar os pacotes do node:

```shell
$cd hash_search
$npm install
```

### Configuração

Alguns parâmetros precisam ser configurados para que a aplicação rode corretamente. Abra para edição o arquivo 'config.js' e preencha os valores de "Client ID", "Client Secret" e "redirect URI" do client da API do Instagram na key 'oauth', os dados do servidor (host/port) na key 'server' e os dados de conexão com o banco de dades (url) na key 'db'. Isto feito, vá para a pasta '/js/controller' e abra 'hashSearchCtrl.js' (também com um editor de texto) e configure '$scope.server', na segunda linha, com o endereço do servidor (atente para a porta). Obs.: se o deploy for feito para rodar localmente, não é necessário mudar os parâmetros de endereço pré-configurados (apenas inserir os valores de configuração do API client).

Com as configurações feitas, certifique-se de que o serviço do mongodb (mongod) está rodando (abra um outro console e digite 'mongod')

```shell
$mongod
```

Se o serviço estiver no ar, inicie o servidor (node) com o npm:

```shell
$npm start
```

Com o browser, acesse a aplicação pela interface web (se estiver rodando num servidor web local, digite 'localhost').
