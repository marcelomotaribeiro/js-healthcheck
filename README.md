# js-healthcheck
 
O propósito deste respositório é fornecer um exemplo de implementação de um painel de verificação de básica de HealthCheck de Endpoints.

Os endpoints a serem verificados devem ser adicionados em um arquivo JSON, cuja estrutura deve obedecer a mesma usada neste exemplo: https://github.com/marcelomotaribeiro/js-healthcheck/blob/main/public/data.json.

O caminho deste arquivo JSON deve ser informado por meio da variável de ambiente: VITE_DATA_URL.

Em execução, uma página será exibida mostrando um quadro para cada endpoint.

A cada 10 segundos, a aplicação irá executar uma requisição ao endpoint e indicará se o recurso está online ou não, indicando o horário da última verificação.

**Limitações**: Se trata de um código implementado para fins didáticos, cujo o propósito é trabalhar habilidades de requisições assíncronas. Em cenários reais, indicamos utilizar outras ferramentas, robustas, para Healthcheck.
