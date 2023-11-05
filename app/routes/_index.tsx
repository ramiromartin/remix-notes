import type { MetaFunction, LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import homeStyles from "~/styles/home.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStyles },
];

export default function Index() {
  return (
    <main id="content">
      <h1> A better way of keeping track of your notes</h1>
      <p>Try our early beta and never loose track of your notes</p>
      <p id="cta">
        <Link to="/notes">Try now</Link>
      </p>
    </main>
  );
}
