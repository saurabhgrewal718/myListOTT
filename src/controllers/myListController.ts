import { Request, Response } from 'express';
import { MyListService } from '../services/myListService';

const myListService = new MyListService();

export async function getMyList(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.query.id as string; // Access userId from query parameters

      if(!userId || typeof userId != "string"){
        res.status(400).json({ message: 'UserId is required' });
      }

      const userList = await myListService.getMyListByUserId(userId);

      if(!userList){
        res.status(400).json({ message: 'No Favourites added Yet' });
      }

      res.status(200).json(userList);

    } catch (error) {
      console.error('Error retrieving user list:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
export async function addToList(req: Request, res: Response): Promise<void> {
  try {
    const { userId, itemId, itemType } = req.body;

    console.log("addToList ",userId, itemId, itemType)

    //validate the inputs - there's a repitation of code, but due to time constraints couldnt be fixed, a common functino can be made to solve this
    if(!userId || typeof userId != "string"){
      throw new Error("UserId is required")
    }

    if(!itemId || typeof itemId != "string"){
      throw new Error("UserId is required")
    }

    if(!itemType || typeof itemType != "string"){
      throw new Error("UserId is required")
    }

    await myListService.addItemToList(userId, itemId,itemType);
    
    res.status(201).json({ message: 'Item added to the list' });
  } catch (error) {
    console.error('Error adding item to user list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function removeFromList(req: Request, res: Response): Promise<void> {
  try {
    const userId: string = req.params.userId
    const itemId: string = req.params.itemId;
    const itemType: string = req.params.itemType;

   //validate the inputs - middle ware can be made to validate the input too, but due to time constraint doing it here only
   if(!userId || typeof userId != "string"){
      throw new Error("UserId is required")
    }

    if(!itemId || typeof itemId != "string"){
      throw new Error("itemId is required")
    }

    if(!itemType || typeof itemType != "string"){
      throw new Error("itemType is required")
    }
    
    await myListService.removeItemFromList(userId, itemId,itemType);
    
    res.json({ message: 'Item removed from the list' });
  } catch (error) {
    console.error('Error removing item from user list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
