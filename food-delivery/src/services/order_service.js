const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createOrder(userId, restaurantId, items) {

  return await prisma.$transaction(async (tx) => {
    let totalAmount = 0;
    
    const menuItems = await tx.menuItem.findMany({
      where: { 
        id: { in: items.map(i => i.menuItemId) },
        restaurantId: restaurantId,
        deletedAt: null
      }
    });

    if (menuItems.length !== items.length) {
      throw new Error("Деякі товари не знайдено або вони видалені");
    }

    const orderItemsData = items.map(item => {
      const product = menuItems.find(p => p.id === item.menuItemId);
      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;
      
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        priceAtOrder: product.price
      };
    });

    const newOrder = await tx.order.create({
      data: {
        userId,
        restaurantId,
        totalAmount,
        status: 'PENDING',
        items: {
          create: orderItemsData
        }
      },
      include: { items: true }
    });

    return newOrder;
  });
}

module.exports = { createOrder };