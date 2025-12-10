const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class UserRepository {
  async createUser(data) {
    return await prisma.user.create({ data });
  }

  async findUserById(id) {
    return await prisma.user.findUnique({ where: { id } });
  }

  async getAllUsers() {
    return await prisma.user.findMany();
  }
}

module.exports = new UserRepository();