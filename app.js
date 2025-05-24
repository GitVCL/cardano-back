const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

// Rota Cardano (CoinGecko)
app.get('/api/cardano', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/cardano?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false');
    const data = await response.json();

    const price = data.market_data.current_price.usd;
    const change24h = data.market_data.price_change_percentage_24h;
    const marketCap = data.market_data.market_cap.usd;

    res.json({ price, change24h, marketCap });
  } catch (error) {
    console.error("Erro Cardano:", error);
    res.status(500).json({ error: 'Erro ao buscar dados do Cardano' });
  }
});

// Rota Criptos (Binance)
app.get('/api/cryptos', async (req, res) => {
  try {
    const response = await fetch('https://api.binance.com/api/v3/ticker/price');
    const data = await response.json();

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
    console.error("Erro Binance:", error);
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

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
