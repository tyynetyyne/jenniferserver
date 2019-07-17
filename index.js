const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(bodyParser.json())
app.use(requestLogger);
app.use(cors());

let gigs = [ 
  {
      place: "Vastavirtaklubin yläkerta",
      date: "14.6.2019",
      showtime: "23:00",
      link: "",
      id: 1,
      playlist: [
        "Hieno nainen",
        "Aamudarra"
      ],
      images: [
        "https://jenniferstorage.blob.core.windows.net/gigimages/vastavirta1.jpg",
        "https://jenniferstorage.blob.core.windows.net/gigimages/vastavirta2.jpg",
        "https://jenniferstorage.blob.core.windows.net/gigimages/vastavirta3.jpg"
      ]
    },
    {
      place: "Kivenheitto",
      date: "27.9.2018",
      showtime: "23:00",
      link: "",
      id: 2,
      playlist: [
        "Hieno nainen",
        "Aamudarra"
      ],
      images: []
    },
    {
      place: "Helsinki",
      date: "1.6.2022",
      showtime: "23:00",
      link: "",
      id: 3,
      playlist: [
        "Hieno nainen",
        "Aamudarra"
      ],
      images: []
    },
    {
      place: "Tampere",
      date: "4.7.2010",
      showtime: "",
      link: "",
      id: 4,
      playlist: [],
      images: []
    },
    {
      place: "Jyväskylä",
      date: "23.6.2020",
      showtime: "",
      link: "",
      id: 5,
      playlist: [],
      images: []
    }
  ];

let  songs = [
    {
      name: "Hieno nainen",
      id: 0,
      read: true,
      lyrics: [
        {
          type: "intro",
          id: 0,
          text: "Lailalaila, lailalaila, laa (4x)"
        },
        {
          type: "verse",
          id: 1,
          text: "Hieno nainen laittaa korkkarit jalkoihin; \n on aika lähteä rientoihin. \n Hienolta hän näyttää ja tietää kyllä sen, \n jos tänään kävis flaksi ees pikkasen?"
        },
        {
          type: "bridge",
          id: 0,
          text: "Hieno nainen on hieno nainen. Hieno nainen on hieno nainen"
        },
        {
          type: "chorus",
          id: 0,
          text: "Hieno nainen sammuu puistoon sunnuntaina. \n Hieno nainen oksentaa Guccin käsilaukkuun. \n Hieno nainen kusee uuteen kesämekkoon. \n Hieno nainen eilisestä ei muista palaakaan. "
        },
        {
          type: "intro"
        },
        {
          type: "verse",
          id: 2,
          text: "Uuteen päivään astuu hän korkokengillään. Korjaussarjalla sen käynnistää. \n Tuoreelta hän näyttää, ja tietää kyllä sen, \n ja lupaa tää on kerta viimeinen."
        },
        {
          type: "bridge"
        },
        {
          type: "chorus"
        },
        {
          type: "outro",
          id: 0,
          text: "Hieno nainen sammuu...\n Hieno nainen oksentaa...\n Hieno nainen kusee...\n Hieno nainen eilisestä ei muista palaakaan. \n Hieno nainen on hieno nainen hei-ii-jee (4x)."
        }
      ]
    },
    {
      name: "Aamudarra",
      id: 1,
      read: true,
      lyrics: [
        {
          type: "verse",
          id: 1,
          text: "Lähti mopo lapasista, ihan pienestä skumppalasista. \n Se kutitti kitalakea, \n ja pian mä kutitin sitä Kakea. "
        },
        {
          type: "chorus",
          text: "Nyt katson juutuubivideoo Aamudarrassa. \n Nyt katson juutuubivideoo aamudarrassa, \n ja mietin missä vaiheessa mun käsi kävi ton jätkän haaroissa? "
        },
        {
          type: "verse",
          id: 2,
          text: "Lähti mopo lapasesta, ihan pienestä vehnäoluesta. \n Se nopeasti vei mun janon, ja pian nostatti lauluhalun."
        },
        {
          type: "chorus",
          text: "Nyt katson juutuubivideoo Aamudarrassa. \n Nyt katson juutuubivideoo aamudarrassa, \n ja mietin missä vaiheessa päätin näyttää mun tangat juuri spakaadissa?"
        },
        {
          type: "part-c",
          text: "Kun filmi katkee, joku aina taltioi. \n Jotain yrität unohtaa, nyt unohdettavaa saat? \n"
        },
        {
          type: "verse",
          id: 3,
          text: "Lähti mopo käpälistä, ihan pienestä puhaviinistä. \n Hanaviini sopi ruokaan tähän \n, nytpä voisi lähteä ulos vähän. \n"
        },
        {
          type: "chorus",
          text: "Nyt katson juutuubivideoo aamudarrassa. \n Nyt katson juutuubivideoo aamudarrassa, \n ja mietin missä vaiheessa \n ajattelin et tuos vois käydä kusella? "
        }
      ]
    }
  ];

  const generateId = () => {
    const maxId = gigs.length > 0
      ? Math.max(...gigs.map(n => n.id))
      : 0
    return maxId + 1
  }

app.get('/', (req, res) => {
  res.send('<h1>Jennifer API</h1>')
})

app.get('/gigs', (req, res) => {
  res.json(gigs)
})

app.get('/songs', (req, res) => {
  res.json(songs)
})

app.get('/gigs/:id', (request, response) => {
  const id = Number(request.params.id);
  const gig = gigs.find(gig => gig.id === id)
  if (gig) {
    response.json(gig)
  } else {
    response.status(404).end()
  }
})

app.delete('/gigs/:id', (request, response) => {
  const id = Number(request.params.id)
  gigs = gigs.filter(gig => gig.id !== id)

  response.status(204).end()
})

app.post('/gigs', (request, response) => {
  const body = request.body
  console.log(body)

  if (!body.place && !body.time) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const gig = {
    place: body.place,
    link: body.link || "",
    playlist: body.playlist || [],
    showtime: body.showtime || "",
    date: body.date,
    id: generateId()
  }

  gigs = gigs.concat(gig)

  response.json(gig)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)