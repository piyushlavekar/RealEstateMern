import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from .env file
dotenv.config();

// Get __filename and __dirname to use with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB using the connection string from .env
mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB!'))
.catch(error => console.error('Failed to connect to MongoDB:', error.message));

const app = express();

app.use(express.json());
app.use(cookieParser());

// Define routes for the API
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve static files from the client/dist directory
app.use(express.static(path.join(__dirname, '../client/dist')));

// For all other routes, serve the index.html file from the client build
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Ensure indexes are created using the correct method
mongoose.connection.on('connected', () => {
  mongoose.connection.db.collection('your_collection', (err, collection) => {
    if (err) {
      console.error('Error accessing collection:', err.message);
    } else {
      collection.createIndexes([{ key: { key: 1 }, unique: true }], (err, result) => {
        if (err) {
          console.error('Error creating indexes:', err.message);
        } else {
          console.log('Indexes created!');
        }
      });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});
