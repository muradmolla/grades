import type { User } from "@prisma/client";
import { LoaderFunction, redirect } from "@remix-run/server-runtime";
import { json } from "@remix-run/node";
import { requireUser } from "~/session.server";

import { useOptionalUser } from "~/utils";
import { Link, useLoaderData } from "@remix-run/react";

type LoaderData = {
  user: Awaited<User>;
}

export const loader : LoaderFunction = async ({request}) => {
  const user = await requireUser(request);

  return redirect('grades');
}
//Redundent default function
export default function Index() {
  const { user } = useLoaderData();
  return (
    <main className="container">
      Hello, {user?.email}
      <form action="/logout" method="post">
      <button type="submit">logout</button>
        </form> 
    </main>
  );
}
