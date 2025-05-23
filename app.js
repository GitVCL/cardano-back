const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Libera apenas o domínio do seu front-end Vercel
app.use(cors({
  origin: 'https://cardano-tracker.vercel.app'
}));  

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

const PORT = process.env.PORT || 3001; // Isso é importante para a Render
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.get('/api/binance/:symbol', async (req, res) => {
  const symbol = req.params.symbol.toUpperCase(); // exemplo: BTCUSDT
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
    res.json({
      symbol: response.data.symbol,
      price: parseFloat(response.data.price)
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar preço da Binance' });
  }
});
