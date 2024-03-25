CREATE TABLE "diet" (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(50),
    date VARCHAR(300)
);

CREATE TABLE "user" (
    user_email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
