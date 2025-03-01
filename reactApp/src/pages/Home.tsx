import ExerciseCard from "../components/ExerciseCard.tsx";
import LogoutLink from "../components/LogoutLink.tsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.tsx";
import { useState } from "react";

function Home() {
  const [idNum, setidNum] = useState<string>("1");
  return (
    <AuthorizeView>
      <div>
        <LogoutLink>
          Logout <AuthorizedUser value="email" />
        </LogoutLink>
      </div>
      <input
        type="text"
        value={idNum}
        onChange={(e) => setidNum(e.target.value)}
      ></input>
      <ExerciseCard id={idNum} />
    </AuthorizeView>
  );
}

export default Home;
