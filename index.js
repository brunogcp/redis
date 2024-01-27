const redis = require('redis');

async function main() {
  // Cria um novo cliente Redis. A URL especifica a localização do servidor Redis.
  const client = redis.createClient({
      url: 'redis://localhost:6379'
  });

  // Event listener para conexão bem-sucedida.
  client.on('connect', () => console.log('🎉 Conectado ao Redis!'));
  // Event listener para erros de conexão.
  client.on('error', (err) => console.error('😱 Erro no Redis:', err));

  await client.connect(); // Estabelece a conexão com o servidor Redis.

  await client.set('hello', 'world'); // Define um valor no Redis.
  const value = await client.get('hello'); // Recupera o valor do Redis.
  console.log('💬 Valor:', value); // Exibe o valor recuperado.

  await client.quit(); // Fecha a conexão com o servidor Redis.
}

main().catch(console.error);