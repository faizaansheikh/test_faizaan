const mongoose = require('mongoose')
const connect = mongoose.connect('mongodb+srv://princefaizan800_db_user:PBEzwQQlFODkS17M@cluster0.1qm7qdt.mongodb.net/')
connect.then(()=>console.log('connected ...')).catch(()=>console.log('error..'))