import Movie from '../models/Movie';

export default class MovieService {
  static async create({
    title,
    genre,
    rating,
    streamingLink
  }: {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
  }) {
    try {
      const result = Movie.create({ title, genre, rating, streamingLink });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findOne(id: string) {
    return Movie.findById(id);
  }

  static async findAll() {
    return Movie.findAll();
  }

  static async delete(id: string) {
    return Movie.delete(id);
  }

  static async update(
    id: string,
    {
      title,
      genre,
      rating,
      streamingLink
    }: {
      title?: string;
      genre?: string;
      rating?: number;
      streamingLink?: string;
    }
  ) {
    return Movie.update(id, { title, genre, rating, streamingLink });
  }

  static async search(property: string, value: string) {
    return Movie.search(property, value);
  }
}
