import { Link, useLoaderData, useRouteError } from "@remix-run/react";
import styles from "~/styles/note-details.css";
import { getStoredNotes } from "~/data/notes";

export const meta = ({ data }) => {
  return [
    { title: data.title },
    { name: "description", content: "Note Details Page" },
  ];
};

export default function NoteDetailsPage() {
  const note = useLoaderData();

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes">Back to all notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.content}</p>
    </main>
  );
}

export async function loader({ params }) {
  const notes = await getStoredNotes();
  const selectedNote = notes.find((note) => note.id === params.noteId);

  if (!selectedNote) {
    throw new Error("This note is not in our Database");
  }

  return selectedNote;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
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
