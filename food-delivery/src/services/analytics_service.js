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

module.exports = { getTopRestaurants };