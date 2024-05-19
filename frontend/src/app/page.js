"use client";
import Image from "next/image";

import { useModal } from "@/contexts/modalContext";

export default function Home() {
  const { openSignUpModal } = useModal();

  return (
    <main className="w-full bg-white min-h-screen">
      {/* top of landing page */}
      <div className="flex h-[480px] bg-neutral text-primary items-center justify-center">
        <div className="w-1/3">
          <div className="text-xs">For a Better Quality of Life</div>
          <div className="flex text-5xl">
            <p className="font-bold">Heal</p>Assist
          </div>
          <div className="text-3xl">Present for you</div>
          <div>with the power of AI, we helps you live a healthy routine and prevents you from cardiovascular disease</div>
          <button className="btn btn-primary mt-5">Our Features</button>
        </div>
        <Image className="items-center right-0" src="/robot-1.svg" alt="Diagbostic Robot" width={480} height={480} priority />
      </div>
      {/* Cardiovascular Disease Case Information */}
      <div className="flex flex-col w-2/3 mx-auto mt-24 mb-12 bg-white text-primary justify-center items-center">
        <div className="text-3xl font-extrabold mb-10">Did you Know??</div>
        <div className="flex py-5">
          <div className="flex mx-10">
            <Image className="mr-2 -translate-y-2" src="/illustration-stroke.svg" alt="Stroke Illustration" width={72} height={72} priority />
            <div>
              <p className="font-bold text-2xl">331,349</p>
              <p className="text-xs">
                Deaths Caused <br /> by Stroke
              </p>
            </div>
          </div>
          <div className="flex mx-10">
            <Image className="mr-2" src="/illustration-coronary-heart.svg" alt="Coronary Heart Illustration" width={64} height={64} priority />
            <div>
              <p className="font-bold text-2xl">245,343</p>
              <p className="text-xs">
                Deaths Caused <br /> by Coronary Heart
              </p>
            </div>
          </div>
          <div className="flex mx-10">
            <Image className="mr-2" src="/illustration-hypertensive-heart.svg" alt="Hypertensive Heart Illustration" width={64} height={64} priority />
            <div>
              <p className="font-bold text-2xl">50,620</p>
              <p className="text-xs">
                Deaths Caused <br /> by Hypertensive Heart
              </p>
            </div>
          </div>
        </div>
        <div className="text-center my-10">
          <p className="font-bold">
            Currently, heart and blood vessel disease or cardiovascular disease is still the highest cause of death in the world. WHO states that more than 17 million people in the world die from
            heart and blood vessel disease. Meanwhile, deaths in Indonesia due to cardiovascular disease reached 651,481 people per year, consisting of stroke 331,349 deaths, coronary heart disease
            245,343 deaths, hypertensive heart disease 50,620 deaths, and other cardiovascular diseases (Institute for Health Matrics and Evaluation, 2019).{" "}
          </p>
          <br />
          <p className="text-xs">Quoted from sehatnegeriku.kemkes.go.id</p>
        </div>
      </div>
      {/* Features Preview */}
      <div className="flex flex-col w-2/3 mx-auto bg-white text-primary items-center">
        <div className="font-bold mb-12">OUR FEATURES</div>
        {/* Personalized Account */}
        <div className="w-full">
          <div className="font-extrabold text-xl text-center mb-8">Different Personal, Different Health Profile, Different Recommendations</div>
          <div className="flex justify-between">
            <div>
              <Image src="/pict-persona-1.svg" alt="Persona 1 (Sarah)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Sarah Johnson</div>
                <div className="text-sm">
                  Athlete
                  <br />
                  Female, 26 y/o
                </div>
              </div>
            </div>
            <div>
              <Image src="/pict-persona-2.svg" alt="Persona 2 (Michael)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Michael Davis</div>
                <div className="text-sm">
                  Office Worker
                  <br />
                  Male, 30 y/o
                </div>
              </div>
            </div>
            <div>
              <Image src="/pict-persona-3.svg" alt="Persona 3 (Emily)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Emily Chen</div>
                <div className="text-sm">
                  College Student
                  <br />
                  Female, 21 y/o
                </div>
              </div>
            </div>
            <div>
              <Image src="/pict-persona-4.svg" alt="Persona 4 (Sam)" width={164} height={164} priority />
              <div className="text-black">
                <div className="font-extrabold">Sam Kolder</div>
                <div className="text-sm">
                  Outdoor Worker
                  <br />
                  Male, 43 y/o
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center my-10 w-4/5 mx-auto">
            <Image src="/illustration-personalized-account.svg" alt="Personalized Account Illustration" width={192} height={192} priority />
            <div className="mx-10">
              <div className="text-xl">
                <b>Whoever you are,</b> we are ready with
              </div>
              <div className="text-3xl font-extrabold">Personalized Account</div>
              <div className="text-xl">Create an account according to your health profile and condition to get food and exercise recommendations that are suitable for you</div>
            </div>
          </div>
        </div>
        {/* Routine Recommendatuin */}
        <div className="w-full mb-10">
          <div className="font-extrabold text-xl text-center mb-8">Get the Routine Recommendations</div>
          <div className="flex flex-row justify-center">
            <div className="px-4 w-2/5">
              <div className="h-32">
                <div className="font-extrabold text-xl">Food Recommendations</div>
                <div className="font-bold text-md mb-4">Get food recommendations that you like and match your health profile</div>
              </div>
              {/* salad */}
              <div className="flex">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/food-salad.png" alt="Salad" width={164} height={164} priority />
                </div>
                <div className="mx-3 my-auto">
                  <div className="text-xl font-extrabold">Salad</div>
                  <div>
                    Sunday Morning <br />1 Portion(s)
                  </div>
                </div>
              </div>
              {/* Chicken Soup */}
              <div className="flex justify-end">
                <div className="mx-3 my-auto">
                  <div className="text-xl font-extrabold">Chicken Soup</div>
                  <div>
                    Monday Night <br />1 Portion(s)
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/food-chicken-soup.png" alt="Chicken Soup" width={164} height={164} priority />
                </div>
              </div>
              {/* Beef */}
              <div className="flex">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/food-beef.png" alt="Beef" width={164} height={164} priority />
                </div>
                <div className="mx-3 my-auto">
                  <div className="text-xl font-extrabold">Beef</div>
                  <div>
                    Tuesday <br />2 Portion(s)
                  </div>
                </div>
              </div>
            </div>
            <div className="h-10px w-[3px] bg-darkgrey rounded-full mx-4"></div>
            <div className="px-4 w-2/5">
              <div className="h-32">
                <div className="font-extrabold text-xl text-right">Exercise Recommendations</div>
                <div className="font-bold text-md mb-4 text-right">Stay healthy and fit with exercise recommendations that you like and suit your profile</div>
              </div>
              {/* jogging */}
              <div className="flex justify-end text-right">
                <div className="mx-3 my-auto">
                  <div className="text-xl font-extrabold">Jogging</div>
                  <div>
                    Every Morning <br />
                    30 Minute(s)
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/exercise-jogging.png" alt="Jogging" width={164} height={164} priority />
                </div>
              </div>
              {/* swimming */}
              <div className="flex">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/exercise-swimming.png" alt="Swimming" width={164} height={164} priority />
                </div>
                <div className="mx-3 my-auto">
                  <div className="text-xl font-extrabold">Swimming</div>
                  <div>
                    Every Sunday <br />
                    120 Minute(s)
                  </div>
                </div>
              </div>
              {/* gym */}
              <div className="flex justify-end text-right">
                <div className="mx-3 my-auto">
                  <div className="text-xl font-extrabold">Gym</div>
                  <div>
                    Tuesday, Friday <br />
                    90 Minute(s)
                  </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image src="/exercise-gym.png" alt="Gym" width={164} height={164} priority />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Automatic Scheduling & Health Adjustment */}
        <div className="flex w-3/4 relative my-10">
          <div className="relative z-10">
            <div className="font-extrabold text-4xl">Don't miss your routine!</div>
            <div className="font-bold text-md w-1/2">Keep up your healthy habits with the automatic scheduling feature.</div>
            <div className="text-midgreen my-10">
              <Image className="my-2" src="/illustration-update-health.svg" alt="Update" width={280} height={280} priority />
              <div className="font-regular text-sm">Feel that your body getting better? Or do you feel unwell instead?</div>
              <div className="font-bold text-lg w-2/3">The health update feature is here to adjust recommendations to your condition.</div>
            </div>
          </div>
          {/* ilustrasi robot */}
          <div className="absolute inset-0 z-0 flex justify-end">
            <Image src="/illustration-robot-scheduling.svg" alt="Robot with Schedule Illustration" width={360} height={360} priority />
          </div>
        </div>
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center my-10">
          <div className="font-semibold text-xl text-center mb-10">Come prevent cardiovascular disease and start living a healthy life with us.</div>
          <Image src="/navbar-logo.svg" alt="Logo" width={540} height={540} priority />
          <button onClick={() => openSignUpModal()} className="btn btn-md btn-primary my-10">Sign Up Now</button>
        </div>
      </div>
    </main>
  );
}
