const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class OrderRepository {
  async findById(id) {
    return await prisma.order.findUnique({
      where: { id },
      include: { 
        items: true,
        restaurant: true,
        user: true
      }
    });
  }

  async findByUserId(userId) {
    return await prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { items: true }
    });
  }

  async updateStatus(orderId, newStatus) {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    });
  }
}

module.exports = new OrderRepository();