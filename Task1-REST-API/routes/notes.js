const express = require("express");
const router = express.Router();
const fs = require("fs");

const filePath = "./notes.json";

// Read notes
function readNotes() {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Write notes
function writeNotes(notes) {
    fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
}

// GET all notes
router.get("/", (req, res) => {
    const notes = readNotes();
    res.json(notes);
});

// POST new note
router.post("/", (req, res) => {
    const notes = readNotes();

    const newNote = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };

    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json({
        message: "Note Added Successfully",
        note: newNote
    });
});

// PUT update note
router.put("/:id", (req, res) => {

    let notes = readNotes();

    const id = Number(req.params.id);

    const index = notes.findIndex(note => note.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Note Not Found" });
    }

    notes[index].title = req.body.title;
    notes[index].content = req.body.content;

    writeNotes(notes);

    res.json({
        message: "Note Updated Successfully",
        note: notes[index]
    });

});

// DELETE note
router.delete("/:id", (req, res) => {

    let notes = readNotes();

    const id = Number(req.params.id);

    const filteredNotes = notes.filter(note => note.id !== id);

    if (notes.length === filteredNotes.length) {
        return res.status(404).json({ message: "Note Not Found" });
    }

    writeNotes(filteredNotes);

    res.json({
        message: "Note Deleted Successfully"
    });

});

module.exports = router;