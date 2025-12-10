const { getTopRestaurants, getUserRankings } = require('../../src/services/analytics_service');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Analytics Service', () => {
  
  beforeEach(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
    await prisma.user.deleteMany();
  });

  test('Має повернути статистику по ресторанах', async () => {
    const user = await prisma.user.create({ data: { email: 'analyst@kpi.ua', name: 'Analyst' }});
    const rest = await prisma.restaurant.create({ data: { name: 'Best Pizza', category: 'Pizza' }});
    
    await prisma.order.create({
      data: {
        userId: user.id,
        restaurantId: rest.id,
        totalAmount: 500,
        status: 'DELIVERED'
      }
    });

    const result = await getTopRestaurants();

    expect(result.length).toBeGreaterThan(0);
    expect(result[0].restaurant_name).toBe('Best Pizza');
    expect(result[0].total_orders).toBe('1'); 
  });

  test('Має повернути рейтинг користувачів (Window Function)', async () => {
    const user = await prisma.user.create({ data: { email: 'vip@kpi.ua', name: 'VIP Client' }});
    const rest = await prisma.restaurant.create({ data: { name: 'Luxury Food', category: 'Gourmet' }});

    await prisma.order.create({
      data: { userId: user.id, restaurantId: rest.id, totalAmount: 1000, status: 'DONE' }
    });

    const rankings = await getUserRankings();

    expect(rankings).toBeDefined();
    expect(rankings.length).toBeGreaterThan(0);
    expect(rankings[0].rank).toBe(1);
    expect(rankings[0].name).toBe('VIP Client');
  });

});