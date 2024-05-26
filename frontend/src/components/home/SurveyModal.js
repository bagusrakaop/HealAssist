import Dropdown from "./Dropdown";
import { predictCVD } from "@/services/predict.services";
import { handleSaveHealth } from "@/services/health.services";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useRef } from "react";
import { toast } from "react-hot-toast";

const SurveyModal = ({}) => {
    const router = useRouter();
    const modalRef = useRef(null);
    const username = Cookies.get("username");

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const postData = {
            DIABETE4: parseInt(formData.get("diabetes")),
            BPHIGH6: parseInt(formData.get("bloodPressure")),
            GENHLTH: parseInt(formData.get("generalHealth")),
            MENTHLTH: parseInt(formData.get("mentalHealthDays")),
            CHECKUP1: parseInt(formData.get("checkup")),
            EXERANY2: parseInt(formData.get("exercise")),
            TOLDHI3: parseInt(formData.get("cholesterol")),
            _AGE80: parseInt(formData.get("age")),
            WEIGHT2: parseInt(formData.get("weight")),
            HEIGHT3: parseInt(formData.get("height")),
            SMOKE100: parseInt(formData.get("smoke")),
            USENOW3: parseInt(formData.get("tobacco")),
            ECIGNOW1: parseInt(formData.get("ecig")),
            ALCDAY5: parseInt(formData.get("alcoholDays")),
            AVEDRNK3: parseInt(formData.get("averageDrink")),
            MAXDRNKS: parseInt(formData.get("maxDrink")),
            FRUIT2: parseInt(formData.get("fruit")),
            FRUITJU2: parseInt(formData.get("fruitJuice")),
            FVGREEN1: parseInt(formData.get("greenVegetable")),
            FRENCHF1: parseInt(formData.get("friedPotato")),
            POTATOE1: parseInt(formData.get("otherPotato")),
            VEGETAB2: parseInt(formData.get("otherVegetable")),
            SEXVAR: parseInt(formData.get("sex")),
        };

        try {
            const res = await predictCVD(postData);
            console.log(res);
            console.log(res["Probability"]);
            if (res["Probability"]) {
                const saveData = {
                    diabetes: postData.DIABETE4,
                    bloodPressure: postData.BPHIGH6,
                    generalHealth: postData.GENHLTH,
                    mentalHealthDays: postData.MENTHLTH,
                    checkup: postData.CHECKUP1,
                    exercise: postData.EXERANY2,
                    cholesterol: postData.TOLDHI3,
                    age: postData._AGE80,
                    weight: postData.WEIGHT2,
                    height: postData.HEIGHT3,
                    smoke: postData.SMOKE100,
                    tobacco: postData.USENOW3,
                    ecig: postData.ECIGNOW1,
                    alcoholDays: postData.ALCDAY5,
                    averageDrink: postData.AVEDRNK3,
                    maxDrink: postData.MAXDRNKS,
                    fruit: postData.FRUIT2,
                    fruitJuice: postData.FRUITJU2,
                    greenVegetable: postData.FVGREEN1,
                    friedPotato: postData.FRENCHF1,
                    otherPotato: postData.POTATOE1,
                    otherVegetable: postData.VEGETAB2,
                    sex: postData.SEXVAR,
                    prediction: parseInt(res["Probability"] * 100),
                    userId: parseInt(Cookies.get("id")),
                };
                console.log(saveData.prediction);
                const response = await handleSaveHealth(saveData);
                if (response) {
                    toast.success("Prediction is created");
                    if (modalRef.current) {
                        modalRef.current.close();
                        window.location.reload();
                    }
                }
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <dialog ref={modalRef} id="survey" className="modal">
                <div className="modal-box max-w-fit rounded-md bg-neutral text-primary">
                    <div className="flex justify-end m-1">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost">
                                ✕
                            </button>
                        </form>
                    </div>
                    <div className="text-center font-bold text-xl pt-2">
                        Hi {username}!
                    </div>
                    <div className="text-center font-bold text-xl pb-10">
                        Answer the following questions to get the best
                        recommendations for you
                    </div>
                    <form method="dialog" onSubmit={onSubmit}>
                        <div className="text-xs flex flex-col gap-4">
                            <div className="font-bold text-2xl">
                                General Status
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-base">
                                    What is your age?
                                </p>
                                <input
                                    name="age"
                                    type="number"
                                    min={1}
                                    placeholder="In years, example: 30"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-base">
                                    About how tall are you without shoes?
                                </p>
                                <input
                                    name="height"
                                    type="number"
                                    min={1}
                                    placeholder="In centimeter, example: 170"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-base">
                                    About how much do you weigh without shoes?
                                </p>
                                <input
                                    name="weight"
                                    type="number"
                                    min={1}
                                    placeholder="In kilogram, example: 50"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-base pb-2">
                                    What was your sex at birth? Was it male or
                                    female?
                                </p>
                                <Dropdown
                                    name="sex"
                                    text={"Select one!"}
                                    items={["Female", "Male"]}
                                />
                            </div>
                            <div className="font-bold text-2xl">
                                Health Status
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-base pb-2">
                                    Would you say that in general, your health
                                    is
                                </p>
                                <Dropdown
                                    name="generalHealth"
                                    text={"Select one!"}
                                    items={[
                                        "Poor",
                                        "Fair",
                                        "Good",
                                        "Very Good",
                                        "Excellent",
                                    ]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base">
                                    Now thinking about your mental health,
                                    <br />
                                    which includes stress, depression, and
                                    problems with emotions,
                                    <br />
                                    for how many days during the past 30 days
                                    was your mental health not good?
                                    <br />
                                </p>
                                <input
                                    name="mentalHealthDays"
                                    type="number"
                                    min={0}
                                    max={30}
                                    placeholder="In days (0-30), example: 5"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    About how long has it been since you last
                                    visited a doctor for a routine checkup?
                                </p>
                                <Dropdown
                                    name="checkup"
                                    text={"Select one!"}
                                    items={[
                                        "Never",
                                        "5 or more years ago",
                                        "Within the past 5 years (2 years but less than 5 years ago)",
                                        "Within the past 2 years (1 year but less than 2 years ago)",
                                        "Within the past year (anytime less than 12 months ago)",
                                    ]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    During the past month, other than your
                                    regular job, <br />
                                    did you participate in any physical
                                    activities or exercises <br />
                                    such as running, calisthenics, golf,
                                    gardening, or walking for exercise? <br />
                                </p>
                                <Dropdown
                                    name="exercise"
                                    text={"Select one!"}
                                    items={["No", "Yes"]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Have you ever been told by a doctor, nurse,
                                    or other health professional <br />
                                    that you have high blood pressure? <br />
                                </p>
                                <Dropdown
                                    name="bloodPressure"
                                    text={"Select one!"}
                                    items={[
                                        "No",
                                        "Told borderline high or prehypertensive or elevated blood pressure",
                                        "Yes",
                                        "Yes, but female told on during pregnancy",
                                    ]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Have you ever been told by a doctor, nurse
                                    or other health professional <br />
                                    that your cholesterol is high? <br />
                                </p>
                                <Dropdown
                                    name="cholesterol"
                                    text={"Select one!"}
                                    items={["No", "Yes"]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Ever told you had diabetes?
                                </p>
                                <Dropdown
                                    name="diabetes"
                                    text={"Select one!"}
                                    items={[
                                        "No",
                                        "No, prediabetes or borderline diabetes",
                                        "Yes",
                                        "Yes, but female told on during pregnancy",
                                    ]}
                                />
                            </div>
                            <div className="font-bold text-2xl">
                                Smoke Consumption
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Have you smoked at least 100 cigarettes in
                                    your entire life?
                                </p>
                                <Dropdown
                                    name="smoke"
                                    text={"Select one!"}
                                    items={["No", "Yes"]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Do you current use chewing tobacco, snuff,
                                    or snus every day, some days, or not at all?
                                </p>
                                <Dropdown
                                    name="tobacco"
                                    text={"Select one!"}
                                    items={[
                                        "Not at all",
                                        "Never used e-cigs",
                                        "Some days",
                                        "Every day",
                                    ]}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Do you now use e-cigarettes or other
                                    electronic vaping products every day, some
                                    days or not at all?
                                </p>
                                <Dropdown
                                    name="ecig"
                                    text={"Select one!"}
                                    items={[
                                        "Not at all",
                                        "Some days",
                                        "Every day",
                                    ]}
                                />
                            </div>
                            <div className="font-bold text-2xl">
                                Alcohol Consumption
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    During the past 30 days, <br />
                                    how many days per month did you have at
                                    least one drink of any alcoholic beverage{" "}
                                    <br />
                                    such as beer, wine, a malt beverage or
                                    liquor? <br />
                                </p>
                                <input
                                    name="alcoholDays"
                                    type="number"
                                    min={0}
                                    max={30}
                                    placeholder="In days (0-30), example: 5"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    One drink is equivalent to a 12-ounce beer,
                                    a 5-ounce glass of wine, <br />
                                    or a drink with one shot of liquor. During
                                    the past 30 days, on the days when you
                                    drank, <br />
                                    about how many drinks did you drink on the
                                    average?
                                </p>
                                <input
                                    name="averageDrink"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 5"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    During the past 30 days, what is the largest
                                    number of drinks you had on any occasion?
                                </p>
                                <input
                                    name="maxDrink"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 10"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div className="font-bold text-2xl">
                                Fruit and Vegetables Consumption
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Now think about the foods you ate or drank
                                    during the past month, <br />
                                    that is, the past 30 days, including meals
                                    and snacks. <br />
                                    Not including juices, how often did you eat
                                    fruit per month? <br />
                                </p>
                                <input
                                    name="fruit"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 30"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Not including fruit-flavored drinks or fruit
                                    juices with added sugar, <br />
                                    how often did you drink 100% fruit juice
                                    such as apple or orange juice? (per month){" "}
                                    <br />
                                </p>
                                <input
                                    name="fruitJuice"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 15"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    How often did you eat a green leafy or
                                    lettuce salad, with or without other
                                    vegetables? (per month)
                                </p>
                                <input
                                    name="greenVegetable"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 7"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    How often did you eat any kind of fried
                                    potatoes, including French fries, home
                                    fries, or hash browns? (per month)
                                </p>
                                <input
                                    name="friedPotato"
                                    min={0}
                                    type="number"
                                    placeholder="Example: 15"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    How often did you eat any other kind of
                                    potatoes, or sweet potatoes, <br />
                                    such as baked, boiled, mashed potatoes, or
                                    potato salad? (per month) <br />
                                </p>
                                <input
                                    name="otherPotato"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 100"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div>
                                <p className="font-bold text-base pb-2">
                                    Not including lettuce salads and potatoes,
                                    how often did you eat other vegetables?
                                </p>
                                <input
                                    name="otherVegetable"
                                    type="number"
                                    min={0}
                                    placeholder="Example: 100"
                                    className="input input-xs input-bordered w-full max-w-xs py-4"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-sm btn-primary"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </dialog>
        </>
    );
};

export default SurveyModal;
