const { createOrder } = require('../../src/services/order_service');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Order System', () => {
  beforeEach(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
  });

  test('Should create order inside transaction', async () => {
    const user = await prisma.user.create({ data: { email: 'test@test.com', name: 'Test' }});
    const rest = await prisma.restaurant.create({ data: { name: 'Sushi', category: 'Food' }});
    const item = await prisma.menuItem.create({ 
      data: { name: 'Roll', price: 100, restaurantId: rest.id }
    });

    const order = await createOrder(user.id, rest.id, [{ menuItemId: item.id, quantity: 2 }]);

    expect(Number(order.totalAmount)).toBe(200);
    expect(order.items).toHaveLength(1);
  });
});