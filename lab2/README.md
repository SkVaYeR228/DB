# Lab 2
## Скрипти

### Таблиця:
```
CREATE TABLE Customers (
    CustomerID SERIAL PRIMARY KEY,
    FirstName VARCHAR(100) NOT NULL,
    LastName VARCHAR(100) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    Address TEXT
);

CREATE TABLE Authors (
    AuthorID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Biography TEXT
);

CREATE TABLE Publishers (
    PublisherID SERIAL PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Country VARCHAR(100)
);

CREATE TABLE Categories (
    CategoryID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Books (
    BookID SERIAL PRIMARY KEY,
    PublisherID INT,
    Title VARCHAR(255) NOT NULL,
    Description TEXT,
    PublicationYear INT,
    FOREIGN KEY (PublisherID) REFERENCES Publishers(PublisherID)
);

CREATE TABLE Products (
    ProductID SERIAL PRIMARY KEY,
    BookID INT NOT NULL,
    Format VARCHAR(50) NOT NULL,
    Price DECIMAL(10, 2) NOT NULL CHECK (Price >= 0),
    StockQuantity INT NOT NULL DEFAULT 0 CHECK (StockQuantity >= 0),
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE
);

CREATE TABLE Orders (
    OrderID SERIAL PRIMARY KEY,
    CustomerID INT,
    OrderDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) NOT NULL DEFAULT 'Обробка',
    TotalAmount DECIMAL(10, 2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

CREATE TABLE Book_Author (
    BookID INT,
    AuthorID INT,
    PRIMARY KEY (BookID, AuthorID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID) ON DELETE CASCADE
);

CREATE TABLE Book_Category (
    BookID INT,
    CategoryID INT,
    PRIMARY KEY (BookID, CategoryID),
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE,
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE
);

CREATE TABLE OrderItems (
    OrderItemID SERIAL PRIMARY KEY,
    OrderID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL CHECK (Quantity > 0),
    UnitPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
```
### Данні:
```
INSERT INTO Customers (FirstName, LastName, Email, PasswordHash, Address)
VALUES
('Іван', 'Петренко', 'ivan@example.com', 'hash123', 'м. Київ, вул. Хрещатик, 1'),
('Марія', 'Сидоренко', 'maria@example.com', 'hash456', 'м. Львів, пл. Ринок, 5'),
('Олексій', 'Коваленко', 'alex@example.com', 'hash789', 'м. Одеса, вул. Дерибасівська, 10');

INSERT INTO Authors (Name, Biography)
VALUES
('Тарас Шевченко', 'Видатний український поет, прозаїк, мислитель...'),
('Іван Франко', 'Український письменник, поет, вчений, публіцист...'),
('Леся Українка', 'Українська письменниця, перекладачка, культурна діячка...'),
('Герберт Уеллс', 'Англійський письменник-фантаст, автор "Війни світів".');

INSERT INTO Publishers (Name, Country)
VALUES
('А-БА-БА-ГА-ЛА-МА-ГА', 'Україна'),
('Видавництво Старого Лева', 'Україна'),
('Клуб Сімейного Дозвілля', 'Україна');

INSERT INTO Categories (CategoryName)
VALUES
('Українська класика'),
('Поезія'),
('Фантастика'),
('Дитяча література');

INSERT INTO Books (PublisherID, Title, Description, PublicationYear)
VALUES
(1, 'Кобзар', 'Збірка поетичних творів Тараса Шевченка.', 1840),
(2, 'Захар Беркут', 'Історична повість Івана Франка.', 1883),
(1, 'Лісова пісня', 'Драма-феєрія Лесі Українки.', 1911),
(3, 'Війна світів', 'Класичний науково-фантастичний роман.', 1898);

INSERT INTO Products (BookID, Format, Price, StockQuantity)
VALUES
(1, 'Тверда обкладинка (подарункова)', 450.00, 50),
(1, 'М''яка обкладинка', 150.00, 200),
(2, 'Тверда обкладинка', 220.00, 150),
(4, 'Тверда обкладинка (переклад)', 300.00, 70),
(4, 'Електронна книга (.epub)', 99.00, 1000);

INSERT INTO Orders (CustomerID, Status, TotalAmount)
VALUES
(1, 'Відправлено', 600.00),
(2, 'Обробка', 220.00),
(1, 'Новий', 99.00);

INSERT INTO Book_Author (BookID, AuthorID)
VALUES
(1, 1), -- Кобзар -> Тарас Шевченко
(2, 2), -- Захар Беркут -> Іван Франко
(3, 3), -- Лісова пісня -> Леся Українка
(4, 4); -- Війна світів -> Герберт Уеллс

INSERT INTO Book_Category (BookID, CategoryID)
VALUES
(1, 1), -- Кобзар -> Українська класика
(1, 2), -- Кобзар -> Поезія
(2, 1), -- Захар Беркут -> Українська класика
(3, 1), -- Лісова пісня -> Українська класика
(3, 2), -- Лісова пісня -> Поезія
(4, 3); -- Війна світів -> Фантастика

INSERT INTO OrderItems (OrderID, ProductID, Quantity, UnitPrice)
VALUES
(1, 1, 1, 450.00), -- Іван купив 1 "Кобзар (подарунковий)"
(1, 2, 1, 150.00), -- ... і 1 "Кобзар (м'який)"
(2, 3, 1, 220.00), -- Марія купила 1 "Захар Беркут"
(3, 5, 1, 99.00);  -- Іван купив 1 "Війна світів (epub)"
```
## Короткий письмовий звіт:
### 1. Основні сутності:

