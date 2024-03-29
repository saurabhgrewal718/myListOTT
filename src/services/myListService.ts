// myListService.ts
import { MyListRepository } from './db/myListRepository';
import { IMovie } from '../models/movieSchema';
import { ITVShow } from '../models/tvShowSchema';
import { IMyList } from '../models/myListSchema';

export class MyListService {
  private myListRepository: MyListRepository;

  constructor() {
    this.myListRepository = new MyListRepository();
  }

  async getMyListByUserId(userId: string): Promise<IMyList | null>  {
    try {
        console.log("userId",userId)
        const data =  await this.myListRepository.getMyListByUserId(userId);
        return data;
    } catch (error) {
      throw new Error('Error retrieving user list from the database');
    }
  }

  async addItemToList(userId: string, movieId: IMovie['id'],itemType:string): Promise<void> {
    try {
      if(itemType == "movie"){
        await this.myListRepository.addMovieToMyList(userId, movieId);
      }else{
        await this.myListRepository.addTVShowToMyList(userId, movieId);
      }
      
    } catch (error) {
      throw new Error('Error adding movie to user list in the database');
    }
  }

  async removeItemFromList(userId: string, itemId: string,itemType:string): Promise<void> {
    try {
      if(itemType == "movie"){
        await this.myListRepository.removeMovieFromMyList(userId, itemId);
      }else{
        await this.myListRepository.removeTVShowFromMyList(userId, itemId);
      }
    } catch (error) {
      throw new Error('Error removing movie from user list in the database');
    }
  }

}
