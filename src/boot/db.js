/* eslint-disable no-console */
import Datastore from "nedb-promises";
const db = new Datastore({ filename: "data.db", autoload: true });

// db.insert(TestNote).then(note => {
//   console.log("from promise", note);
// });

// db.insert(TestNote, err => {
//   if (err) throw new Error(err);
// });

export async function getNotes() {
  return await db.find().limit(100);
}

export async function saveNote(note) {
  return await db.insert(note);
}

db.find().then(notes => {
  console.log("ALL NOTES", notes);
});
// db.find({}, function(err, notes) {
//   console.log("TCL: notes", notes);
// });

export { db };
