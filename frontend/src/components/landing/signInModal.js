import Image from "next/image";
import { useEffect, useState } from "react";
import { useModal } from '@/contexts/modalContext';

const SignInModal = ({ onClose }) => {
  const { openSignUpModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

    return (
      <>
        <dialog open={isVisible} className="modal modal-enter modal-enter-active">
          <div className="modal-box max-w-fit p-0 rounded-md bg-neutral text-primary">
            <div className='flex justify-end m-1'>
            <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">✕</button>
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
                  <div className="text-xs text-center pt-6">
                    <span>Don’t have an account? </span>
                    <button onClick={() => { onClose(); openSignUpModal(); }} className="font-bold">Sign Up</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </dialog>
      </>
    );
  };
  
export default SignInModal;
