"use client";

import Dropdowns from "./components/Dropdowns";
import api from "./lib/axios";

// import Test from "./components/Test";

import { useEffect, useState } from "react";

export default function Home() {
  const [states, setStates] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await api.get("/getIDHRecords");
      const { states, idhRecords } = data;
      setStates(states);
      setData(idhRecords);
    };
    getData();
  }, []);
  return (
    <div>
      <main>
        {/* <Test /> */}
        <Dropdowns states={states} data={data} />
      </main>
      {/* TODO: make footer */}
      {/* <footer>footer</footer> */}
    </div>
  );
}
