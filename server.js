const http = require('http')

const db = [
        {
            title: 'football jokes',
            comedian: 'Mr Tee',
            year: 2008,
            id: 1
        },
        {
            title: 'doctor jokes',
            comedian: 'Dr. Chuckles',
            year: 2015,
            id: 2
        },
        {
            title: 'animal jokes',
            comedian: 'Silly Sally',
            year: 2010,
            id: 3
        },
        {
            title: 'school jokes',
            comedian: 'Professor Giggles',
            year: 2019,
            id: 4
        },
        {
            title: 'technology jokes',
            comedian: 'Byte Me',
            year: 2022,
            id: 5
        },
        {
            title: 'food jokes',
            comedian: 'Chef Chuckleberry',
            year: 2013,
            id: 6
        },
        {
            title: 'space jokes',
            comedian: 'Cosmic Clown',
            year: 2018,
            _id: 7
        },
        {
            title: 'lawyer jokes',
            comedian: 'Legal Laughs',
            year: 2011,
            id: 8
        },
        {
            title: 'music jokes',
            comedian: 'Melodic Mirth',
            year: 2016,
            id: 9
        },
        {
            title: 'science jokes',
            comedian: 'Professor Puns',
            year: 2020,
            id: 10
        }
    ]
    

const requestHandler = (req, res)=>{

        if (req.url === '/jokes' && req.method === 'POST') {
            addJokes(req, res)

        } else if (req.url === '/' && req.method === 'GET') {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.write(`Here's the list of your jokes`)
            res.end(JSON.stringify(db))

           } else if(req.url === '/jokes/2' && req.method === 'PATCH') {
            updateJokes(req, res)

        } else if (req.url === '/jokes/3' && req.method === 'DELETE') {
            delJoke(req, res)
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    
} 

const server = http.createServer(requestHandler)

    server.listen(5000, () => {
        console.log(`Server is listening on port 5000`)
    })

    const addJokes = (req, res)=>{
        let body = []
        req.on('data', chunk => {
           body += chunk.toString()
        })
        req.on('end', () => {
            const newJoke = JSON.parse(body)
            db.push(newJoke)

            const allJokes = db
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Joke added successfully', newJoke, allJokes }))
        })
    }


    const updateJokes = (req, res) => {
        const body = []
        const id = +req.url.split('/')[2]
      
        req.on("data", (chunk) => {
          body.push(chunk)
        })
      
        req.on("end", () => {
          const convertedBuffer = Buffer.concat(body).toString()
          const jsonRes = JSON.parse(convertedBuffer)
      
          const foundJoke = db.find(item => item.id === id)
      
          if (foundJoke) {
            Object.assign(foundJoke, jsonRes)
      
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Joke updated successfully', updatedJoke: foundJoke }))
          } else {
            res.writeHead(404)
            res.end('Joke not found')
          }
        })
      }

 const delJoke = (req, res) => {
     const id = +req.url.split('/')[3]
    
const jokeToDelete = db.find(joke => joke.id === id)
      if (jokeToDelete) {
          const deletedJoke = { ...jokeToDelete }
            db.splice(db.indexOf(jokeToDelete), 1)
      
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'Joke deleted successfully', deletedJoke }))
        } else {
          res.writeHead(404)
          res.end('Joke not found')
        }
      }
      