const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/cardano', async (req, res) => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/cardano');
    const data = response.data;

    const result = {
      name: data.name,
      price: data.market_data.current_price.usd,
      change24h: data.market_data.price_change_percentage_24h,
      marketCap: data.market_data.market_cap.usd,
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da Cardano' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
