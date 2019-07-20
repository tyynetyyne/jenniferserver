const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jenniferbandi:${password}@cluster0-xn58j.mongodb.net/test?retryWrites=true&w=majority`;

  //mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true

mongoose.connect(url, { useNewUrlParser: true })

const gigSchema = new mongoose.Schema({
  date: String,
  showtime: String,
  place: String,
  playlist: Array,
  url: String,
  images: Array
})

const Gig = mongoose.model('Gig', gigSchema)

const gig = new Gig({
    date: "19.7.2022",
    showtime: "21.00",
    place: "Hartwall areena",
    playlist: [],
    url: null,
    images: []
})

// gig.save().then(response => {
//   console.log('gig saved!');
//   mongoose.connection.close();
// })

Gig.find({}).then(result => {
    result.forEach(gig => {
      console.log(gig)
    })
    mongoose.connection.close()
  })