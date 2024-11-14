CREATE TABLE articles (
    article_id INT PRIMARY KEY AUTO_INCREMENT,  -- Unique identifier for each article
    title VARCHAR(255) NOT NULL,                -- Title of the article
    content TEXT NOT NULL,                       -- Body of the article
    published_at DATETIME,                       -- Date and time when the article was published
    author_id INT,                               -- References the authors table
    category_id INT,                             -- References the categories table
    source_id INT,                               -- References the sources table (optional)
    status VARCHAR(50),                          -- Article status (e.g., "published", "draft")
    FOREIGN KEY (author_id) REFERENCES authors(author_id),   -- Foreign key constraint
    FOREIGN KEY (category_id) REFERENCES categories(category_id), -- Foreign key constraint
    FOREIGN KEY (source_id) REFERENCES sources(source_id)      -- Foreign key constraint (optional)
);