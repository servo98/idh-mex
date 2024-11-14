"use client";

import { Suspense } from "react";
import Dropdowns from "./components/Dropdowns";
import api from "./lib/axios";

// import Test from "./components/Test";

import { useEffect, useState } from "react";

export default function Home() {
  const [states, setStates] = useState([]);
  const [idhRecords, setidhRecords] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await api.get("/getIDHRecords");
        const { states, idhRecords: records } = data;
        console.log("Fetched states:", states);
        setStates(states);
        setidhRecords(records);
      } catch (error) {
        console.error("un error", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <main>
        {/* <Test /> */}
        <Suspense>
          <Dropdowns states={states} idhRecords={idhRecords} />
        </Suspense>
      </main>
      {/* TODO: make footer */}
      {/* <footer>footer</footer> */}
    </div>
  );
}
