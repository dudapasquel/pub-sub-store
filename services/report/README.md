# Serviço de report

Este é um modelo para o nosso serviço de reportes das vendas que nossa loja ja fez até o momento. Nele temos uma estrutura de apoio com funçoes para atualizar nosso report e visualizar os resultados. 
Entretanto nosso modelo ainda não esta recebendo as mensagens da fila, está função cabe a você implementar. 

Obs: Este é um exemplo de como pode ser criado o serviço de report, sinta-se avontade para melhora-ló ou mudar de linguagm.  Fique atento apenas ao padrão da mensagem que esta sendo publicada na fila. O seu serviço ira receber um json conforme ilustrado abaixo:

```json
{
    "name": "NOME_DO_CLIENTE",
    "email": "EMAIL_DO_CLIENTE",
    "cpf": "CPF_DO_CLIENTE",
    "creditCard": {
        "number": "NUMERO_DO_CARTAO_DE_CREDITO",
        "securityNumber": "CODIGO_DE_SEGURANCA"
    },
    "products": [
        {
            "name": "NOME_DO_PRODUTO",
            "value": "VALOR_DO_PRODUTO"
        }
    ],
    "address": {
        "zipCode": "CEP",
        "street": "NOME_DA_RUA",
        "number": "NUMERO_DA_RESIDENCIA",
        "neighborhood": "NOME_DO_BAIRO",
        "city": "NOME_DA CIDADE",
        "state": "NOME_DO_ESTADO"
    }
}
```

## Executando o serviço de _reports_

Primeiro, deve-se ajustar o arquivo .env com as configurações necessárias. Os passos anteriores também devem ter sido executados para que as filas sejam devidamente configuradas.

A aplicação, assim como o serviço `orders`, pode ser inicializada via Docker, por meio do seguinte comando (sempre chamado na raiz do projeto):

```
docker-compose up -d --build report-service
```

Ou o comando abaixo, caso esteja utilizando a versão 2 do Docker Compose

```
docker compose up -d --build report-service
```

Com o serviço executando, as mensagens da fila `report` serão consumidas e processadas. Novas vendas geram um log com dados básicos sobre a venda. Ao fim do processamento da mensagem, um relatório consolidado com todas as vendas de produtos feitas enquanto o serviço estava disponível é exibido, conforme a imagem abaixo.

![report_log](./images/report.png)