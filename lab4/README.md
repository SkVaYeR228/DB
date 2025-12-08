# Lab 4
## Скрипти
```
SELECT SUM(Quantity) AS Total_Books_Sold
FROM OrderItems;

SELECT AVG(Price) AS Average_Product_Price
FROM Products;

SELECT 
    MAX(Price) AS Max_Price, 
    MIN(Price) AS Min_Price
FROM Products;

SELECT COUNT(*) AS Total_Customers
FROM Customers;


SELECT PublisherID, COUNT(*) AS Books_Count
FROM Books
GROUP BY PublisherID;

SELECT Format, SUM(Price * StockQuantity) AS Total_Stock_Value
FROM Products
GROUP BY Format;

SELECT PublisherID, COUNT(*) AS Books_Count
FROM Books
GROUP BY PublisherID
HAVING COUNT(*) > 1;


SELECT b.Title, a.Name AS Author_Name
FROM Books b
INNER JOIN Book_Author ba ON b.BookID = ba.BookID
INNER JOIN Authors a ON ba.AuthorID = a.AuthorID;

SELECT 
    c.LastName, 
    c.FirstName, 
    COUNT(o.OrderID) AS Orders_Count
FROM Customers c
LEFT JOIN Orders o ON c.CustomerID = o.CustomerID
GROUP BY c.CustomerID, c.LastName, c.FirstName;

SELECT c.FirstName, cat.CategoryName
FROM Customers c
CROSS JOIN Categories cat;


SELECT ProductID, Format, Price
FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products);

SELECT 
    p.Name, 
    (SELECT COUNT(*) FROM Books b WHERE b.PublisherID = p.PublisherID) AS Book_Count
FROM Publishers p;

SELECT FirstName, LastName, Email
FROM Customers
WHERE CustomerID IN (
    SELECT o.CustomerID
    FROM Orders o
    JOIN OrderItems oi ON o.OrderID = oi.OrderID
    WHERE oi.UnitPrice > 300
);


SELECT 
    b.Title, 
    SUM(oi.Quantity * oi.UnitPrice) AS Total_Revenue
FROM Books b
JOIN Products p ON b.BookID = p.BookID
JOIN OrderItems oi ON p.ProductID = oi.ProductID
GROUP BY b.Title
ORDER BY Total_Revenue DESC;
```
## Короткий письмовий звіт
### Агрегація

* Загальна кількість проданих книг: Використовує функцію SUM для підрахунку загальної кількості одиниць товару, проданих через усі замовлення.

* Середня ціна товару: Використовує функцію AVG для обчислення середньої вартості товару в каталозі магазину.

* Діапазон цін (Мін/Макс): Використовує функції MIN та MAX, щоб знайти найдешевший та найдорожчий товари, наявні на складі.

* Кількість клієнтів: Використовує функцію COUNT(*), щоб підрахувати загальну кількість зареєстрованих користувачів у базі даних.

### Групування та фільтрація

* Книги за видавництвами: Групує записи за ID видавництва та рахує кількість книг, що належать кожному з них.

* Вартість складу за форматами: Групує товари за їхнім форматом та обчислює сумарну вартість залишків на складі для кожної групи.

* Активні видавництва: Аналогічний до запиту №5, але використовує HAVING, щоб відфільтрувати результати й показати лише ті видавництва, які мають більше 1 книги в каталозі.

### Об'єднання

* Автори та їхні книги: Використовує INNER JOIN для з'єднання трьох таблиць (Books, Authors, Book_Author), щоб вивести список книг разом з іменами їхніх авторів.

* Активність клієнтів: Використовує LEFT JOIN, щоб вивести всіх клієнтів і показати кількість їхніх замовлень. Для неактивних клієнтів кількість буде 0.

* Матриця "Клієнт-Категорія": Використовує CROSS JOIN для створення повного переліку можливих комбінацій кожного клієнта з кожною категорією книг.

### Підзапити

* Товари дорожчі за середнє: Використовує підзапит у WHERE, щоб відфільтрувати товари, ціна яких перевищує середню ціну по всьому магазину.

* Статистика видавництв: Використовує підзапит прямо у блоці SELECT, щоб для кожного видавництва динамічно порахувати кількість пов'язаних із ним книг.

* Клієнти дорогих товарів: Використовує підзапит з оператором IN, щоб знайти список клієнтів, які зробили замовлення на товари вартістю понад 300 грн.

### Багатотаблична агрегація

* Рейтинг прибутковості книг: Об'єднує таблиці книг, товарів та позицій замовлення, щоб обчислити сумарний дохід (Quantity * UnitPrice) від продажу кожної конкретної назви книги та відсортувати їх від найприбутковішої до найменш прибуткової.