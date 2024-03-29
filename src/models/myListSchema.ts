import mongoose, { Schema, Document } from 'mongoose';
import { IMovie, movieSchema } from './movieSchema';
import { ITVShow, tvShowSchema } from './tvShowSchema';

interface IMyList extends Document {
  user: string; // Assuming user ID is a string
  movies: IMovie[];
  tvShows: ITVShow[];
}

const myListSchema: Schema = new Schema({
  user: { type: String, required: true },
  movies: [{ type: movieSchema, required: true }],
  tvShows: [{ type: tvShowSchema, required: true }]
});

const MyList = mongoose.model<IMyList>('MyList', myListSchema);

export { MyList,IMyList };
