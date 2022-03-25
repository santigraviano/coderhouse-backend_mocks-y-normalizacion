export default {
  file: {
    path: './.db/file'
  },
  mongo: {
    protocol: 'mongodb',
    host: process.env.MONGO_HOST,
    user: process.env.MONGO_USER,
    pass: process.env.MONGO_PASSWORD,
    database: process.env.MONGO_DATABASE,
    params: ''
  },
  firebase: {
    credential: process.env.FIREBASE_CREDENTIAL_FILE,
    databaseURL: process.env.FIREBASE_DATABASE_URL
  }
}