-- CreateTable
CREATE TABLE "books" (
    "bookid" SERIAL NOT NULL,
    "publisherid" INTEGER,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "publicationyear" INTEGER,
    "isbestseller" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "books_pkey" PRIMARY KEY ("bookid")
);

-- CreateTable
CREATE TABLE "products" (
    "productid" SERIAL NOT NULL,
    "bookid" INTEGER NOT NULL,
    "format" VARCHAR(50) NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "stockquantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "products_pkey" PRIMARY KEY ("productid")
);

-- CreateTable
CREATE TABLE "reviews" (
    "reviewid" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productid" INTEGER NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("reviewid")
);

-- CreateTable
CREATE TABLE "customers" (
    "customerid" SERIAL NOT NULL,
    "firstname" VARCHAR(100) NOT NULL,
    "lastname" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "passwordhash" VARCHAR(255) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customerid")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderid" SERIAL NOT NULL,
    "customerid" INTEGER,
    "orderdate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalamount" DECIMAL(10,2),
    "statusid" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderid")
);

-- CreateTable
CREATE TABLE "orderitems" (
    "orderitemid" SERIAL NOT NULL,
    "orderid" INTEGER NOT NULL,
    "productid" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitprice" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "orderitems_pkey" PRIMARY KEY ("orderitemid")
);

-- CreateTable
CREATE TABLE "orderstatuses" (
    "statusid" SERIAL NOT NULL,
    "statusname" VARCHAR(50) NOT NULL,

    CONSTRAINT "orderstatuses_pkey" PRIMARY KEY ("statusid")
);

-- CreateTable
CREATE TABLE "addresses" (
    "addressid" SERIAL NOT NULL,
    "customerid" INTEGER NOT NULL,
    "city" VARCHAR(100),
    "street" VARCHAR(255),
    "postalcode" VARCHAR(20),
    "country" VARCHAR(100) DEFAULT 'Україна',

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("addressid")
);

-- CreateTable
CREATE TABLE "authors" (
    "authorid" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "biography" TEXT,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("authorid")
);

-- CreateTable
CREATE TABLE "publishers" (
    "publisherid" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100),

    CONSTRAINT "publishers_pkey" PRIMARY KEY ("publisherid")
);

-- CreateTable
CREATE TABLE "categories" (
    "categoryid" SERIAL NOT NULL,
    "categoryname" VARCHAR(100) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryid")
);

-- CreateTable
CREATE TABLE "book_author" (
    "bookid" INTEGER NOT NULL,
    "authorid" INTEGER NOT NULL,

    CONSTRAINT "book_author_pkey" PRIMARY KEY ("bookid","authorid")
);

-- CreateTable
CREATE TABLE "book_category" (
    "bookid" INTEGER NOT NULL,
    "categoryid" INTEGER NOT NULL,

    CONSTRAINT "book_category_pkey" PRIMARY KEY ("bookid","categoryid")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "orderstatuses_statusname_key" ON "orderstatuses"("statusname");

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryname_key" ON "categories"("categoryname");

-- AddForeignKey
ALTER TABLE "books" ADD CONSTRAINT "books_publisherid_fkey" FOREIGN KEY ("publisherid") REFERENCES "publishers"("publisherid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "books"("bookid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_productid_fkey" FOREIGN KEY ("productid") REFERENCES "products"("productid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "customers"("customerid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_statusid_fkey" FOREIGN KEY ("statusid") REFERENCES "orderstatuses"("statusid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_orderid_fkey" FOREIGN KEY ("orderid") REFERENCES "orders"("orderid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_productid_fkey" FOREIGN KEY ("productid") REFERENCES "products"("productid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_customerid_fkey" FOREIGN KEY ("customerid") REFERENCES "customers"("customerid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "book_author" ADD CONSTRAINT "book_author_authorid_fkey" FOREIGN KEY ("authorid") REFERENCES "authors"("authorid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_author" ADD CONSTRAINT "book_author_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "books"("bookid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_category" ADD CONSTRAINT "book_category_bookid_fkey" FOREIGN KEY ("bookid") REFERENCES "books"("bookid") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "book_category" ADD CONSTRAINT "book_category_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "categories"("categoryid") ON DELETE CASCADE ON UPDATE NO ACTION;
