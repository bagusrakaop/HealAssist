"use client";
import Pie from "@/components/home/CircularPercentage"
import ActivityContainer from "@/components/home/UpcomingActivity"
import Card from "@/components/CardContainer"
import SurveyModal from "@/components/home/SurveyModal";

export default function Homepage() {
  return (
    <main className="w-full bg-white min-h-screen">
      <SurveyModal/>
      <div className="flex flex-col bg-neutral text-primary justify-center py-10">
        <div className="text-2xl text-center font-bold">Hello, User!</div>
        <div className="text-2xl text-center font-bold">here is your current condition</div>
        <div className="flex flex-row justify-center items-center">
          <div className="text-2xl font-medium">You have a 90% risk of having cardiovascular disease</div>
          <Pie percentage={90} color={"#FFAC52"}/>
        </div>
      </div>
      <div className="flex flex-col text-primary py-10">
        <div className="flex flex-row justify-center items-center gap-x-10">
          <button className="btn btn-sm btn-primary">Your Schedule</button>
          <button className="btn btn-sm btn-primary">Your Favorites</button>
          <button className="btn btn-sm btn-primary" onClick={()=>document.getElementById('survey').showModal()}>Update Condition</button>
        </div>
        <div className="text-2xl text-center font-bold mt-16">Today's Upcoming Activity</div>
        <ActivityContainer/>
        <div className="text-2xl text-center font-bold mt-16">Food Recommendations</div>
        <div className="flex justify-center items-center mt-8 gap-8">
          <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false}/>
          <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={true}/>
          <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false}/>
          <Card image="/food-beef.png" captions="Barbaque Beef with Tomato Sauce" filled={false}/>
        </div>
        <div className="text-2xl text-center font-bold mt-16">Exercise Recommendations</div>
        <div className="flex justify-center items-center mt-8 gap-8">
          <Card image="/exercise-swimming.png" captions="Swimming" filled={false}/>
          <Card image="/exercise-swimming.png" captions="Swimming" filled={true}/>
          <Card image="/exercise-swimming.png" captions="Swimming" filled={false}/>
          <Card image="/exercise-swimming.png" captions="Swimming" filled={true}/>
        </div>
      </div>
    </main>
  );
}
