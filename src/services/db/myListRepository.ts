import { MyList,IMyList } from '../../models/myListSchema';
import { IMovie, Movie } from '../../models/movieSchema';
import { ITVShow,TVShow } from '../../models/tvShowSchema';
import { User } from '../../models/userSchema';
import mongoose from 'mongoose';


class MyListRepository {

  //common fucntion
  async findList(userId:string){
    try {
      const myList = await MyList.findOne({ user: userId });
      return myList;
    } catch (error) {
      throw new Error("Something went wrong")
    }
    
  }

  async getMyListByUserId(userId: string): Promise<IMyList | null> {
    try {
      return await this.findList(userId);
    } catch (error) {
      throw new Error('Error fetching MyList details');
    }
  }

  async addMovieToMyList(userId: string, movieId: IMovie['id']): Promise<IMyList | null> {
    try {
      
      const movie = await Movie.findOne({id:movieId});
      if(!movie){
        throw new Error(`Cannot find Movie with id : {movieId}`);
      }
     let myList = await this.findList(userId);

      if (!myList) {
        myList = new MyList({
          user: userId,
          movies : [movie]
        });
      }else {
        //If the MyList document exists, check if the movie is already present
        console.log("myList",myList)
        const isMoviePresent = myList.movies.some(mymovie => mymovie.id === movie.id);
        if (!isMoviePresent) {
          // If the movie is not already present, add it to the list
          myList.movies.push(movie);
        }else{
          // otherwise throw an error, cannot add to list
          throw new Error("Movie Already In Your List")
        }
      }
      // Save the updated MyList document
      return await myList.save();
    } catch (error) {
       console.log(error)
       throw new Error('Error adding movie to MyList');
    }
  }
  
  // Add a TV show to the user's MyList - can be made into a common function too as there will be code redeudancy
  async addTVShowToMyList(userId: string, tvShow: ITVShow['id']): Promise<IMyList | null> {
    try {
      const myTvShow = await TVShow.findOne({id:tvShow});
      console.log("MyTV ",myTvShow)
      if(!myTvShow){
        throw new Error(`Cannot find myTvShow with id : {tvShow}`);
      }

      let myList = await this.findList(userId);
      if (!myList) {
        myList = new MyList({
          user: userId,
          tvShows : [myTvShow]
        });
      }else {
        //If the MyList document exists, check if the movie is already present
        const istvShowPresent = myList.tvShows.some(mytv => mytv.id === myTvShow.id);
        if (!istvShowPresent) {
          myList.tvShows.push(myTvShow);
        }else{
          throw new Error("TV show Already In Your List")
        }
      }
  
      // Save the updated MyList document
      return await myList.save();
    } catch (error) {
      console.log(error)
      throw new Error('Error adding TV show to MyList');
    }
  }
  
  // Remove a movie from the user's MyList
  async  removeMovieFromMyList(userId: string, movieId: IMovie['id']): Promise<IMyList | null> {
    try {
      // Find the user's MyList document
      let myList = await this.findList(userId);

      if(!myList){
        throw new Error("Cannot remove from Empty list")
      }

      // If the MyList document exists, remove the movie from the movies array
      if (myList) {
        myList.movies = myList.movies.filter(mymovie => mymovie.id !== movieId);
        // Save the updated MyList document
        return await myList.save();
      }
      return null; // If MyList document doesn't exist
    } catch (error) {
      throw new Error('Error removing movie from MyList');
    }
  }

// Remove a TV show from the user's MyList
  async removeTVShowFromMyList(userId: string, tvShowId: ITVShow['id']): Promise<IMyList | null> {
    try {
      // Find the user's MyList document
      let myList = await this.findList(userId);

      if(!myList){
        throw new Error("Cannot remove from Empty list")
      }

      // If the MyList document exists, remove the movie from the movies array
      if (myList) {
        myList.tvShows = myList.tvShows.filter(mytv => mytv.id !== tvShowId);
        // Save the updated MyList document
        return await myList.save();
      }
      return null; // If MyList document doesn't exist
    } catch (error) {
      throw new Error('Error removing tvShows from MyList');
    }
  }
}

export {MyListRepository};
