const express = require('express')
const app = express()
const port = 3000

app.use('/api/customers', require('./api/routes/customers'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})