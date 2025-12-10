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

module.exports = { deleteMenuItem, getActiveMenu };