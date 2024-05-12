import Image from "next/image";
import PropTypes from "prop-types";

function RecommendationCard({ type, imageSrc, name, portionOrDuration }) {
  return (
    <div className="mb-4">
      <div className="font-bold text-xl mb-2">{type}</div>
      <div className="flex w-full justify-center rounded-md bg-white drop-shadow p-6">
        <Image className="rounded-md mr-4" src={imageSrc} alt={name} width={80} height={80} priority />
        <div className="mx-2 w-1/3 text-black">
          <div className="text-md font-bold">{name}</div>
          <div className="text-sm font-regular">{portionOrDuration}</div>
        </div>
        <div className="w-1/3">
          <button className="btn btn-sm btn-success w-full my-1 text-white">Done</button>
          <button className="btn btn-sm btn-error w-full my-1 text-white">Missed</button>
        </div>
      </div>
    </div>
  );
}

RecommendationCard.propTypes = {
  type: PropTypes.oneOf(["Food", "Exercise"]).isRequired,
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  portionOrDuration: PropTypes.string.isRequired,
};

export default RecommendationCard;
