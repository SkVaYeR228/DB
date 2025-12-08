# Lab 3
## Скрипти
```
SELECT Title, PublicationYear 
FROM Books 
WHERE PublicationYear > 1900;


SELECT ProductID, Format, Price 
FROM Products 
WHERE Price < 200.00;


SELECT FirstName, LastName, Email 
FROM Customers 
WHERE FirstName = 'Іван';


INSERT INTO Customers (FirstName, LastName, Email, PasswordHash, Address)
VALUES ('Олена', 'Коваль', 'olena.koval@example.com', 'securehash999', 'м. Харків, вул. Сумська, 12');

SELECT * FROM Customers WHERE Email = 'olena.koval@example.com';


INSERT INTO Categories (CategoryName)
VALUES ('Бізнес література');

SELECT * FROM Categories WHERE CategoryName = 'Бізнес література';


UPDATE Customers
SET Address = 'м. Київ, проспект Перемоги, 55'
WHERE CustomerID = 1;

SELECT CustomerID, Address FROM Customers WHERE CustomerID = 1;


UPDATE Products
SET Price = 500.00
WHERE ProductID = 1;

SELECT ProductID, Price FROM Products WHERE ProductID = 1;


DELETE FROM OrderItems
WHERE OrderID = 2 AND ProductID = 3;

SELECT * FROM OrderItems WHERE OrderID = 2;


DELETE FROM Categories
WHERE CategoryName = 'Бізнес література';

SELECT * FROM Categories WHERE CategoryName = 'Бізнес література';
```

## Короткий письмовий звіт
### Customers: Зберігає дані користувачів.

* Ключі: CustomerID (PK).

* Обмеження: Email має бути унікальним (UNIQUE).

### Books: Каталог творів.

* Ключі: BookID (PK), PublisherID (FK -> Publishers).

* Припущення: Книга — це інтелектуальний твір, а не фізичний товар.

### Products: Товари на складі (формати книг).

* Ключі: ProductID (PK), BookID (FK -> Books).

* Обмеження: Price та StockQuantity >= 0.

### Orders: Заголовки замовлень.

* Ключі: OrderID (PK), CustomerID (FK -> Customers).

* Припущення: TotalAmount фіксується на момент замовлення.

### OrderItems: Деталі замовлення (що саме купили).

* Ключі: OrderItemID (PK), OrderID (FK), ProductID (FK).

* Обмеження: Quantity > 0.


* Authors, Publishers, Categories: Довідкові таблиці.

* Book_Author, Book_Category: Асоціативні таблиці для зв'язків "багато-до-багатьох".

## Докази(скріншоти) у папці images
