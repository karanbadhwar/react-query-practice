import SingleItem from "./SingleItem";
import { useFetchTasks } from "./CustomHooks/ReactQueryHook";
const Items = () => {
  const { isLoading, isError, data } = useFetchTasks();
  if (isLoading) {
    return <h5 style={{ marginTop: "1rem" }}>Loading....</h5>;
  }

  if (isError) {
    return <h4 style={{ marginTop: "1rem" }}>There was an error..</h4>;
  }

  return (
    <div className="items">
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
