import {updateProjectById} from '../repositories/projectRepository'
import { QueryResult } from 'pg'; 
import ProjectData from '../utils/projectInterface';

// Supondo que você tenha um pool configurado, também é necessário mockar
const mockQuery = jest.fn();

// Mock do pool.query
jest.mock('./caminho/para/seu/modulo/pool', () => ({
  pool: {
    query: mockQuery
  }
}));


describe('updateProjectById', () => {
  // Define as constantes que serão usadas nos testes
  const projectId = { id: 1 };
  const projectData: ProjectData = {
    title: 'Novo Título',
    description: 'Nova Descrição',
    thumbnail: 'nova-thumbnail.png',
    url: 'https://novo-url.com'
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Limpa todas as simulações antes de cada teste
  });

  it('deve retornar um projeto atualizado quando a atualização for bem-sucedida', async () => {
    // Arrange
    const updatedProject = { id: 1, ...projectData };
    mockQuery.mockResolvedValueOnce({ rows: [updatedProject] } as QueryResult);
    
    // Act
    const result = await updateProjectById(projectId, projectData);

    // Assert
    expect(result).toEqual(updatedProject);
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });

  it('deve retornar null quando o projeto não for encontrado', async () => {
    // Arrange
    mockQuery.mockResolvedValueOnce({ rows: [] } as unknown as QueryResult);
    
    // Act
    const result = await updateProjectById(projectId, projectData);

    // Assert
    expect(result).toBeNull();
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });

  it('deve lançar um erro se ocorrer um erro durante a consulta', async () => {
    // Arrange
    const errorMessage = 'Erro no banco de dados';
    mockQuery.mockRejectedValueOnce(new Error(errorMessage));
    
    // Act & Assert
    await expect(updateProjectById(projectId, projectData)).rejects.toThrow(errorMessage);
    expect(mockQuery).toHaveBeenCalledTimes(1);
  });
});