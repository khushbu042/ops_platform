const amqp = require("amqplib");

async function startWorker() {

  const connection = await amqp.connect( "amqp://localhost" );
  const channel = await connection.createChannel();

  const queue = "ticket_created";

  await channel.assertQueue( queue );

  console.log(
    "Worker waiting for messages..."
  );

  channel.consume(
    queue,
    (message) => {
      const data = JSON.parse( message.content.toString() );
      console.log( "Processing ticket:", data.title );
      console.log(   "Sending email..." );
      channel.ack(message);
    }
  );
}

startWorker();