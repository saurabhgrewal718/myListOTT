const mongoose = require('mongoose');

export interface IUser extends Document {
  username: string;
  id: string;
  preferences: {
    favoriteGenres: string[];
    dislikedGenres: string[];
  };
  watchHistory: Array<{
    contentId: string;
    watchedOn: Date;
    rating?: number;
  }>;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  preferences: {
    favoriteGenres: [{ type: String }],
    dislikedGenres: [{ type: String }]
  },
  watchHistory: [{
    contentId: { type: String, required: true },
    watchedOn: { type: Date, default: Date.now },
    rating: { type: Number, min: 1, max: 5 }
  }]
});

const User = mongoose.model('users', userSchema);

export {User};
