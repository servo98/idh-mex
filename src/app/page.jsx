"use client";

import Dropdowns from "./components/Dropdowns";

// import Test from "./components/Test";

import { useEffect, useState } from "react";

export default function Home() {
  const [states, setStates] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/idh");
      const { states, idhRecords } = await response.json();
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
