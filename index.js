'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { PORT, CLIENT_ORIGIN } = require('./config');
const { dbConnect } = require('./db-mongoose');

const Queue = require('./queue')

const app = express();

let catQueue = new Queue();
let dogQueue = new Queue();

catQueue.enqueue({
  imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
  imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
  name: 'Fluffy',
  sex: 'Female',
  age: 2,
  breed: 'Bengal',
  story: 'Thrown on the street'
});
catQueue.enqueue({
  imageURL: "https://static.pexels.com/photos/20787/pexels-photo.jpg",
  imageDescription: "Grey siamese cat with bright green eyes, looking up to the camera.",
  name: "Tina",
  sex: "female",
  age: 3,
  breed: "Siamese",
  story: "Abandoned by previous owner."
})
catQueue.enqueue(  {
  imageURL: "https://image.ibb.co/gEoKmd/336736_PA2_KR9_674.jpg",
  imageDescription: "cartoon black and white cat who is dabbing",
  name: "Meowington",
  sex: "female",
  age: 5,
  breed: "Black and White",
  story: "Too cool for school"
})

dogQueue.enqueue({
  imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
  imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
  name: 'Zeus',
  sex: 'Male',
  age: 3,
  breed: 'Golden Retriever',
  story: 'Owner Passed away'
})
dogQueue.enqueue({
  imageURL: "http://img.freepik.com/free-photo/husky-breed-dog-with-tongue-out_1187-1500.jpg?size=338&ext=jpg",
  imageDescription: 'A stoic husky with different colored eyes standing outside',
  name: 'June',
  sex: 'female',
  age: 1,
  breed: 'Husky',
  story: 'Rejected by mother.'
})
dogQueue.enqueue({
  imageURL: "https://image.ibb.co/cqTowd/335748_PA90_N2_32.jpg",
  imageDescription: 'A cartoon dog dabbing',
  name: 'Fido',
  sex: 'male',
  age: 2,
  breed: 'Orange',
  story: 'Too cool for school.'
})


let catArray = [
  {
    imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg', 
    imageDescription: 'Orange bengal cat with black stripes lounging on concrete.',
    name: 'Fluffy',
    sex: 'Female',
    age: 2,
    breed: 'Bengal',
    story: 'Thrown on the street'
  },
  {
    imageURL: "https://static.pexels.com/photos/20787/pexels-photo.jpg",
    imageDescription: "Grey siamese cat with bright green eyes, looking up to the camera.",
    name: "Tina",
    sex: "female",
    age: 3,
    breed: "Siamese",
    story: "Abandoned by previous owner."
  },
  {
    imageURL: "https://image.ibb.co/gEoKmd/336736_PA2_KR9_674.jpg",
    imageDescription: "cartoon black and white cat who is dabbing",
    name: "Meowington",
    sex: "female",
    age: 5,
    breed: "Black and White",
    story: "Too cool for school"
  }
]

let dogArray = [
  {
    imageURL: 'http://www.dogster.com/wp-content/uploads/2015/05/Cute%20dog%20listening%20to%20music%201_1.jpg',
    imageDescription: 'A smiling golden-brown golden retreiver listening to music.',
    name: 'Zeus',
    sex: 'Male',
    age: 3,
    breed: 'Golden Retriever',
    story: 'Owner Passed away'
  },
  {
    imageURL: "http://img.freepik.com/free-photo/husky-breed-dog-with-tongue-out_1187-1500.jpg?size=338&ext=jpg",
    imageDescription: 'A stoic husky with different colored eyes standing outside',
    name: 'June',
    sex: 'female',
    age: 1,
    breed: 'Husky',
    story: 'Rejected by mother.'
  },
  {
    imageURL: "https://image.ibb.co/cqTowd/335748_PA90_N2_32.jpg",
    imageDescription: 'A cartoon dog dabbing',
    name: 'Fido',
    sex: 'male',
    age: 2,
    breed: 'Orange',
    story: 'Too cool for school.'
  }
]


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.get('/api/cat', (req,res,next) => {
  res.json(catQueue.first.data);
});
app.get('/api/dog', (req,res,next) => {
  res.json(dogQueue.first.data);
});

app.delete('/api/cat', (req, res, next)=> {
  catQueue.dequeue();
  res.sendStatus(204);
});
app.delete('/api/dog', (req, res, next)=> {
  dogQueue.dequeue();
  res.sendStatus(204); 
});

function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
