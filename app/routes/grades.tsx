import { Outlet, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/server-runtime";
import { getUserAvatarById } from "~/models/user.server";
import { requireUser } from "~/session.server";

import type { LoaderFunction, LinksFunction } from "@remix-run/server-runtime";
import type { AvatarType } from "~/models/user.server";
import type { User } from "@prisma/client";
import UserDropdown, { userDropdownLinks } from "~/components/nav/userdropdown";

type LoaderData = {
    user: Awaited<User>,
    avatarUrl: AvatarType,
}

export const links: LinksFunction = () => {
    return [...userDropdownLinks()]
}

export const loader: LoaderFunction = async ({ request }) => {
    const user = await requireUser(request);
    const avatarUrl = await getUserAvatarById(user.id);
    return json<LoaderData>({ user, avatarUrl});
}

export default function GradesPage() {
    const { user, avatarUrl } = useLoaderData<LoaderData>();
    return (
        <>
        <header className="bg-slate-500">
            <div className="container py-2 mx-auto flex justify-between items-center px-2 sm:px-0">
                <h1 className="text-lg font-bold text-white">Grades</h1>
                <UserDropdown avatar={avatarUrl} />
            </div>

        </header>
        <main>
            <Outlet />
        </main>
        </>
    )
}