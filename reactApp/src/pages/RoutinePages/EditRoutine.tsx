import { useParams } from "react-router-dom";
import AuthorizeView from "../../components/AuthorizeView.tsx";

function EditRoutine() {
    const { id } = useParams();
    return (
        <AuthorizeView>
            <div>poop - {id}</div>
        </AuthorizeView>
    );
}

export default EditRoutine;
