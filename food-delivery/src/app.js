const express = require('express');

const { createOrder } = require('./services/order_service');
const { getTopRestaurants, getUserRankings } = require('./services/analytics_service');
const { getActiveMenu, getFirstRestaurantId } = require('./services/menu_service');

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const restId = await getFirstRestaurantId();
    
    const menuLink = restId ? `/restaurant/${restId}/menu` : '#';
    const linkText = restId ? `Меню ресторану (ID=${restId})` : 'Ресторанів поки немає';

    res.send(`
      <style>
        body { font-family: sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
        a { text-decoration: none; color: #0066cc; }
        a:hover { text-decoration: underline; }
        li { margin-bottom: 10px; }
      </style>
      
      <h1>Food Delivery Backend</h1>
      <p>Сервер працює успішно!</p>
      
      <h3>Аналітика:</h3>
      <ul>
        <li><a href="/analytics/top-restaurants">ТОП ресторанів за виручкою</a></li>
        <li><a href="/analytics/user-rankings">Рейтинг клієнтів</a></li>
      </ul>

      <h3>Меню та Замовлення:</h3>
      <ul>
        <li><a href="${menuLink}"> ${linkText}</a></li>
      </ul>
    `);
  } catch (e) {
    console.error(e);
    res.status(500).send("Помилка сервера");
  }
});

app.get('/analytics/top-restaurants', async (req, res) => {
  try {
    const data = await getTopRestaurants();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/analytics/user-rankings', async (req, res) => {
  try {
    const data = await getUserRankings();
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
    if (!userId || !restaurantId || !items || items.length === 0) {
      return res.status(400).json({ error: "Некоректні дані замовлення" });
    }
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