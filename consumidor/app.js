const kafka = require('kafkajs').Kafka;

const kafkaClient = new kafka({
  clientId: 'consumidor',
  brokers: [process.env.KAFKA_BROKER]
});

const consumer = kafkaClient.consumer({ groupId: 'grupo_consumidor' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'mi_tema', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Mensaje recibido: ${message.value.toString()}`);
    },
  });
};

runConsumer().catch(console.error);
