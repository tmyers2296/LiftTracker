import AuthorizeView from "../../components/AuthorizationComponents/AuthorizeView";
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
