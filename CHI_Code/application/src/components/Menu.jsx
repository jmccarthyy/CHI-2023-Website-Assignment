/**
 * Main menu
 * 
 * This will be the main navigation component in 
 * the app, with links to all main pages
 * 
 * @author Jake McCarthy 
 */

import { Link } from 'react-router-dom';
import SignIn from './SignIn';
import { useState } from 'react';

function Menu() {
    const [signedIn, setSignedIn] = useState(false)
    return (
        <nav className="bg-blue-500 p-4 flex flex-row gap-2 w-full justify-between">
            <ul className="flex space-x-4 flex-wrap content-center">
                <li>
                <Link to="/" className="text-white hover:underline">
                    Home
                </Link>
                </li>
                <li>
                <Link to="/countries" className="text-white hover:underline">
                    Countries
                </Link>
                </li>
                <li>
                <Link to="/content" className="text-white hover:underline">
                    Content
                </Link>
                </li>
            </ul>
            <SignIn signedIn={signedIn} setSignedIn={setSignedIn} />
        </nav>
    )
}
 
export default Menu;