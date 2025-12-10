# Аналітичні SQL запити

## Запит: ТОП ресторанів за виручкою

**Бізнес-питання:** Які ресторани принесли найбільше грошей за останній місяць?

**SQL реалізація (Prisma Raw Query):**
```sql
SELECT 
  r.name as restaurant_name, 
  COUNT(o.id) as total_orders, 
  SUM(o."totalAmount") as total_revenue
FROM "Restaurant" r
JOIN "Order" o ON r.id = o."restaurantId"
WHERE o."createdAt" > NOW() - INTERVAL '1 month'
GROUP BY r.id, r.name
HAVING SUM(o."totalAmount") > 0
ORDER BY total_revenue DESC
LIMIT 5;
```
### Пояснення:

1. Використовуємо JOIN для з'єднання ресторанів із замовленнями.

2. Фільтруємо за датою (WHERE) за останній місяць.

3. Групуємо (GROUP BY) по ресторану.

4. Рахуємо суму (SUM) та кількість (COUNT).

5. Сортуємо від найбільшого до найменшого.