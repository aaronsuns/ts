import { User, UserRequest } from './user';

describe('User Model', () => {
  it('should create a user with all properties', () => {
    const user: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
    };

    expect(user.id).toBe(1);
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('test@example.com');
  });

  it('should create a user request with all properties', () => {
    const req: UserRequest = {
      name: 'New User',
      email: 'new@example.com',
    };

    expect(req.name).toBe('New User');
    expect(req.email).toBe('new@example.com');
  });
});
