import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {

  ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////
  const navigate = useNavigate()
  ///////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////////
  const [email, setEmail] = useState('');

  ///////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////////
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }


  ///////////////////////////////////////////////////////// RENDER ///////////////////////////////////////////////////////////
  return (
    <div className="flex justify-center items-center">
      <div style={{ height: 'calc(100vh - 5rem)' }} className="flex justify-center items-start pt-16 mb-14 mt-6">
        <div className="container mt-16 mb-8 mx-auto p-8 pb-4 w-[32rem] rounded-lg shadow-md border border-black">
          <h1 className="text-center font-sans font-bold text-4xl mb-12 ">Forget Password</h1>
          <form onSubmit={onSubmit} id="signin-form" className="flex flex-col gap-6" >
            <div className="form-group mb-2">
              <label htmlFor="usernameOrEmail" className="block text-lg mb-2">
                Email/Username:
              </label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Echo Sign"
                className="w-full px-4 py-2 border border-gray-300 rounded"
              />
            </div>
            <Button type="submit" className="font-bold ">Submit</Button>
          </form>
          <p className="mt-4 text-center ">
            <span onClick={() => navigate(-1)} className="underline text-muted-foreground hover:text-green cursor-pointer">
              Go back
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword