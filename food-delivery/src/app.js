const express = require('express');
const { createOrder } = require('./services/order_service');
const { getTopRestaurants } = require('./services/analytics_service');
const { getActiveMenu } = require('./services/menu_service');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Food Delivery Backend працює!</h1>
    <ul>
      <li><a href="/analytics/top-restaurants">Переглянути ТОП ресторанів</a></li>
      <li><a href="/restaurant/1/menu">Переглянути меню ресторану ID=1</a></li>
    </ul>
  `);
});

app.get('/analytics/top-restaurants', async (req, res) => {
  try {
    const data = await getTopRestaurants();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/restaurant/:id/menu', async (req, res) => {
  try {
    const menu = await getActiveMenu(Number(req.params.id));
    res.json(menu);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post('/order', async (req, res) => {
  try {
    const { userId, restaurantId, items } = req.body;
    const order = await createOrder(userId, restaurantId, items);
    res.json(order);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});