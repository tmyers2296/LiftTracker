import AuthorizeView from "../../components/AuthorizeView";
import { NavBar } from "../../components/Navigation/NavBar";

function DashboardPage() {
    return (
        <AuthorizeView>
            <NavBar />
            <div>...</div>
        </AuthorizeView>
    );
}

export default DashboardPage;
