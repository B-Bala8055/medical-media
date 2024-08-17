import React from 'react'
import { logout, oAuthLogin } from '@/utils/actions/auth'
import { auth } from '@/utils/authentication/auth'

const Navigation = async () => {
    const session = await auth()

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{
            backgroundColor: "#dddddd"
        }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MedicalMedia</a>
                {session?.user ? (
                    <><button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="/discussion">Discussions & Activity</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/create-discussion">Start new Discussion</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/community">Community</a>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        More
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <form action={logout}>
                                                <button className="dropdown-item" type='submit'>Logout</button>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Disabled</a>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Find Topics..." aria-label="Search" />
                                <button className="btn btn-outline-secondary" type="submit">Search</button>
                            </form>
                        </div>
                    </>)
                    : (
                        <form className="d-flex" action={oAuthLogin} >
                            <button className="btn btn-outline-success" type="submit" name="action" value="google">Sign In</button>
                        </form>
                    )
                }
            </div>
        </nav >
    )
}

export default Navigation