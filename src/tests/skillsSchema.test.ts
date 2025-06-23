import skillsSchema from '../models/skills'; 
describe('skillsSchema', () => {
  it('should create a valid skills object', () => {
    const data = {
      id: 1,
      title: 'JavaScript',
      rate: 5,
    };

    const skill = skillsSchema(data);
    expect(skill).toEqual({
      id: 1,
      title: 'JavaScript',
      rate: 5,
    });
  });

  it('should handle different skill attributes', () => {
    const data = {
      id: 2,
      title: 'TypeScript',
      rate: 4,
    };

    const skill = skillsSchema(data);
    expect(skill).toEqual({
      id: 2,
      title: 'TypeScript',
      rate: 4,
    });
  });

  it('should not include additional properties', () => {
    const data = {
      id: 3,
      title: 'Python',
      rate: 3,
      extraProperty: 'This should be ignored', 
    };

    const skill = skillsSchema(data);
    expect(skill).toEqual({
      id: 3,
      title: 'Python',
      rate: 3,
    });
  });
});