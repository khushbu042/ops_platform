const amqp = require("amqplib");

let channel;

exports.connectRabbitMQ = async () => {
  try {
    const connection =
      await amqp.connect(
        process.env.RABBITMQ_URL
      );

    channel =
      await connection.createChannel();

    console.log(
      "RabbitMQ connected ✅"
    );
  } catch (error) {
    console.log(
      "RabbitMQ connection failed:",
      error.message
    );

    setTimeout(
      exports.connectRabbitMQ,
      5000
    );
  }
};

exports.getChannel = () => channel;