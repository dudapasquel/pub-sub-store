const RabbitMQService = require("./rabbitmq-service");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, ".env") });

var report = {};
async function updateReport(products) {
  for (let product of products) {
    if (!product.name) {
      continue;
    } else if (!report[product.name]) {
      report[product.name] = 1;
    } else {
      report[product.name]++;
    }
  }
}

async function printReport() {
  for (const [key, value] of Object.entries(report)) {
    console.log(`${key} = ${value} sales`);
  }
}

async function processMessage(msg) {
  const reportData = JSON.parse(msg.content);
  try {
    console.log("========================================");
    console.log(" NEW SALE REGISTERED");
    console.log("========================================");
    console.log(`Cliente: ${reportData.name}`);
    console.log(`Email: ${reportData.email}`);
    console.log(`CPF: ${reportData.cpf}`);
    console.log("Produtos:");
    if (reportData.products && reportData.products.length > 0) {
      reportData.products.forEach((product, index) => {
        console.log(`  ${index + 1}. ${product.name} - R$ ${product.value}`);
      });
      await updateReport(reportData.products);
    }
    if (reportData.address) {
      console.log("Endereço de entrega:");
      console.log(
        `  ${reportData.address.street}, ${reportData.address.number}`
      );
      console.log(
        `  ${reportData.address.neighborhood}, ${reportData.address.city} - ${reportData.address.state}`
      );
      console.log(`  CEP: ${reportData.address.zipCode}`);
    }
    console.log("========================================");
    console.log(" CONSOLIDATED REPORT:");
    console.log("========================================");
    await printReport();
    console.log("========================================");
    console.log(`✔ SUCCESS: Report updated`);
    console.log("========================================\n");
  } catch (error) {
    console.log(`X ERROR TO PROCESS: ${error}`);
  }
}

async function consume() {
  console.log(
    `SUCCESSFULLY SUBSCRIBED TO QUEUE: ${process.env.RABBITMQ_QUEUE_NAME}`
  );
  await (
    await RabbitMQService.getInstance()
  ).consume(process.env.RABBITMQ_QUEUE_NAME, (msg) => {
    processMessage(msg);
  });
}

consume();
