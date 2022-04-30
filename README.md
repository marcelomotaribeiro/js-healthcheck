# js-healthcheck
 
O propósito desta aplicação é prover um painel de observação para verificação de "saúde" (healthcheck) de API's e aplicações Web.
Para tanto, o usuário deverá criar um arquivo indicando todas as API's e WebApps que se deseja monitorar, utilizando a mesma estrutura existente no arquivo de modelo "public/data.json", deixando-o disponível em uma URL válida (com CORS liberado para acesso) e adicionando o seu path na variável de ambiente VITE_DATA_URL.
