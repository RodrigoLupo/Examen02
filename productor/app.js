const kafka = require('kafkajs').Kafka;

const kafkaClient = new kafka({
  clientId: 'productor',
  brokers: [process.env.KAFKA_BROKER]
});

const producer = kafkaClient.producer();

const runProducer = async () => {
  await producer.connect();
  setInterval(async () => {
    try {
      const mensaje = { value: `Hola Mundo de Rodrigo Lupo en ${new Date().toISOString()}` };
      await producer.send({
        topic: 'mi_tema',
        messages: [mensaje],
      });
      console.log('Mensaje enviado:', mensaje);
    } catch (err) {
      console.error('Error al enviar mensaje', err);
    }
  }, 5000); // Enviar mensaje cada 5 segundos
};

runProducer().catch(console.error);
