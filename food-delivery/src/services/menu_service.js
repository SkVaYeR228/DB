const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteMenuItem(itemId) {
  return await prisma.menuItem.update({
    where: { id: itemId },
    data: { deletedAt: new Date() }
  });
}

async function getActiveMenu(restaurantId) {
  return await prisma.menuItem.findMany({
    where: {
      restaurantId: restaurantId,
      deletedAt: null
    }
  });
}

async function getFirstRestaurantId() {
  const restaurant = await prisma.restaurant.findFirst({
    select: { id: true },
    orderBy: { id: 'asc' }
  });
  return restaurant ? restaurant.id : null;
}

module.exports = { deleteMenuItem, getActiveMenu, getFirstRestaurantId };