const app = require('./app')

const PORT = require('./util/config').PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})