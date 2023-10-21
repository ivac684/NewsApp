import '@babel/register';
import express, { json } from 'express';
import { hash, compare } from 'bcrypt';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'bson';
import session from 'express-session';
const app = express();
const port = 8080;
const collectionName = "users";
const mongoURL = "mongodb://127.0.0.1:27017";
const dbName = "news_app";
app.use(json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));
app.use(session({
  secret: 'moje-tajno-ime',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
  },
}));

export const connectDB = async () => {
  try {
    const client = await MongoClient.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
};

app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
    };

    await collection.insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = await connectDB();
    const collection = db.collection(collectionName);

    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    req.session.isLoggedIn = true;

    req.session.userId = user._id;
    console.log('Session:', req.session);

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get("/api/checkLoginStatus", (req, res) => {
  try {
    console.log("checking login status");
    if (req.session.isLoggedIn) {
      res.status(200).json({ isLoggedIn: true });
    } else {
      res.status(200).json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/bookmark', async (req, res) => {
  try {
    const { bookmarks } = req.body;
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await connectDB();
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const bookmarkedTitles = bookmarks.map((bookmark) => bookmark.title);
    const isAlreadyBookmarked = user.bookmarks
      ? user.bookmarks.some((bookmark) =>
          bookmarkedTitles.includes(bookmark.title)
        )
      : false;

    const updateOperation = isAlreadyBookmarked
      ? { $pull: { bookmarks: { title: { $in: bookmarkedTitles } } } }
      : { $addToSet: { bookmarks: { $each: bookmarks } } };

    await collection.updateOne({ _id: new ObjectId(userId) }, updateOperation);

    res.status(200).json({ message: 'Bookmark toggled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});




app.get('/api/bookmarks', async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const db = await connectDB();
    const collection = db.collection(collectionName);
    const user = await collection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const bookmarks = user.bookmarks;
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/logout', (req, res) => {
  try {
    req.session.isLoggedIn = false;
    req.session.userId = null; 

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
