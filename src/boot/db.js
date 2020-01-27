/* eslint-disable no-console */
import Vue from "vue";
import { remote } from "electron";
import Datastore from "nedb-promises";
import path from "path";

const dbFilename =
  process.env.NODE_ENV === "development"
    ? "data.db"
    : path.join(remote.app.getPath("userData"), "/data.db");

const db = new Datastore({
  filename: dbFilename,
  autoload: true,
  timestampData: true
});

console.log("TCL: dbFilename", dbFilename);

// filename: path.join(remote.app.getPath('userData'), '/data.db')
console.log("TCL: remote", remote);
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

export async function updateNote(note) {
  const { _id, ...updatedNote } = note;
  return await db.update({ _id }, updatedNote);
}

export async function getNote(id) {
  return await db.findOne({ _id: id });
}

// db.find({}, function(err, notes) {
//   console.log("TCL: notes", notes);
// });

Vue.prototype.$db = db;

Vue.prototype.$getNotes = getNotes;
Vue.prototype.$getNote = getNote;
Vue.prototype.$saveNote = saveNote;
Vue.prototype.$updateNote = updateNote;

export { db };
