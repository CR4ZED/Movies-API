import mongoose from 'mongoose';

export default class Movie {
  static #schema = new mongoose.Schema(
    {
      title: { type: String, required: true },
      genre: { type: String, required: true },
      rating: { type: Number, required: true },
      streamingLink: { type: String, required: true },
      createdAt: { type: mongoose.SchemaTypes.Date },
      updatedAt: { type: mongoose.SchemaTypes.Date }
    },
    {
      timestamps: true,
      autoIndex: true
    }
  );
  static #Model = mongoose.model('Movie', this.#schema);

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
    const movie = new Movie.#Model({ title, genre, rating, streamingLink });
    await movie.save();
  }

  static async findById(id: string) {
    return Movie.#Model.findById(id);
  }

  static async findAll() {
    return Movie.#Model.find();
  }

  static async search(property: string, value: string) {
    return Movie.#Model.find({ [property]: value });
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
    return Movie.#Model.findByIdAndUpdate(id, {
      title,
      genre,
      rating,
      streamingLink
    });
  }

  static async delete(id: string) {
    return Movie.#Model.findByIdAndDelete(id);
  }
}
