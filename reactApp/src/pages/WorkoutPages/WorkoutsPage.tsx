import { NavBar } from "../../components/Navigation/NavBar";
import AuthorizeView from "../../components/AuthorizeView";

function WorkoutsPage() {
    return (
        <AuthorizeView>
            <div>
                <NavBar />
            </div>
        </AuthorizeView>
    );
}

export default WorkoutsPage;
