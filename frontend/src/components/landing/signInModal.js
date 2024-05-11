import Image from "next/image";

const SignInModal = ({ }) => {
    return (
      <>
        <button className="btn btn-sm btn-primary mr-10" onClick={()=>document.getElementById('sign_in').showModal()}>Sign In</button>       
        <dialog id="sign_in" className="modal">
          <div className="modal-box max-w-fit p-0 rounded-md bg-neutral text-primary">
            <div className='flex justify-end m-1'>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>
            </div>
            <div className="grid grid-cols-2 gap-5 mx-10">
              <div>
                <Image src="/illustration-robot-signin.svg" alt="Robot with Sign In Illustration" objectPosition="bottom" width={360} height={360} priority />
              </div>
              <div className='bg-white my-0 flex flex-col gap-1 p-4 mb-10 place-content-center'>
                <p className='text-3xl font-bold'>Login</p>
                <p className='text-xs'>Enter your username and password below</p>
                <div className='pt-4'>
                  <form>
                    <div className='text-xs flex flex-col gap-4'>
                      <div className='flex flex-col gap-1'>
                        <p className="font-bold">Email</p>
                        <input type="text" placeholder="YourEmail@domain,com" className="input input-xs input-bordered w-full max-w-xs py-4" />
                      </div>
                      <div className='flex flex-col gap-1'>
                        <p className="font-bold">Password</p>
                        <input type="text" placeholder="Password" className="input input-xs input-bordered w-full max-w-xs py-4" />
                        <p>Forgot Your Password?</p>
                      </div>
                      <div className='flex justify-end'>
                        <button className="btn btn-sm btn-primary">Sign In</button>
                      </div>
                    </div>
                  </form>
                  <p className="text-xs text-center pt-6">
                    <span>Don’t have an account? </span>
                    <span className="font-bold">Sign Up</span>
                  </p>
                </div>

              </div>
            </div>
          </div>
      </dialog>
      </>
    );
  };
  
export default SignInModal;
