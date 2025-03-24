import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import WeightListItem from "./WeightListItem";

const WeightList = () => {
  const weightHistory = useSelector((state: RootState) => state.weight.weightHistory);

  // Sort weights by date (newest first)
  const sortedWeights = [...weightHistory].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="card mx-auto max-w-[400px]">
      <h3 className="text-lg font-bold text-gray-700 mb-4">Weight History</h3>
      {sortedWeights.length > 0 ? (
        sortedWeights.map((weight) => <WeightListItem key={weight.id} weightData={weight} />)
      ) : (
        <p className="text-gray-500">No weight recorded.</p>
      )}
    </div>
  );
};

export default WeightList;
