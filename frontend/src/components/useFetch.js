import { useEffect, useState } from "react";
import { axiosGetData } from "./axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      await axiosGetData.get(url).then((res) => setData(res.data));
    };
    getData();
  }, [url]);

  return [data];
};

export default useFetch;
