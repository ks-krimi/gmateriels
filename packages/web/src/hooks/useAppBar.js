import { useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";

function useAppBar() {
  const history = useHistory();

  const use = useRef(true);

  useEffect(() => {
    use.current = history.location.pathname === "/oops";
  }, [history.location.pathname]);

  return use.current;
}

export default useAppBar;
