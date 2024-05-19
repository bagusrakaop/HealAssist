"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import { useModal } from '@/contexts/modalContext';

const SignUpModal = ({ onClose }) => {
  const { openSignInModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <dialog open={isVisible} className="modal modal-enter modal-enter-active ">
        <div className="modal-box max-w-fit p-0 rounded-md bg-neutral text-primary">
          <div className='flex justify-end m-0'>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">✕</button>
          </div>
          <div className="flex gap-5 mx-10 mt-0 items-center">
            <div className="container w-[750px]">
              <div className="flex w-full">
                <div className="w-1/2">
                  <Image src="/illustration-robot-signin.svg" alt="Robot with Sign In Illustration" objectPosition="bottom" width={360} height={360} priority />
                </div>
                <div className="w-1/2">
                  <div className='bg-white my-0 flex flex-col gap-1 p-4 mb-7'>
                    <div className="text-center">
                      <p className='text-md font-bold'>Getting Started With HealAssist</p>
                      <p className='text-xs'>Enter your detailed personal data below</p>
                    </div>
                    <div className='pt-1'>
                      <form>
                        <div className='text-xs flex flex-col gap-2'>
                          <div className='flex flex-col gap-1'>
                            <p className="font-bold">Name</p>
                            <input type="text" placeholder="Your Name" className="input input-xs input-bordered w-full py-4" />
                          </div>
                          <div className="grid grid-cols-5 gap-1 w-full">
                            <div className='col-span-3 gap-1 '>
                              <p className="font-bold">Email</p>
                              <input type="text" placeholder="YourEmail@domain.com" className="input input-xs input-bordered w-full py-4" />
                            </div>
                            <div className='col-span-2 gap-1 bg-blue'>
                              <p className="font-bold">Verification</p>
                              <div className="input-group">
                                <label className="input input-xs py-4 input-bordered flex items-center">
                                <input type="text" placeholder="XXXXXX" className="w-full input-xs" />
                                <button className="text-[10px]">Get Code</button>
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className='flex flex-col gap-1'>
                            <p className="font-bold">Password</p>
                            <input type="text" placeholder="Enter Your Password" className="input input-xs input-bordered w-full py-4" />
                          </div>
                          <div className='flex flex-col gap-1'>
                            <p className="font-bold">Confirm Password</p>
                            <input type="text" placeholder="Confirm Your Password" className="input input-xs input-bordered w-full py-4" />
                          </div>
                          <div className='flex justify-center mt-1'>
                            <button className="btn btn-sm btn-primary w-full">Register</button>
                          </div>
                        </div>
                      </form>
                      <div className="text-xs text-center pt-3">
                        <span>Have an account? </span>
                        <button onClick={() => { onClose(); openSignInModal(); }} className="font-bold">Sign In</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default SignUpModal;