const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const PORT = 8000
const mongoose = require('mongoose')
app.use(cors())
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json());

const mongoURI = 'mongodb+srv://princefaizan800_db_user:PBEzwQQlFODkS17M@cluster0.1qm7qdt.mongodb.net/';
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB Connected');
}).catch(err => {
    console.log('MongoDB Connection Error: ', err);
});

const notes = require('./models/notes')

app.get('/api/notes', async (req, res) => {
    try {
        const data = await notes.find({}, 'title content')
        console.log('data', data);

        res.status(201).json({ status: 'success', data: [...data] })
    } catch (err) {
        console.log('err', err);

    }

})
app.get('/api/notes/:id', async (req, res) => {
    try {
        const notesId = req.params.id;
        console.log('id', notesId);

        const notes = await notes.findById(notesId);

        if (!notes) {

            return res.status(404).json({ error: 'Notes not found' });
        }


        res.status(200).json(notes);
    } catch (error) {

        res.status(500).json({ error: 'Internal server error' });
    }
})
app.post('/api/notes', async (req, res) => {
    try {

        const { title, content } = req.body;


        // Create a new user
        const request = new notes({ title, content });
        await request.save();
        res.status(201).json({ message: 'Created successfully', request });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})
app.patch('/api/notes/:id', (req, res) => {

})
app.delete('/api/notes/:id', async (req, res) => {
    const notesId = req.params.id;

    try {
        const deleteNotes = await notes.findByIdAndDelete(notesId);

        if (!deleteNotes) {
            return res.status(404).json({ error: 'Note not found' });
        }

        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

app.listen(PORT, () => console.log('server started')
)