import "./App.css";

import { Link, Redirect, Router } from "@reach/router";
import NotFound from "./views/NotFound";
import Character from "./views/Character";
import Characters from "./views/Characters";
import NewCharacter from "./views/NewCharacter";
import EditCharacter from "./views/EditCharacter";

function App() {
    return (
        <div style={{ textAlign: "left", width: "80%", margin: "0 auto", backgroundColor: "	#ADD8E6"}} >
        <header>
            <nav style={{textDecoration: "none", backgroundColor: "darkblue", height: "60px", display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <Link to="/characters" style={{textDecoration: "none", color: "white", padding: "20px", fontSize: "20px"}}>All Characters</Link> |{" "}
            <Link to="/characters/new" style={{textDecoration: "none", color: "white", padding: "20px", fontSize: "20px"}}>New Character</Link>
            </nav>
        </header>

        <Router>
            <Character path="/characters/:id" />
            <Characters path="/characters" />
            <EditCharacter path="/characters/:id/edit" />
            <NewCharacter path="/characters/new" />
            <Redirect from="/" to="/characters" noThrow="true" />
            {/* If no routes are matched, render this */}
            <NotFound default />
        </Router>
        </div>
    );
}

export default App;