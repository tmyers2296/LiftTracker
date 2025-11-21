import AuthorizeView from "../components/AuthorizeView.tsx";
import { NavBar } from "../components/Navigation/NavBar.tsx";

function Home() {
    return (
        <AuthorizeView>
            <div>
                <NavBar />
            </div>
        </AuthorizeView>
    );
}

export default Home;
