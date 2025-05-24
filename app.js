const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// Rota Criptos (Binance)
app.get('/api/cryptos', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.binance.com/api/v3/ticker/price');

    if (!Array.isArray(data)) {
      console.error("Resposta inesperada da Binance:", data);
      return res.status(500).json({ error: "Dados inválidos da Binance" });
    }

    const symbols = [
      "BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "XRPUSDT",
      "ADAUSDT", "DOGEUSDT", "AVAXUSDT", "DOTUSDT", "SHIBUSDT",
      "MATICUSDT", "LINKUSDT", "TRXUSDT", "LTCUSDT", "BCHUSDT"
    ];

    const filtered = data
      .filter(coin => symbols.includes(coin.symbol))
      .map(coin => ({
        symbol: coin.symbol,
        name: symbolToName(coin.symbol),
        price: parseFloat(coin.price)
      }));

    res.json(filtered);
  } catch (error) {
    console.error("Erro Binance:", error.message);
    res.status(500).json({ error: 'Erro ao buscar dados da Binance' });
  }
});

function symbolToName(symbol) {
  const names = {
    BTCUSDT: "Bitcoin",
    ETHUSDT: "Ethereum",
    BNBUSDT: "BNB",
    SOLUSDT: "Solana",
    XRPUSDT: "XRP",
    ADAUSDT: "Cardano",
    DOGEUSDT: "Dogecoin",
    AVAXUSDT: "Avalanche",
    DOTUSDT: "Polkadot",
    SHIBUSDT: "Shiba Inu",
    MATICUSDT: "Polygon",
    LINKUSDT: "Chainlink",
    TRXUSDT: "TRON",
    LTCUSDT: "Litecoin",
    BCHUSDT: "Bitcoin Cash"
  };
  return names[symbol] || symbol;
}

app.listen(PORT, () => console.log(`✅ Servidor rodando na porta ${PORT}`));
