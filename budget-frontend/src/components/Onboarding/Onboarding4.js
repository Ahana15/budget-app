import React from "react";
import { useHistory } from "react-router-dom";

import "../../styles/Onboarding.sass";

const Onboarding4 = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        wohooo
        <button onClick={() => history.push("/home")}>done</button>
      </div>
    </div>
  );
};

export default Onboarding4;
