import { useState } from "react";
import loginImg from "../../assets/images/loginLogo.png";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import toast from "react-hot-toast";
import Button from "../../components/Shared/Button";
import { CgSpinner } from "react-icons/cg";

const SignIn = () => {
  // const { isLoading } = useLoginMutation();
  // const credentials = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const [login] = useLoginMutation();
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    // try {
    //   const res = await login(data).unwrap();

    //   const { access, refresh } = res;
    //   // Dispatch userLoggedIn to update Redux state
    //   dispatch(
    //     setCredentials({
    //       access: access,
    //       refresh: refresh,
    //     })
    //   );
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   return;
    // }
    toast.success("Login successful!");
    setEmail("");
    setPassword("");
    console.log("go to home");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex font-nunito">
      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-1 items-center justify-center p-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl font-semibold text-primary text-center mb-8">
              Login
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Mail className="h-5 w-5 text-black" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none relative block w-full px-10 py-3 bg-gray placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10"
                  placeholder="Username or Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                  <Lock className="h-5 w-5 text-black" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="appearance-none relative block w-full px-10 py-3 bg-gray placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 focus:z-10 pr-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-black" />
                    ) : (
                      <Eye className="h-5 w-5 text-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button type="submit">
                {isLoading ? (
                  <>
                    <CgSpinner className="animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  "Login Now"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0E4269] via-[#00B5CA] to-[#FECB2C]">
        <img
          src={loginImg}
          alt="A1c Boost"
          className="mx-auto w-[600px] h-[600px] my-auto"
        />
      </div>
    </div>
  );
};

export default SignIn;
