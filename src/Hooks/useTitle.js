import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `Moose -${title}`;
  }, [title]);
};

export default useTitle;
