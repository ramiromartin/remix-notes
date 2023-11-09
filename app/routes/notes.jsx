import { redirect } from "@remix-run/node";
import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import NewNote, { links as newNoteLinks } from "~/components/NewNote";
import NoteList, { links as noteListLinks } from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";

export function links() {
  return [...newNoteLinks(), ...noteListLinks()];
}

export const meta = () => {
  return [
    { title: "All Notes | Remix" },
    { name: "description", content: "All your notes" },
  ];
};

export default function NotesPage() {
  const notes = useLoaderData();

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  // Add validation
  if (noteData.title.trim().length < 5) {
    return { message: "Invalid title, must be at least 5 characters long." };
  }
  const existingNotes = await getStoredNotes();

  noteData.id = new Date().toISOString();

  const updatedNotes = existingNotes.concat(noteData);

  await storeNotes(updatedNotes);

  // JUST TO PERFORM A FALSE DELAY IN THE BACKEND CALL
  // await new Promise((resolve, reject) =>
  //   setTimeout(() => {
  //     resolve();
  //   }, 2000)
  // );

  return redirect("/notes");
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <main className="error">
      <h1>An Error related with your notes ocurred!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to="/">safety</Link>!
      </p>
    </main>
  );
}
