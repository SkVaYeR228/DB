const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function getTopRestaurants() {
  const result = await prisma.$queryRaw`
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
  `;
  
  const serializedResult = result.map(row => ({
      ...row,
      total_orders: row.total_orders.toString(),
      total_revenue: row.total_revenue
  }));

  return serializedResult;
}
async function getUserRankings() {
  
  const result = await prisma.$queryRaw`
    WITH UserSpend AS (
      SELECT 
        u.id,
        u.name,
        COUNT(o.id) as orders_count,
        SUM(o."totalAmount") as total_spent
      FROM "User" u
      JOIN "Order" o ON u.id = o."userId"
      GROUP BY u.id, u.name
    )
    SELECT 
      DENSE_RANK() OVER (ORDER BY total_spent DESC) as rank,
      name,
      orders_count,
      total_spent
    FROM UserSpend
    ORDER BY rank ASC
    LIMIT 10;
  `;

  return result.map(row => ({
    rank: Number(row.rank),
    name: row.name,
    orders_count: row.orders_count.toString(),
    total_spent: row.total_spent
  }));
}

module.exports = { getTopRestaurants, getUserRankings };