import { div } from "framer-motion/client";
import loading from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <img src={loading} alt="Loading" className="loading" id="loading" />
    </div>
  );
};

export default Loading;
