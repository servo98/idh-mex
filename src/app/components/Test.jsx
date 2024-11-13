"use client";

const Test = () => {
  const handleClick = async () => {
    const response = await fetch("/api/idh/seed", {
      method: "POST",
    });

    const data = await response.json();

    console.log(data);
  };
  return (
    <div>
      <button onClick={handleClick}>seed</button>
    </div>
  );
};

export default Test;
