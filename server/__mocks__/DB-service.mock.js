jest.mock('../src/services/DB-service.ts', () => ({
  connectDB: jest.fn()
}));
