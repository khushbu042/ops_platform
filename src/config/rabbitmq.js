const amqp = require("amqplib");

let channel;

exports.connectRabbitMQ = async () => {

    const connection =  await amqp.connect( "amqp://rabbitmq");
    channel = await connection.createChannel();

    console.log("RabbitMQ Connected" );
};

exports.getChannel = () => {

  if (!channel) {
    throw new Error(
      "RabbitMQ channel not initialized"
    );
  }

  return channel;
};