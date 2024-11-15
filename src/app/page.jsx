"use client";

import { Suspense } from "react";
import Main from "./components/Main";
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
        setStates(states);
        setidhRecords(records);
      } catch (error) {
        console.error("un error", error);
      }
    };
    getData();
  }, []);

  return (
    <main>
      <Suspense>
        <Main states={states} idhRecords={idhRecords} />
      </Suspense>
    </main>
  );
}
