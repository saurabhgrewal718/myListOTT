// index.ts
import express from 'express';
import mongoose from 'mongoose';

// Import routes and other necessary modules
import myListRoutes from './src/routes/myListRoutes';

// Create an Express application
const app = express();

// Define the port for the server
const PORT = process.env.PORT || 3000;

//connection with DB, can be done in an extrnal file too
const MONGODB_URI = 'mongodb+srv://saurabhgrewal718:B8fDZwNYWcgQUkCe@mylistott.yv4jiph.mongodb.net/stageOTT';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Yes, Connected to MongoDB');
});


app.use(express.json());
app.use('/api', myListRoutes);

app.listen(PORT, async () => {  
    console.log(`Server is running on port ${PORT}`);
});

export {app}
