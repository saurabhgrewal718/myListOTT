import mongoose, { Schema, Document } from 'mongoose';

interface IEpisode extends Document {
  episodeNumber: number;
  seasonNumber: number;
  releaseDate: Date;
  director: string;
  actors: string[];
}

export interface ITVShow extends Document {
  id:string;
  title: string;
  type: string;
  description: string;
  genres: string[];
  episodes: IEpisode[];
}

const episodeSchema: Schema = new Schema({
  episodeNumber: { type: Number, required: true },
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: Date, required: true },
  director: { type: String, required: true },
  actors: [{ type: String, required: true }]
});

const tvShowSchema: Schema = new Schema({
  id: { type: String, required: true,unieque:true },
  title: { type: String, required: true },
  type: { type: String },
  description: { type: String, required: true },
  genres: [{ type: String }],
  episodes: [episodeSchema]
});

const TVShow = mongoose.model <ITVShow>('TVShow', tvShowSchema);

export { TVShow, tvShowSchema };
