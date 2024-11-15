"use client";

//FIXME change implementation
import { useState, useEffect } from "react";

const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState({
    state: "",
    years: [],
    sort: "",
  });

  useEffect(() => {
    // Este código solo se ejecutará en el cliente
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setQueryParams({
        state: params.get("state") || "",
        years: params.get("years") ? params.get("years").split(",") : [],
        sort: params.get("sort") || "",
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once after mount

  const updateQueryParam = (key, value) => {
    if (typeof window === "undefined") return; // Make sure we are on the client

    if (key === "years" && Array.isArray(value)) {
      value = value.join(",");
    }

    const params = new URLSearchParams(window.location.search);

    if (value === null || value === undefined || value === "") {
      params.delete(key); // Remove parameter if value is empty
    } else {
      params.set(key, value);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    setQueryParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  return [queryParams, updateQueryParam];
};

export default useQueryParams;
