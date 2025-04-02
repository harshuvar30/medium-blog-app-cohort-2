import { SignUpInput } from "@noob_coder/medium-common";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface labledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
const LabledInputBox = ({
  label,
  placeholder,
  onChange,
  type,
}: labledInputType) => {
  return (
    <div>
      <label className="pt-4 block mb-2 text-sm font-medium  text-black  ">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};
const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignUpInput>({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate()

  async function sendReq(){
  try{
    const response = await axios.post(`http://127.0.0.1:8787/api/v1/${type === "signup"? "signup":"signin"}`,postInput)

   const jwt = response.data.token
   localStorage.setItem("token",jwt)
   navigate("/blogs")
  }
  catch(error){
    
  }
}
  return (
    <div className="h-screen flex justify-center flex-col">
      {/* {JSON.stringify(postInput)} */}
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="text-3xl font-extrabold">
              Create an Account
            </div>
            <div className="text-sm font-light text-slate-500">
               {type === 'signup' ?"Already have an account?":"Dont't have an account?" }
                <Link className=" pl-2 underline" to={type==="signup"?"/signin":"/signup"}>
                  {type === "signup" ?"Login" : "SignUp"}
                </Link>
            </div>
          </div>
          <div>
            {type==='signup'?<LabledInputBox
              label="Name"
              placeholder="Harshvardhan.."
              onChange={(e) => {
                setPostInput((postInput) => ({
                  ...postInput,
                  name: e.target.value,
                }));
              }}
            />:null}
            <LabledInputBox
              label="Username"
              placeholder="user@gmail.com"
              onChange={(e) => {
                setPostInput((postInput) => ({
                  ...postInput,
                  username: e.target.value,
                }));
              }}
            />
            <LabledInputBox
              label="Password"
              placeholder="Password"
              type={"password"}
              onChange={(e) => {
                setPostInput((postInput) => ({
                  ...postInput,
                  password: e.target.value,
                }));
              }}
            />
            <button onClick={sendReq} type="button" className="w-full mt-6 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              {type === 'signin'? 'Sign In':"Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth
