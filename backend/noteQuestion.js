const tonal = require('tonal');

class NoteQuestion{
    constructor({
        note = "",
        tone = "",
        possibleAnswers = "",
        correctAnswer = "",
        questionType = "",
    }) {
        this.note = note;
        this.tone = tone;
        this.possibleAnswers = possibleAnswers;
        this.correctAnswer = correctAnswer;
        this.questionType = questionType;
    }
    static init(type, difficulty){ 
        let note;
        let tone;
        let possibleAnswers;
        let correctAnswer;
        let questionType;
        const randomOctave = Math.floor(Math.random() * 6) + 1;
        if (type === "notes"){
            note = tonal.Note.names()[Math.floor(Math.random() * tonal.Note.names().length)];
            tone = [note + randomOctave];
            correctAnswer = note;
            questionType = "notes";

            let numPossibleAnswers;
            if (difficulty === 0){
                numPossibleAnswers = 3;
            } else if (difficulty === 1){
                numPossibleAnswers = 5;
            } else if (difficulty === 2){
                numPossibleAnswers = 7;
            }
            
            possibleAnswers = [correctAnswer];

            const allNotes = tonal.Note.names();
                while (possibleAnswers.length < numPossibleAnswers) {
                const randomIndex = Math.floor(Math.random() * allNotes.length);
                const randomNote = allNotes[randomIndex];
                if (!possibleAnswers.includes(randomNote)) { // Check for duplicates
                    possibleAnswers.push(randomNote);
                }
            } 

            // Shuffle for randomization
            possibleAnswers.sort(() => Math.random() - 0.5);
        }
        if (type === "sharps"){
            const allNotes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A","A#", "B"];

            note = allNotes[Math.floor(Math.random() * allNotes.length)];
            tone = [note + randomOctave];
            correctAnswer = note;
            questionType = "notes";

            let numPossibleAnswers;
            if (difficulty === 0){
                numPossibleAnswers = 4;
            } else if (difficulty === 1){
                numPossibleAnswers = 7;
            } else if (difficulty === 2){
                numPossibleAnswers = 12;
            }
            
            possibleAnswers = [correctAnswer];

            while (possibleAnswers.length < numPossibleAnswers) {
                const randomIndex = Math.floor(Math.random() * allNotes.length);
                const randomNote = allNotes[randomIndex];
                if (!possibleAnswers.includes(randomNote)) { // Check for duplicates
                    possibleAnswers.push(randomNote);
                }
            } 

            // Shuffle for randomization
            possibleAnswers.sort(() => Math.random() - 0.5);
        }
        if (type === "intervals"){
            const initialNote = tonal.Note.names()[Math.floor(Math.random() * tonal.Note.names().length)] + randomOctave;
            const allIntervals = tonal.Interval.names();
            const interval = allIntervals[Math.floor(Math.random() * allIntervals.length)];
            const intervalTone =  tonal.transpose(initialNote, interval);

            correctAnswer = interval;
            note = intervalTone;
            tone = [initialNote, intervalTone];
            questionType = "intervals";

            let numPossibleAnswers;
            if (difficulty === 0){
                numPossibleAnswers = 3;
            } else if (difficulty === 1){
                numPossibleAnswers = 5;
            } else if (difficulty === 2){
                numPossibleAnswers = 7;
            }
            
            possibleAnswers = [correctAnswer];

            while (possibleAnswers.length < numPossibleAnswers) {
                const randomIndex = Math.floor(Math.random() * allIntervals.length);
                const randomInterval = allIntervals[randomIndex];
                if (!possibleAnswers.includes(randomInterval)) { // Check for duplicates
                    possibleAnswers.push(randomInterval);
                }
            } 

            // Shuffle for randomization
            possibleAnswers.sort(() => Math.random() - 0.5);
        }
        
        if (type === "scales"){
            const initialNote = tonal.Note.names()[Math.floor(Math.random() * tonal.Note.names().length)] + randomOctave;
            const allScales = ["major", "minor", "dorian", "phrygian", "lydian", "mixolydian", "locrian"]
            const scale = allScales[Math.floor(Math.random() * allScales.length)];
            const scaleTone = tonal.Scale.get(`${initialNote} ${scale}`).notes; 

            correctAnswer = scale;
            note = scaleTone;
            tone = scaleTone;
            questionType = "scales";

            let numPossibleAnswers;
            if (difficulty === 0){
                numPossibleAnswers = 3;
            } else if (difficulty === 1){
                numPossibleAnswers = 5;
            } else if (difficulty === 2){
                numPossibleAnswers = 7;
            }
            
            possibleAnswers = [correctAnswer];

            while (possibleAnswers.length < numPossibleAnswers) {
                const randomIndex = Math.floor(Math.random() * allScales.length);
                const randomScale = allScales[randomIndex];
                if (!possibleAnswers.includes(randomScale)) { // Check for duplicates
                    possibleAnswers.push(randomScale);
                }
            } 

            // Shuffle for randomization
            possibleAnswers.sort(() => Math.random() - 0.5);
        }
        if (type === "chords"){
            const initialNote = tonal.Note.names()[Math.floor(Math.random() * tonal.Note.names().length)];
            
            const allChords = ["major", "minor", "augmented", "diminished", "dominant"]
            const chord = allChords[Math.floor(Math.random() * allChords.length)];
            const chordNote = tonal.Chord.get(`${initialNote} ${chord}`).notes; 
            console.log(chordNote);
            const chordTone = chordNote.map(note => note + randomOctave);
            console.log(chordTone);
            
            

            possibleAnswers = allChords;
            correctAnswer = chord;
            note = initialNote;
            tone = chordTone;
            questionType = "chords";

            let numPossibleAnswers;
            if (difficulty === 0){
                numPossibleAnswers = 3;
            } else if (difficulty === 1){
                numPossibleAnswers = 4;
            } else if (difficulty === 2){
                numPossibleAnswers = 5;
            }
            
            possibleAnswers = [correctAnswer];

            while (possibleAnswers.length < numPossibleAnswers) {
                const randomIndex = Math.floor(Math.random() * allChords.length);
                const randomChord = allChords[randomIndex];
                if (!possibleAnswers.includes(randomChord)) { // Check for duplicates
                    possibleAnswers.push(randomChord);
                }
            } 

            // Shuffle for randomization
            possibleAnswers.sort(() => Math.random() - 0.5);
        }

        return new NoteQuestion({
            note,
            tone,
            possibleAnswers,
            correctAnswer,
            questionType,
        });
    }
    getNote(){
        return this.note;
    }
    getTone(){
        return this.tone;
    }
    getPossibleAnswers(){
        return this.possibleAnswers;
    }
    getCorrectAnswer(){
        return this.correctAnswer;
    }
    getQuestionType(){
        return this.questionType;
    }
}

module.exports = NoteQuestion;