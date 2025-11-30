import { SelectUser } from "@/db/schema/users";

export const Header = ({ user }: { user?: SelectUser | null }) => {
    return (
      <header className="header">
        <nav>
          <a className="logo" href="/">PoteSpor</a>
          <ul className="nav-links">
            <li><a href="/ny-annonse">Ny annonse</a></li>
            <li><a href="/kart">Kart</a></li>
            <li><a href="/savnet">Savnet</a></li>
            <li><a href="/funnet">Funnet</a></li>
            <li><a href="/gjenforent">Gjenforent</a></li>
          </ul>
          <ul className="user-links">
            {user ? (
              <>
                <li >
                    Hei, {user.name}
                </li>
                <li><a href="/min-side">Min side</a></li>
              </>
            ) : (
              <li><a href="/login">Logg inn</a></li>
            )}
          </ul>
        </nav>
      </header>
    )
  }