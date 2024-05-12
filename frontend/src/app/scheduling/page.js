import RecommendationCard from "@/components/scheduling/recommendationCard";
import Image from "next/image";

export default function SchedulingPage() {
  return (
    <main className="w-full bg-neutral min-h-screen">
      <div className="flex flex-col items-center py-10">
        <div className="flex flex-col text-primary text-md py-2">Your Schedule</div>
        {/* Month */}
        <div className="flex text-primary my-2">
          <button>
            <Image src="/arrowbutton.svg" alt="Left Arrow Button" width={12} height={12} priority />
          </button>
          <div className="text-2xl font-bold mx-8">January 2024</div>
          <button>
            <Image src="/arrowbutton.svg" alt="Right Arrow Button" width={12} height={12} style={{ transform: "scaleX(-1)" }} priority />
          </button>
        </div>
        {/* Day */}
        <div className="flex my-2">
          <button>
            <Image src="/arrowbutton.svg" alt="Left Arrow Button" width={12} height={12} priority />
          </button>
          {/* Day Tabs */}
          <div className="mx-6">
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
            <button className="btn btn-sm btn-primary w-[10vw] mx-2">Mon, 1 Jan</button>
          </div>
          <button>
            <Image src="/arrowbutton.svg" alt="Right Arrow Button" width={12} height={12} style={{ transform: "scaleX(-1)" }} priority />
          </button>
        </div>
        <div className="flex my-10 w-2/3 text-primary ">
          {/* Food Recommendation */}
          <div className="w-full h-full mx-2">
            <div className="font-bold text-xl text-center mb-4">Food Recommendation(s)</div>
            <div className="bg-white rounded-md p-4">
              <RecommendationCard type="Breakfast" imageSrc="/food-chicken-soup.png" name="Chicken Soup" portionOrDuration="1 Bowl" /> <RecommendationCard />
              <RecommendationCard />
            </div>
          </div>
          {/* Exercise Recommendation */}
          <div className="w-full h-full mx-2">
            <div className="font-bold text-xl text-center mb-4">Exercise Recommendation(s)</div>
            <div className="bg-white rounded-md p-4">
              <RecommendationCard />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
