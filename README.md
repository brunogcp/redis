<div align="center">
  <h3 align="center">REDIS</h3>
  <div>
  <a href="https://bgcp.vercel.app/articles/3814706f-d7c9-456d-9fc4-2e389b1318e6">
  <img src="https://img.shields.io/badge/Download PDF (ENGLISH)-black?style=for-the-badge&logoColor=white&color=000000" alt="three.js" />
  </a>
  </div>
</div>

## 🚀 Introdução ao Redis

Redis é uma poderosa ferramenta de armazenamento de dados em memória, atuando como banco de dados, cache e broker de mensagens. Sua fama vem da velocidade estonteante e versatilidade em estruturas de dados.

### 🌟 Principais Características

- **⚡ Alta Velocidade**: Uma verdadeira estrela para leitura e gravação ágeis.
- **🧩 Estruturas de Dados Diversas**: Abraça desde strings até listas e hashes.
- **🔐 Replicação e Persistência**: Garante a segurança dos dados com opções robustas.
- **🤝 Compatibilidade com Linguagens**: Um verdadeiro camaleão, trabalha com várias linguagens de programação.

## 🛠️ Instalação

### Windows

Para instalar o Redis no Windows, use o Windows Subsystem for Linux (WSL2) e siga as instruções na página oficial do Redis: [Instalar Redis no Windows](https://redis.io/docs/install/install-redis/install-redis-on-windows/).

### Linux (Ubuntu/Debian)

1. `sudo apt update` 🔄
2. `sudo apt install redis-server` 📦
3. `sudo systemctl start redis.service` ▶️

### macOS (Homebrew)

1. Instale o Homebrew, se necessário. 🍺
2. `brew install redis` 📦
3. `brew services start redis` ▶️

## 📊 Uso Básico

### Configuração Inicial

1. 🔧 No arquivo `redis.conf`, ajuste:
    - **Persistência**:
      - `save <seconds> <changes>`: Define regras de gravação. Ex: `save 900 1` (15 minutos, 1 mudança).
    - **Senha** (Opcional):
      - `requirepass sua_senha` - Escolha uma senha forte!
    - **Logs**:
    - `logfile <filename>`: Escolhe o arquivo de log.
    - `loglevel`: Ajusta o nível do log (ex: `debug`, `notice`, `warning`).
    🔄 Reinicie o Redis para aplicar as configurações.

2. Inicio o projeto node: `npm init -y`.
3. Instale o cliente redis para Node.js: `npm install redis`.

### Exemplo Básico em Node.js

1. Crie o arquivo `index.js` na raiz do projeto.

    ``` js
    // index.js
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
    ```

2. Execute o código: `node index.js`.

## 📈 Redis como Cache HTTP

### Teoria do Cache HTTP

💡 O cache HTTP guarda cópias de recursos da web, reduzindo o tráfego e acelerando as respostas.

### Motivo para Utilizar o Cache

🚀 Cache eleva a eficiência da aplicação web, diminuindo latência e carga nos servidores.

### Criação do Servidor e Implementação do Cache

👨‍💻 Implementação de um servidor em Node.js com Redis para cache.

1. **Configuração**:

    - Instale Redis e Node.js.
    - Instale os pacotes `redis`, `express` e `axios`: `npm install redis express axios`

2. **Servidor com Cache**:
3. Cria o arquivo `cache.js`

    ```js
    // cache.js
    // Aqui, nós configuramos o Express e o cliente Redis.
    const express = require('express');
    const redis = require('redis');

    const app = express();
    const client = redis.createClient({
      url: 'redis://localhost:6379'
    });
    const PORT = 3000;
    const CACHE_DURATION = 60; // Duração do cache em segundos.

    client.on('error', (err) => console.log('🔥 Redis Client Error', err));
    client.connect();

    // Função para obter dados do cache.
    async function getCache(key) {
      // Tentativa de recuperar os dados do cache.
      try {
        const data = await client.get(key);
        if (data != null) return JSON.parse(data); // Se dados existem, retorna-os.
        return null; // Retorna nulo se não houver dados.
      } catch (err) {
        console.error(err); // Tratamento de erro.
      }
    }

    // Função para definir dados no cache.
    async function setCache(key, data) {
      try {
        // Armazena os dados no Redis com um tempo de expiração.
        await client.set(key, JSON.stringify(data), { EX: CACHE_DURATION });
      } catch (err) {
        console.error(err); // Tratamento de erro.
      }
    }

    // Rota do Express para demonstrar o uso de cache.
    app.get('/data', async (req, res) => {
      const cacheKey = 'unique_key'; // Chave única para o cache.
      const cachedData = await getCache(cacheKey);

      if (cachedData) {
        console.log('🚀 Cache Hit'); // Dados recuperados do cache.
        return res.json(cachedData);
      }

      console.log('💨 Cache Miss'); // Dados não encontrados no cache, requisição feita à fonte.
      const response = await fetch('https://dummyjson.com/products/1');
      const data = await response.json();
      await setCache(cacheKey, data); // Armazena os dados no cache.
      res.json(data); // Responde com os dados.
    });

    app.listen(PORT, () => {
      console.log(`🌍 Server running on port ${PORT}`);
    });

    ```

4. Executa o código: `node cache.js`

### 🔍Testes

1. **Verificação do Cache**:

    - Acesse `http://localhost:3000/data` via navegador ou Postman.
    - Primeira requisição: "Cache Miss", subsequentes: "Cache Hit".

2. **Monitoramento do Redis**:

    - Use `redis-cli monitor` para observar operações em tempo real.

3. **Validação da Expiração do Cache**:

    - Após 60 segundos, uma nova requisição mostrará um "Cache Miss".

## 🏆 Conclusão

Neste tutorial, exploramos o mundo do Redis, uma ferramenta poderosa que turbina aplicações com seu armazenamento em memória ultra-rápido. Combinamos teoria e prática, mergulhando desde a instalação até a criação de um servidor Node.js com cache Redis. O uso do Redis como cache HTTP ilustra perfeitamente como ele pode melhorar significativamente a eficiência e velocidade de aplicações web.

Espero que este guia tenha sido útil e inspirador, e que você se sinta pronto para incorporar o Redis em seus próprios projetos. Continue explorando, experimentando e acima de tudo, se divertindo com a programação!
