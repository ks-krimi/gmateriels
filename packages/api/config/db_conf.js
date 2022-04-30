import mongoose from 'mongoose'
import { MONGO_URI } from './index'

mongoose.connect(
  `${MONGO_URI}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (!err) {
      console.log(
        'Le serveur est connecté à la base de données: ' +
          MONGO_URI.split('/')[3]
      )
    } else console.log('Connetion error : ' + err)
  }
)

// db.createUser({user:"krimi",pwd:passwordPrompt(), roles:["readWrite","dbAdmin"]})
