#### Setup postgres, pgadmin:

##### ` docker compose -f docker.yml  up`

#### Setup database:

##### ` docker exec -it container-pg bash`

##### ` psql -h localhost -p 5432 -U admin -d test_db`

##### ` \c test_db`

#####

```
     CREATE TABLE qna (
     id SERIAL PRIMARY KEY,
     questions VARCHAR(80),
     answers VARCHAR(255),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
   );
```

###### `pnpm start`

##### 1. What is the usage of Angular's Dependency Injection system, and how does it enhance modularity in an application? What are the different injection options?

- `Angular's Dependency Injection (DI) system` is a design pattern that allows the creation of services and components to be more modular and maintainable by providing the necessary dependencies at runtime rather than hardcoding them.

Usage of Angular's Dependency Injection:

`Separation of Concerns`: By injecting dependencies, components can focus on their core functionality without worrying about how to create their dependencies.
Reusability: Services can be reused across multiple components, promoting code reuse and reducing duplication.
`Testability`: DI makes it easier to mock dependencies in unit tests, allowing for more effective testing of components and services.
`Configuration Flexibility`: Dependencies can be provided and configured in different ways depending on the environment, such as development or production.
Different Injection Options:

`Constructor Injection`: Dependencies are declared in the constructor of a class.
`Property Injection`: Dependencies are assigned to properties of the class, typically after construction.
`Method Injection`: Dependencies are passed to methods where they are needed, allowing for more localized usage.
`Multi-Providers`: Allows multiple instances of a service to be provided, useful for collections of services.
`Optional Injection`: Allows a dependency to be injected only if it is available, avoiding errors if the service is not provided.
`Angular's DI system` enhances modularity by ensuring components and services are decoupled, promoting a clean architecture and easier maintenance.

##### 2. Given a table called users with columns `id`, `name`, `email`, and `created_at`, write a query to find the top 10 users who have been recently created. Describe how you would optimize this query if the table grows to over 1M records

-

```SELECT id, name, email, created_at
FROM users
ORDER BY created_at DESC
LIMIT 10;
```

- `Indexing`: Create an index on the `created_at` column. This will significantly speed up the sorting operation as the database can quickly locate the most recent records. You might create a composite index if you often filter or sort by multiple columns. CREATE INDEX `idx_created_at ON users (created_at DESC)`;
- `Database Partitioning`: If your use case frequently queries a specific time range, consider partitioning the table by time (e.g., monthly or yearly), allowing the database to scan only relevant partitions.

- `Limit Column Selection`: If possible, limit the columns returned by the query to only those that are necessary. Ensure you only select columns that are needed.

- `Caching`: Use caching mechanisms (like Redis or Memcached) to store frequently accessed results, especially if the same query runs often.

- `Optimize` the Database Configuration: Ensure that the database configuration is optimized for performance, including appropriate memory allocation, query cache settings, and I/O configurations.

##### 3. Explain the different categories of HTTP status codes and provide examples of status codes that fall under each category.

- `HTTP status codes` are categorized into five main classes based on their first digit:

`1xx`: Informational - These codes indicate that the request was received and is being processed, typically not indicating an end result.

`2xx`: Success - These codes signify that the client's request was successfully received, understood, and accepted.

`3xx`: Redirection - These codes indicate that further action needs to be taken by the client to complete the request, often involving a redirection to a different URL.

`4xx`: Client Error - These codes are generated when the client appears to have made an error, such as providing a bad request or unauthorized access.

`5xx`: Server Error - These codes indicate that the server failed to fulfill a valid request due to an error on the server side.

Each category helps in diagnosing and understanding outcomes of web interactions.

##### 4. You have the following database tables:

```
CREATE TABLE users (
id SERIAL PRIMARY KEY,
name VARCHAR(100),
email VARCHAR(100),
created_at TIMESTAMP
);
---
CREATE TABLE orders (
id SERIAL PRIMARY KEY,
user_id INTEGER REFERENCES users(id),
product_name VARCHAR(100),
amount DECIMAL(10, 2),
order_date TIMESTAMP
);
```

##### Write a query resulting in the count of orders placed by each user in the past month, with the total amount spent by each user - only for VIP users, meaning, only for users with more than 5 orders. Include the user’s name, email, order count, and total spent amount, and order the results by the big spender in descending order.

-

```
SELECT
    us.name,
    us.email,
    COUNT(o.id) AS order_count,
    SUM(o.amount) AS total_spent
FROM
    users us
JOIN
    orders o ON us.id = o.user_id
WHERE
    o.order_date >= NOW() - INTERVAL '1 month'
GROUP BY
    us.id
HAVING
    COUNT(o.id) > 5
ORDER BY
    total_spent DESC;
```

test data

```
CREATE TABLE users ( id SERIAL PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), created_at TIMESTAMP );
CREATE TABLE orders ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES users(id), product_name VARCHAR(100), amount DECIMAL(10, 2), order_date TIMESTAMP );

INSERT INTO users (name, email, created_at) VALUES
('John Doe', 'john@example.com', NOW()),
('Jane Smith', 'jane@example.com', NOW()),
('Alice Johnson', 'alice@example.com', NOW()),
('Bob Brown', 'bob@example.com', NOW()),
('Chris White', 'chris@example.com', NOW()),
('David Black', 'david@example.com', NOW());

INSERT INTO orders (user_id, product_name, amount, order_date) VALUES
(1, 'Product A', 100.00, NOW() - INTERVAL '10 days'),
(1, 'Product B', 150.00, NOW() - INTERVAL '5 days'),
(1, 'Product C', 200.00, NOW() - INTERVAL '2 days'),
(1, 'Product D', 250.00, NOW() - INTERVAL '1 day'),
(1, 'Product E', 300.00, NOW() - INTERVAL '31 hours'),
(1, 'Product E', 300.00, NOW() - INTERVAL '3 hours'),
(1, 'Product E', 300.00, NOW() - INTERVAL '3 hours'),
(1, 'Product E', 300.00, NOW() - INTERVAL '3 hours'),
(1, 'Product F', 50.00, NOW() - INTERVAL '2 days'), -- John - 9 VIP
(2, 'Product G', 500.00, NOW() - INTERVAL '1 week'),
(2, 'Product H', 150.00, NOW() - INTERVAL '6 days'),
(3, 'Product I', 200.00, NOW() - INTERVAL '15 days'); -- Other

```

result

```
name	 email	                order_count	total_spent
John Doe john@example.com	9	         1950.00
```
