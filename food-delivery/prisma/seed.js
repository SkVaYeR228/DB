const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Починаємо наповнення бази даних...')

  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.menuItem.deleteMany()
  await prisma.restaurant.deleteMany()
  await prisma.user.deleteMany()

  const user1 = await prisma.user.create({
    data: {
      email: 'student@kpi.ua',
      name: 'Іван Студент',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'teacher@kpi.ua',
      name: 'Петро Викладач',
    },
  })

  const pizzaPlace = await prisma.restaurant.create({
    data: {
      name: 'Pizza KPI',
      category: 'Італійська кухня',
      items: {
        create: [
          { name: 'Маргарита', price: 150.00 },
          { name: 'Пепероні', price: 180.50 },
          { name: 'Чотири Сири', price: 210.00 },
        ],
      },
    },
  })

  const sushiBar = await prisma.restaurant.create({
    data: {
      name: 'Sushi Polytech',
      category: 'Японська кухня',
      items: {
        create: [
          { name: 'Каліфорнія', price: 220.00 },
          { name: 'Філадельфія', price: 250.00 },
          { name: 'Макі з огірком', price: 90.00 },
        ],
      },
    },
  })

  console.log({ user1, user2, pizzaPlace, sushiBar })
  console.log('Наповнення завершено успішно!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })