const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Початок перевірки(Node.js)');

  try {
    const updatedBook = await prisma.books.update({
      where: { bookid: 1 }, 
      data: { isbestseller: true },
    });
    console.log(`\n1. Книгу оновлено: ${updatedBook.title}`);

    const newReview = await prisma.reviews.create({
      data: {
        rating: 5,
        comment: "Тест успішний!",
        productid: 1
      }
    });
    console.log(`\n2. Відгук створено!`);

    const productWithReviews = await prisma.products.findUnique({
      where: { productid: 1 },
      include: { reviews: true }
    });

    console.log(`\n3. Результат:`);
    console.dir(productWithReviews, { depth: null });

  } catch (error) {
    console.error("Помилка:", error);
  }
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { 
    console.error(e); 
    await prisma.$disconnect(); 
    process.exit(1); 
  });