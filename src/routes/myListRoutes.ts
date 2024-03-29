import express from 'express';
import { getMyList, addToList, removeFromList } from '../controllers/myListController';

const router = express.Router();

// Route to retrieve the user's entire list
router.get('/mylist', getMyList);

// Route to add an item to the user's list
router.post('/mylist/add', addToList);

// Route to remove an item from the user's list
router.delete('/mylist/remove/usr/:userId/item/:itemId/type/:itemType', removeFromList);


export default router;
