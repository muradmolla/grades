import { Form } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import type { AvatarType } from "~/models/user.server";

import styles from "~/styles/nav/userdropdown.css";
type Props = {
    avatar: AvatarType;
}

export const userDropdownLinks: LinksFunction = () => [
{ rel: "stylesheet", href: styles}
]

export default function UserDropdown({ avatar }: Props) {
    console.log(avatar);
    return (
        <div className="userDropdown bg-white rounded-full p-1">
            <img src={avatar} width="30" height="30" alt="User Avatar"/>
            <ul className="py-1 px-2 min-w shadow right-1 bottom-[-100%] bg-gray-200">
                <li>
                    <Form action="/logout" method="post">
                        <button type="submit" id="__logout_button">Logout</button>
                    </Form>
                    
                </li>
            </ul>
        </div>
    );
}