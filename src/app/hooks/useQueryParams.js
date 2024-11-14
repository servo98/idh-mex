"use client";

import { useState, useEffect } from "react";

const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const entries = Array.from(params.entries());
  return entries.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};

const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState({});

  useEffect(() => {
    // check if we are on client side
    if (typeof window === "undefined") return;

    // change query state wwith current
    setQueryParams(getQueryParams());

    // event listener handler
    const handlePopState = () => {
      setQueryParams(getQueryParams());
    };

    // event listener register
    window.addEventListener("popstate", handlePopState);

    // cleanup event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // setQuery param returned
  const updateQueryParam = (key, value) => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);

    if (value === null || value === undefined) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // change url with no refresh page
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);

    // actually changeing the state
    setQueryParams(getQueryParams());
  };

  return [queryParams, updateQueryParam];
};

export default useQueryParams;
