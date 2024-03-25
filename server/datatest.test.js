const { Pool } = require('pg');

describe('Database schema creation', () => {
  let pool;

  beforeAll(() => {
    // Set up a test database connection
    pool = new Pool({
      user: 'your_username',
      host: 'localhost',
      database: 'your_database',
      password: 'your_password',
      port: 5432, // Change port if necessary
    });
  });

  afterAll(async () => {
    // Close the database connection after all tests are done
    await pool.end();
  });

  test('Tables are created successfully', async () => {
    const client = await pool.connect();

    try {
      // Check if the recipes table exists
      let result = await client.query(`SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'recipes'
      );`);

      expect(result.rows[0].exists).toBeTruthy();

      // Check if the todos table exists
      result = await client.query(`SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'todos'
      );`);

      expect(result.rows[0].exists).toBeTruthy();

      // Check if the users table exists
      result = await client.query(`SELECT EXISTS (
        SELECT 1
        FROM   information_schema.tables 
        WHERE  table_schema = 'public'
        AND    table_name = 'users'
      );`);

      expect(result.rows[0].exists).toBeTruthy();
    } finally {
      client.release();
    }
  });
});
