"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const projectRepository_1 = require("../repositories/projectRepository");
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
    const projectData = {
        title: 'Novo Título',
        description: 'Nova Descrição',
        thumbnail: 'nova-thumbnail.png',
        url: 'https://novo-url.com'
    };
    beforeEach(() => {
        jest.clearAllMocks(); // Limpa todas as simulações antes de cada teste
    });
    it('deve retornar um projeto atualizado quando a atualização for bem-sucedida', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const updatedProject = Object.assign({ id: 1 }, projectData);
        mockQuery.mockResolvedValueOnce({ rows: [updatedProject] });
        // Act
        const result = yield (0, projectRepository_1.updateProjectById)(projectId, projectData);
        // Assert
        expect(result).toEqual(updatedProject);
        expect(mockQuery).toHaveBeenCalledTimes(1);
    }));
    it('deve retornar null quando o projeto não for encontrado', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        mockQuery.mockResolvedValueOnce({ rows: [] });
        // Act
        const result = yield (0, projectRepository_1.updateProjectById)(projectId, projectData);
        // Assert
        expect(result).toBeNull();
        expect(mockQuery).toHaveBeenCalledTimes(1);
    }));
    it('deve lançar um erro se ocorrer um erro durante a consulta', () => __awaiter(void 0, void 0, void 0, function* () {
        // Arrange
        const errorMessage = 'Erro no banco de dados';
        mockQuery.mockRejectedValueOnce(new Error(errorMessage));
        // Act & Assert
        yield expect((0, projectRepository_1.updateProjectById)(projectId, projectData)).rejects.toThrow(errorMessage);
        expect(mockQuery).toHaveBeenCalledTimes(1);
    }));
});
//# sourceMappingURL=updateProject.tsst.js.map