### Customers (Клієнти)

* CustomerID (PK, SERIAL): Унікальний ID клієнта.

* FirstName, LastName, Address: Особиста інформація.

* Email (UNIQUE): Електронна пошта, використовується як логін; обмеження UNIQUE запобігає дублікатам акаунтів.

* PasswordHash: Хеш пароля (припущення: паролі ніколи не зберігаються у відкритому вигляді).

### Authors (Автори)

* AuthorID (PK, SERIAL): Унікальний ID автора.

* Name, Biography: Інформація про автора.

### Publishers (Видавництва)

* PublisherID (PK, SERIAL): Унікальний ID видавництва.

* Name, Country: Інформація про видавництво.

### Categories (Категорії)

* CategoryID (PK, SERIAL): Унікальний ID категорії (жанру).

* CategoryName (UNIQUE): Назва категорії, унікальна для уникнення дублювання.

### 2. Таблиці каталогу та товарів.

### Books (Книги / Твори)

* BookID (PK, SERIAL): Унікальний ID "твору" (концепції книги).

* PublisherID (FK): Зовнішній ключ, що посилається на Publishers(PublisherID). Встановлює зв'язок "один-до-багатьох" (одне видавництво може мати багато книг).

* Title, Description, PublicationYear: Описова інформація про твір.

### Products (Товари)

* ProductID (PK, SERIAL): Унікальний ID "товару" (SKU) — конкретний формат книги.

* BookID (FK): Зовнішній ключ, що посилається на Books(BookID). Зв'язує конкретний товар (наприклад, "тверда обкладинка") з його абстрактним твором.

* Format: Опис формату (наприклад, "Тверда обкладинка", "PDF").

* Price (CHECK >= 0): Ціна товару, не може бути від'ємною.

* StockQuantity (CHECK >= 0): Кількість на складі, не може бути від'ємною.

*Припущення: Відокремлено "Книгу" (твір) від "Товару" (те, що лежить на складі), щоб один твір міг продаватися у багатьох форматах.*

3. Таблиці замовлень

### Orders (Замовлення)

* OrderID (PK, SERIAL): Унікальний ID замовлення.

* CustomerID (FK): Зовнішній ключ, що посилається на Customers(CustomerID). Показує, який клієнт зробив замовлення.

* OrderDate, Status: Дата та поточний стан замовлення.

* TotalAmount: Загальна сума (для зручності; може обчислюватися).

### OrderItems (Позиції замовлення)

* OrderItemID (PK, SERIAL): Унікальний ID рядка в замовленні.

* OrderID (FK): Зовнішній ключ, що посилається на Orders(OrderID). Вказує, до якого замовлення належить ця позиція.

* ProductID (FK): Зовнішній ключ, що посилається на Products(ProductID). Вказує, який саме товар було куплено.

* Quantity (CHECK > 0): Кількість куплених одиниць (має бути більше 0).

* UnitPrice: Важливе припущення: Це поле зберігає "знімок" ціни товару на момент покупки. Це гарантує, що якщо ціна на Product зміниться в майбутньому, звіти за старими замовленнями залишаться коректними.

4. Асоціативні таблиці (Зв'язки "Багато-до-Багатьох")

### Book_Author (Автори книги)

* BookID (PK, FK): Композитний первинний ключ - посилається на Books(BookID).

* AuthorID (PK, FK): Композитний первинний ключ - посилається на Authors(AuthorID).

*Пояснення: Ця таблиця дозволяє реалізувати зв'язок "багато-до-багатьох". Одна книга може мати багато авторів, і один автор може мати багато книг. Обмеження PRIMARY KEY (BookID, AuthorID) гарантує, що пара "книга-автор" є унікальною.*

### Book_Category (Категорії книги)

* BookID (PK, FK): Композитний первинний ключ; посилається на Books(BookID).

* CategoryID (PK, FK): Композитний первинний ключ; посилається на Categories(CategoryID).

*Пояснення: Аналогічно до авторів, ця таблиця дозволяє книзі перебувати в багатьох категоріях (наприклад, "Фантастика" і "Бестселер"), а категорії — містити багато книг.*

## Докази(скріншоти) у папці images
