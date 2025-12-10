const { deleteMenuItem, getActiveMenu } = require('../../src/services/menu_service');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

describe('Menu Service (Soft Delete)', () => {
  beforeEach(async () => {
    await prisma.orderItem.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.restaurant.deleteMany();
  });

  test('Має помітити товар як видалений, але залишити в БД', async () => {
    const rest = await prisma.restaurant.create({ data: { name: 'Sushi Bar', category: 'Japan' }});
    const item = await prisma.menuItem.create({ 
      data: { name: 'California', price: 200, restaurantId: rest.id }
    });

    await deleteMenuItem(item.id);

    const deletedItem = await prisma.menuItem.findUnique({ where: { id: item.id }});
    expect(deletedItem.deletedAt).not.toBeNull();

    const activeMenu = await getActiveMenu(rest.id);
    expect(activeMenu).toHaveLength(0);
  });
});