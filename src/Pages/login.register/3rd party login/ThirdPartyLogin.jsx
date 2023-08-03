import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../../AuthProviders/AuthProvider";
import { saveUser } from "../../../api/auth";
const ThirdPartyLogin = () => {
  // context
  const { handleGoogleSignIn, setUser, handleGitHubSignIn } =
    useContext(AuthContext);
  // hooks
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    // sign in and sign up handler
    handleGoogleSignIn()
      .then((result) => {
        const loggedUser = result.user;
        saveUser(loggedUser);
        setUser(loggedUser);
        console.log(loggedUser);
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };
  const signInWithGitHub = () => {
    handleGitHubSignIn()
      .then((result) => {
        const loggedUser = result.user;
        setUser(loggedUser);
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };
  return (
    <div className="w-full">
      <button onClick={() => signInWithGoogle()} className="sign-in_ggl mb-2">
        <span className="flex items-center gap-2">
          <FaGoogle />
          Sign In with Google
        </span>
      </button>
      <button onClick={() => signInWithGitHub()} className="sign-in_apl">
        <span className="flex items-center gap-2">
          <FaGithub /> Sign In with GitHub
        </span>
      </button>
    </div>
  );
};

export default ThirdPartyLogin;
