'use client'

import Link from "next/link"


export default function Navbar() {
    return (
        <nav>
            <div className="nav-logo">Speak</div>
            <div className="nav-links">
                <a href="#">Features</a>
                <a href="#">Languages</a>
                <a href="#">Pricing</a>
                <a href="#">Blog</a>
            </div>
            <div className="nav-actions">
                <Link href={'/auth/login'}>
                <button className="btn-ghost" >Sign in</button>
                </Link>
                <Link href={'/auth/signup'}>
                <button className="btn-denim">Start free</button>
                </Link>
            </div>
        </nav>
    )
}