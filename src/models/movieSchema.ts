import mongoose, { Schema, Document } from 'mongoose';

export interface IMovie extends Document {
  id:string;
  title: string;
  type:string;
  description: string;
  genres: string[];
  releaseDate: Date;
  director: string;
  actors: string[];
}

const movieSchema: Schema = new Schema({
  id:{ type: String, required: true,unique:true },
  title: { type: String, required: true },
  type:{type:String},
  description: { type: String, required: true },
  genres: [{ type: String }],
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }]
});

const Movie = mongoose.model <IMovie>('Movie', movieSchema);

export { Movie, movieSchema };
