
import pool from '../database/database';

describe('Database Connection', () => {
  it('should connect to the database', async () => {
    try {
      const client = await pool.connect();
      expect(client).toBeDefined(); 
      client.release(); 
    } catch (error) {
      console.error('Connection to database failed:', error);
      fail('Connection to database failed'); 
    }
  });

  afterAll(async () => {
    await pool.end(); 
  });
});