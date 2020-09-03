const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => (note.title === title))
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added'))
    }else{
        console.log(chalk.red('This title is already exist'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesRemoved = notes.filter ((note) => (note.title !== title))
    if(notes.length > notesRemoved.length){
        saveNotes (notesRemoved)
        console.log(chalk.green('Note removed successfully'))
    }else{
        console.log(chalk.red('This title is not exist'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    let count = 0
    console.log(chalk.blue.bold.underline('Your notes: '))
    notes.forEach((note) => {
        console.log(chalk.blue('- ') + note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)
    if (noteToRead) {
        console.log(chalk.blue.bold.underline(noteToRead.title))
        console.log(chalk.italic(noteToRead.body))
    } else {
        console.log(chalk.red('This title is not exist'))
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}