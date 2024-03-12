/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { default: app, server } = require('../src/index');
const { default: MovieService } = require('../src/services/movie-service');
const supertest = require('supertest');
const { generateAccessToken } = require('../src/utils/access-token-generator');

describe('---- Movie Controller ----', () => {
  afterEach(() => {
    server.close();
    jest.restoreAllMocks();
  });

  it('should return success response', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ message: 'MOVIE API' });
  });

  it('should not create a movie without auth header', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'create').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const response = await supertest(app)
      .post('/api/v1/movies')
      .send(mockPayload);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('should not create a movie if token does not have admin role', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'create').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const token = generateAccessToken();
    const response = await supertest(app)
      .post('/api/v1/movies')
      .send(mockPayload)
      .set('Authorization', token);
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  it('should create a movie if token has admin role', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'create').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const token = generateAccessToken('admin');
    const response = await supertest(app)
      .post('/api/v1/movies')
      .send(mockPayload)
      .set('Authorization', token);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
      data: {
        genre: 'Tragic',
        id: 'Kjnkajsnd!@21212',
        rating: 10,
        streamingLink: 'netflix',
        title: 'Jest Movie'
      },
      success: true
    });
  });
  it('should not update a movie without auth header', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'update').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const response = await supertest(app)
      .put('/api/v1/movies/update')
      .send(mockPayload);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('should not update a movie if token does not have admin role', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'update').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const token = generateAccessToken();
    const response = await supertest(app)
      .put('/api/v1/movies/update')
      .send(mockPayload)
      .set('Authorization', token);
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  it('should update a movie if token has admin role', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'update').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const token = generateAccessToken('admin');
    const response = await supertest(app)
      .put('/api/v1/movies/update')
      .send(mockPayload)
      .set('Authorization', token);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      data: {
        genre: 'Tragic',
        id: 'Kjnkajsnd!@21212',
        rating: 10,
        streamingLink: 'netflix',
        title: 'Jest Movie'
      },
      success: true
    });
  });
  it('should not delete a movie without auth header', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'delete').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const response = await supertest(app)
      .delete('/api/v1/movies/delete')
      .send(mockPayload);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: 'No token provided' });
  });

  it('should not delete a movie if token does not have admin role', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'delete').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const token = generateAccessToken();
    const response = await supertest(app)
      .delete('/api/v1/movies/delete')
      .send(mockPayload)
      .set('Authorization', token);
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({ error: 'Unauthorized' });
  });

  it('should delete a movie if token has admin role', async () => {
    const mockPayload = {
      title: 'Jest Movie',
      genre: 'Tragic',
      rating: 10,
      streamingLink: 'netflix'
    };
    jest.spyOn(MovieService, 'delete').mockReturnValue({
      id: 'Kjnkajsnd!@21212',
      ...mockPayload
    });
    const token = generateAccessToken('admin');
    const response = await supertest(app)
      .delete('/api/v1/movies/delete')
      .send(mockPayload)
      .set('Authorization', token);
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      data: {
        genre: 'Tragic',
        id: 'Kjnkajsnd!@21212',
        rating: 10,
        streamingLink: 'netflix',
        title: 'Jest Movie'
      },
      success: true
    });
  });
  it('should list all the movies', async () => {
    const mockData = [
      {
        title: 'Jest Movie 1',
        genre: 'Tragic',
        rating: 10,
        streamingLink: 'netflix'
      },
      {
        title: 'Jest Movie 2',
        genre: 'Tragic',
        rating: 10,
        streamingLink: 'netflix'
      },
      {
        title: 'Jest Movie 3',
        genre: 'Tragic',
        rating: 10,
        streamingLink: 'netflix'
      }
    ];
    jest.spyOn(MovieService, 'findAll').mockReturnValue(mockData);
    const response = await supertest(app).get('/api/v1/movies/');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      data: mockData,
      success: true
    });
  });
  it('should search for a movie', async () => {
    const mockData = [
      {
        title: 'Jest Movie 1',
        genre: 'Tragic',
        rating: 10,
        streamingLink: 'netflix'
      },
      {
        title: 'Jest Movie 2',
        genre: 'Tragic',
        rating: 10,
        streamingLink: 'netflix'
      },
      {
        title: 'Jest Movie 3',
        genre: 'Tragic',
        rating: 10,
        streamingLink: 'netflix'
      }
    ];
    jest.spyOn(MovieService, 'search').mockReturnValue(mockData);
    const response = await supertest(app).get(
      '/api/v1/movies/search?q="genre=Tragic"'
    );
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      data: mockData,
      success: true
    });
  });
});
