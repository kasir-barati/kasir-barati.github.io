## 1. PostgreSQL fundamentals

- What is PostgreSQL?

  - A free, open-source relational database management system (RDBMS).
  - **MVCC** (Multi Version Concurrency Control): PostgreSQL handles concurrent reads/writes using multi-versioning rather than simple locking.
    Comparison of three PostgreSQL concurrency strategies for a "deduct from balance" transaction:

    ```mermaid
    graph TB
        subgraph S1["READ COMMITTED + FOR UPDATE"]
            direction LR
            A1[Start: $100] --> A2[T1 locks row] --> A3[T2 waits] --> A4[T1 deducts $90 → $10] --> A5[T1 commits, releases lock] --> A6[T2 reads $10] --> A7[T2: insufficient funds] --> A8[✅ Balance: $10]
        end

        subgraph S2["SERIALIZABLE"]
            direction LR
            B1[Start: $100] --> B2[T1 & T2 read $100 snapshot] --> B3[T1 deducts $90 → $10] --> B4[T1 commits] --> B5[T2 tries update with stale $100] --> B6[❌ Serialization conflict] --> B7[Retry with fresh $10] --> B8[✅ Balance: $10]
        end

        subgraph S3["READ COMMITTED (no lock)"]
            direction LR
            C1[Start: $100] --> C2[T1 reads $100, T2 reads $100] --> C3[T1 computes $100-$90=$10, commits] --> C4[T2 still holds stale $100] --> C5[T2 computes $100-$90=$10, overwrites] --> C6[⚠️ T1's deduction silently discarded] --> C7[💸 Both committed with no error — balance shows $10, but $180 should've been deducted]
        end

        S1 ~~~ S2
        S2 ~~~ S3
        style S1 fill:#5F56,stroke:#cc0000a,color:#000
        style S2 fill:#5F56,stroke:#cc0000a,color:#000
        style S3 fill:#F556,stroke:#cc0000a,color:#000
    ```

    1. Pessimistic locking (SELECT ... FOR UPDATE): prevents inconsistency and corruption.
    2. SERIALIZABLE isolation with conflict retry: prevents inconsistent reads but may retry on conflicts.
    3. Default `READ COMMITTED`: allows for non-blocking reads but may lead to lost updates.

  - Transactions & ACID. `BEGIN`, `COMMIT`, `ROLLBACK`; consistency is its core strength.
    - Atomicity: the whole transaction either succeeds or fails as a unit.
    - Consistency: data is always in a valid state.
    - Isolation: no two transactions can interfere with each other.
    - Durability: no matter what, data is always safe even in the event of a system failure.
  - Indexes are Essential for performance; commonly B-tree, but also Hash, GIN, GiST, and BRIN. Here's the criteria breakdown for index selection criteria for a slow query:

    1. Query Semantics: What operators appear in the `WHERE` clause?
       - `=`, `<`, `>`, `BETWEEN`, `ORDER BY`.
       - `LIKE 'prefix%'`.
       - JSON / array operators.
       - Full-text search (`@@`).
       - Spatial / containment / overlap.
    2. Data Structure: What type is the indexed column?
       - Scalar (int, text, timestamp, UUID).
       - Array.
       - JSON / JSONB.
       - Range.
       - Geometry / spatial.
       - Text (tsvector).
    3. Table & Index Size:
       - How many rows does the table have?
       - How much space can the index afford?
       - Millions of rows → consider lightweight options.
       - Can you afford a heavier index, or do you need something lean?
    4. Read / Write Frequency:
       - How often is the data queried vs. inserted/updated?
       - Read-heavy → a heavier index is acceptable.
       - Write-heavy → prefer a lightweight, low-maintenance index

    ```mermaid
    flowchart LR

        subgraph BT["B-Tree (default)"]
            direction TB
            BT_OP["Operators:<br/>=, &lt;, &gt;, BETWEEN,<br/>ORDER BY, prefix search"]
            BT_DT["Data types:<br/>numbers, text, timestamps,<br/>UUIDs (simple scalars)"]
            BT_SZ["Size:<br/>grows with table size,<br/>moderate on large tables"]
            BT_RW["Read/Write:<br/>excellent for read-heavy,<br/>small overhead on writes"]
            BT_OP ~~~ BT_DT ~~~ BT_SZ ~~~ BT_RW
        end

        subgraph GIST["GiST"]
            direction TB
            GIST_OP["Operators:<br/>overlap, containment,<br/>proximity, similarity<br/>(not exact ordering)"]
            GIST_DT["Data types:<br/>geometry, spatial, ranges,<br/>tsvector, custom types"]
            GIST_SZ["Size:<br/>between B-Tree and GIN,<br/>more compact than GIN"]
            GIST_RW["Read/Write:<br/>good for mixed workloads,<br/>faster updates than GIN"]
            GIST_OP ~~~ GIST_DT ~~~ GIST_SZ ~~~ GIST_RW
        end

        subgraph GIN["GIN"]
            direction TB
            GIN_OP["Operators:<br/>contains, JSON operators,<br/>array operators,<br/>full-text search"]
            GIN_DT["Data types:<br/>JSON/JSONB, arrays,<br/>tsvector"]
            GIN_SZ["Size:<br/>large — many index entries<br/>per single row"]
            GIN_RW["Read/Write:<br/>very fast complex reads,<br/>slower inserts/updates"]
            GIN_OP ~~~ GIN_DT ~~~ GIN_SZ ~~~ GIN_RW
        end

        subgraph HASH["Hash"]
            direction TB
            HASH_OP["Operators:<br/>equality (=) only"]
            HASH_DT["Data types:<br/>anything hashable —<br/>numbers, text, JSON, arrays"]
            HASH_SZ["Size:<br/>can be smaller than B-Tree<br/>for large values (stores hashes)"]
            HASH_RW["Read/Write:<br/>niche gain for huge tables +<br/>frequent equality lookups"]
            HASH_OP ~~~ HASH_DT ~~~ HASH_SZ ~~~ HASH_RW
        end

        subgraph BRIN["BRIN"]
            direction TB
            BRIN_OP["Operators:<br/>=, &lt;, &gt;, BETWEEN<br/>(needs physical/logical<br/>order correlation)"]
            BRIN_DT["Data types:<br/>timestamps, dates,<br/>auto-incrementing IDs"]
            BRIN_SZ["Size:<br/>extremely lightweight —<br/>few MB for millions of rows"]
            BRIN_RW["Read/Write:<br/>best for append-only tables,<br/>degrades as rows get updated"]
            BRIN_OP ~~~ BRIN_DT ~~~ BRIN_SZ ~~~ BRIN_RW
        end

        BT ~~~ GIST ~~~ GIN ~~~ HASH ~~~ BRIN

        style BT fill:#fff5eb,stroke:#c05621,stroke-width:1px
        style GIST fill:#f0fff4,stroke:#276749,stroke-width:1px
        style GIN fill:#faf5ff,stroke:#6b46c1,stroke-width:1px
        style HASH fill:#fffaf0,stroke:#b7791f,stroke-width:1px
        style BRIN fill:#ebf8ff,stroke:#2b6cb0,stroke-width:1px
    ```

    **Vacuum & autovacuum**: PostgreSQL needs background cleanup to manage its MVCC storage efficiently.

  - Constraints: `PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, and `NOT NULL`, and `NULLS NOT DISTINCT` enforce data integrity.
  - Joins: `INNER`, `LEFT`, `RIGHT`, `FULL OUTER`, `CROSS`.

- What is a relational database?
- What is a table, row, column, schema, database?
- What are primary keys and foreign keys?
- What is a composite primary key?
- What is a unique constraint?
- What is a `NOT NULL` constraint?
- What is a `CHECK` constraint?
- What are `NULL` values and how do they behave?
- What are PostgreSQL's common data types?

  - `INTEGER`
  - `BIGINT`
  - `NUMERIC`
  - `TEXT`
  - `VARCHAR`
  - `BOOLEAN`
  - `DATE`
  - `TIMESTAMP`
  - `TIMESTAMPTZ`
  - `UUID`
  - `JSON/JSONB`
  - arrays

* `TEXT` vs `VARCHAR`
* `TIMESTAMP` vs `TIMESTAMPTZ`
* `SERIAL` vs `IDENTITY`
* UUID vs auto-incrementing IDs

## 2. SQL — **very important**

Be able to write these without much thought:

- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- `WHERE`
- `ORDER BY`
- `LIMIT/OFFSET`
- `GROUP BY`
- `HAVING`
- `DISTINCT`
- `CASE`
- `COALESCE`
- `IN`
- `BETWEEN`
- `LIKE` / `ILIKE`
- `IS NULL`
- `EXISTS`

Typical interview questions:

- Find duplicate records.
- Find the second-highest salary.
- Find users who haven't placed an order.
- Find the top 5 customers by total spending.
- Find the most recent record for each user.
- Count records grouped by some property.
- Find records that exist in one table but not another.
- Calculate averages/sums/counts grouped by different dimensions.

## 3. JOINs — **extremely common**

Know these cold:

- `INNER JOIN`
- `LEFT JOIN`
- `RIGHT JOIN`
- `FULL OUTER JOIN`
- `CROSS JOIN`
- Self joins

Questions:

- What's the difference between `INNER JOIN` and `LEFT JOIN`?
- When would you use a `LEFT JOIN`?
- What's the difference between putting a condition in `ON` vs `WHERE`?
- How do you join 3–5 tables?
- How do you find rows with no corresponding record?
- What happens when joining tables with duplicate matching rows?

You should be able to look at a schema and immediately construct the necessary joins.

---

## 4. Aggregations & advanced SQL

Prepare:

- `COUNT`
- `SUM`
- `AVG`
- `MIN`
- `MAX`
- `GROUP BY`
- `HAVING`
- Aggregate functions + joins

Then move into:

- Subqueries
- Correlated subqueries
- CTEs (`WITH`)
- Recursive CTEs
- Window functions

  - `ROW_NUMBER()`
  - `RANK()`
  - `DENSE_RANK()`
  - `LAG()`
  - `LEAD()`
  - `PARTITION BY`

- `UNION` vs `UNION ALL`

Very common question:

> "What's the difference between `GROUP BY` and window functions?"

And:

> "How would you get the top N records per group?"

---

## 5. Database design

This is **very important for backend/fullstack interviews**.

Prepare:

- Normalization
- Denormalization
- 1-to-1 relationships
- 1-to-many relationships
- Many-to-many relationships
- Junction tables
- Foreign keys
- Cascading deletes
- Referential integrity
- Constraints
- Database schemas

Questions they'll ask:

- How would you design a database for an e-commerce application?
- Design a schema for users/orders/products.
- How would you model users having multiple roles?
- How would you model posts and tags?
- How would you model a chat application?
- When would you normalize vs denormalize?
- Should this relationship be represented with a join table?
- Where should this constraint live — application or database?

Be prepared to **draw a schema on a whiteboard**.

---

## 6. Indexes — **HIGH PRIORITY**

You should definitely restudy this.

Know:

- What is an index?
- Why do indexes make reads faster?
- Why can indexes make writes slower?
- B-tree indexes
- Hash indexes
- Composite/multi-column indexes
- Unique indexes
- Partial indexes
- Expression indexes
- Covering indexes / `INCLUDE`
- Index selectivity
- Index ordering

Questions:

> Why isn't PostgreSQL using my index?

> What columns would you index?

> Would you index every column?

> Given this query, what index would you create?

For example:

```sql
SELECT *
FROM orders
WHERE user_id = 123
ORDER BY created_at DESC;
```

They may expect you to reason about something like:

```sql
(user_id, created_at)
```

rather than blindly adding individual indexes.

---

## 7. Query performance

Know how to investigate a slow query.

Prepare:

- `EXPLAIN`
- `EXPLAIN ANALYZE`
- Sequential scans
- Index scans
- Bitmap scans
- Query planner
- Cardinality / statistics
- Cost estimates
- Sorting
- Hash joins
- Nested-loop joins
- Query optimization
- N+1 queries

Questions:

> "This endpoint suddenly takes 3 seconds. How do you investigate?"
>
> "How do you determine whether an index is being used?"
>
> "What's an N+1 query problem?"
>
> "When can an index actually make a query slower?"

You don't necessarily need to memorize every execution-plan detail, but you should understand how to **read one and reason about it**.

---

## 8. Transactions — **HIGH PRIORITY**

Know:

- What is a transaction?
- `BEGIN`
- `COMMIT`
- `ROLLBACK`
- Atomicity
- ACID
- Savepoints
- Transaction boundaries

Classic question:

> "You're transferring €100 from account A to account B. How do you make sure you don't deduct the money without adding it to the other account?"

Answer should involve a transaction.

Also understand:

- What happens when a transaction fails?
- What should/shouldn't happen inside a transaction?
- Why shouldn't transactions be unnecessarily long?

---

## 9. Concurrency & locking — **very common backend topic**

Prepare:

- Race conditions
- Row-level locks
- Table locks
- `SELECT ... FOR UPDATE`
- Deadlocks
- Optimistic locking
- Pessimistic locking
- Concurrent updates
- Isolation levels

Questions:

> "Two users try to purchase the last available item at exactly the same time. How do you prevent both from buying it?"
>
> "What is a race condition?"
>
> "What is a deadlock?"
>
> "What does `SELECT FOR UPDATE` do?"

---

## 10. Transaction isolation

Know the four standard isolation levels:

- Read Uncommitted
- Read Committed
- Repeatable Read
- Serializable

And understand:

- Dirty reads
- Non-repeatable reads
- Phantom reads
- Serialization failures

For a typical backend interview, **conceptual understanding is more important than memorizing textbook definitions**.

---

## 11. PostgreSQL-specific features

Worth preparing:

- `JSONB`
- PostgreSQL arrays
- UUIDs
- `RETURNING`
- `ON CONFLICT`
- `UPSERT`
- `ILIKE`
- `GENERATED` columns
- Views
- Materialized views
- Stored procedures/functions
- Triggers
- Extensions
- Full-text search
- `LISTEN/NOTIFY`

Particularly:

```sql
INSERT ... ON CONFLICT ...
```

and:

```sql
UPDATE ...
RETURNING ...
```

These come up a lot in real backend code.

---

## 12. JSON / JSONB — important for modern backend work

Know:

- `JSON` vs `JSONB`
- Why `JSONB` is generally preferred for querying
- JSON operators
- Indexing JSONB
- When JSONB is appropriate
- When JSONB is a bad substitute for proper relational modeling

Interview question:

> "Would you store this data in a JSONB column or create another table?"

You should be able to explain the tradeoffs rather than saying one is always better.

---

## 13. Pagination

Very common in backend interviews.

Know:

### Offset pagination

```sql
LIMIT 20 OFFSET 1000
```

### Cursor/keyset pagination

Using something like:

```sql
WHERE id > :last_id
ORDER BY id
LIMIT 20
```

Questions:

- What's wrong with large `OFFSET`s?
- When would you use cursor pagination?
- How would you paginate millions of records?
- How do you ensure stable ordering?

---

## 14. Database migrations

Prepare:

- What is a migration?
- Why use migrations?
- Schema versioning
- Rollbacks
- Migration ordering
- Adding/removing columns safely
- Zero-downtime migrations
- Backward-compatible schema changes

Backend question:

> "How would you rename a column in a production database with 500 million rows without taking the application offline?"

That's testing whether you understand **production database changes**, not just SQL syntax.

---

## 15. Connection management

Especially important for backend roles.

Know:

- Database connections
- Connection pools
- Why connection pooling exists
- Maximum connections
- Connection exhaustion
- PgBouncer
- Long-running connections
- Transactions and connection pools

Questions:

> "What happens if your application opens 10,000 database connections?"
>
> "Why do we use a connection pool?"

---

## 16. ORM knowledge

If you're using something like Prisma, TypeORM, Sequelize, Hibernate, SQLAlchemy, Django ORM, etc., expect questions around:

- ORM vs raw SQL
- N+1 queries
- Eager loading
- Lazy loading
- Transactions
- Relations
- Generated queries
- Query performance
- When to bypass the ORM
- Migrations

Very good interview question:

> "Why can an ORM query be unexpectedly slow even though the code looks simple?"

---

## 17. Security

Prepare:

- SQL injection
- Parameterized queries
- Prepared statements
- Least privilege
- Database users/roles
- Permissions
- Encryption
- Secrets management

Know why this is dangerous:

```sql
"SELECT * FROM users WHERE email = '" + email + "'"
```

and why parameterized queries are safer.

---

## 18. Production / DevOps PostgreSQL

For a stronger backend role, prepare:

- Backups
- Point-in-time recovery
- Replication
- Read replicas
- Failover
- High availability
- Database monitoring
- Connection monitoring
- Disk usage
- Slow query monitoring
- Vacuum
- Autovacuum
- `ANALYZE`
- `VACUUM`
- `VACUUM FULL`
- Bloat

Questions:

> "What happens if PostgreSQL crashes?"
>
> "How would you back up a production database?"
>
> "What's a read replica?"
>
> "Can you write to a read replica?"
>
> "What does VACUUM do?"

---

## 19. PostgreSQL internals — bonus

Depending on seniority:

- MVCC
- WAL (Write-Ahead Logging)
- Autovacuum
- Dead tuples
- Table/index bloat
- Checkpoints
- Shared buffers
- Query planner
- Statistics
- Replication

For junior/mid-level positions, don't spend your entire preparation time here. For senior backend positions, **definitely know these concepts**.

---

## 20. System-design questions involving PostgreSQL

These are particularly relevant for backend/fullstack interviews.

Be ready for:

- Design an e-commerce database.
- Design a social-media database.
- Design a URL shortener.
- Design a booking system.
- Design a payment system.
- Design a messaging system.
- Design an analytics system.
- Design a notification system.
- Design a multi-tenant SaaS database.
- Design an inventory system.

And questions like:

> "Postgres is getting 50k requests/second. What do you do?"
>
> "The database is the bottleneck. How do you scale?"
>
> "Would you add Redis?"
>
> "Would you add read replicas?"
>
> "Would you partition the table?"
>
> "When would PostgreSQL stop being the right tool?"

---

## 🔥 If you have limited time, prioritize these

I'd rank your preparation:

**Tier 1 — absolutely know**

1. `SELECT` / filtering / aggregation
2. JOINs
3. Primary/foreign keys
4. Database relationships
5. Transactions + ACID
6. Indexes
7. `EXPLAIN ANALYZE`
8. Constraints
9. Schema design
10. SQL injection / parameterized queries

**Tier 2 — very likely**

1. CTEs
2. Window functions
3. `NULL` behavior
4. `ON CONFLICT` / upserts
5. Pagination
6. N+1 queries
7. Connection pooling
8. Isolation levels
9. Locks / race conditions
10. JSONB

**Tier 3 — stronger backend/senior interviews**

1. MVCC
2. Vacuum/autovacuum
3. WAL
4. Replication/read replicas
5. Partitioning
6. Database sharding
7. High availability/failover
8. Zero-downtime migrations
9. Query planner internals
10. Database scaling/system design

### The questions I'd personally expect them to ask

If I were interviewing you for a backend/fullstack role, I'd probably hit you with questions like:

- **"Design a schema for an e-commerce application."**
- **"What's the difference between `LEFT JOIN` and `INNER JOIN`?"**
- **"What is an index and when would you create one?"**
- **"Why might PostgreSQL not use your index?"**
- **"How would you debug a slow query?"**
- **"Explain `EXPLAIN ANALYZE`."**
- **"Explain transactions and ACID."**
- **"How do you prevent two users from purchasing the same last item?"**
- **"What's a race condition in a database?"**
- **"What does `SELECT FOR UPDATE` do?"**
- **"What's the difference between `READ COMMITTED` and `SERIALIZABLE`?"**
- **"What's an N+1 query?"**
- **"How would you paginate 10 million records?"**
- **"When would you use JSONB instead of another table?"**
- **"How would you optimize this query?"**
- **"How does connection pooling work?"**
- **"How would you safely change a production database schema?"**
- **"How would you scale PostgreSQL?"**
- **"What's the difference between replication and sharding?"**
- **"Tell me about a time you had a database performance/consistency problem and how you solved it."**

If you can confidently answer those **20 questions and actually write the SQL**, you're in a pretty solid place for a typical fullstack/backend interview.
