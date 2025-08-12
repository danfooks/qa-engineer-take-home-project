const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173'
}))

app.use('/api/customers', require('./api/routes/customers'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})