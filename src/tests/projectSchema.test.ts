
import projectSchema from '../models/projects';

describe('projectSchema', () => {
  it('should create a valid project object', () => {
    const data = {
      id: 1,
      title: 'Test Project',
      description: 'A short description',
      thumbnail: 'http://example.com/thumbnail.jpg',
      url: 'http://example.com',
    };
    const project = projectSchema(data);
    expect(project).toEqual({
      id: 1,
      title: 'Test Project',
      description: 'A short description',
      thumbnail: 'http://example.com/thumbnail.jpg',
      url: 'http://example.com',
    });
  });

  it('should handle missing description and thumbnail', () => {
      const data = {
          id: 1,
          title: 'Test Project',
          description: 'A short description',
          thumbnail: 'http://example.com/thumbnail.jpg',
          url: 'http://example.com',
        };
      const project = projectSchema(data);
      expect(project).toEqual({
          id: 1,
          title: 'Test Project',
          description: 'A short description',
          thumbnail: 'http://example.com/thumbnail.jpg',
          url: 'http://example.com',
      });
  });
});