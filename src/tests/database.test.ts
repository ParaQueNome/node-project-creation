
import pool from '../database/database';

describe('Database Connection', () => {
  it('should connect to the database', async () => {
    try {
      const client = await pool.connect();
      expect(client).toBeDefined(); 
      client.release(); 
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
      fail('Falha ao conectar ao banco de dados'); 
    }
  });

  afterAll(async () => {
    await pool.end(); 
  });
});