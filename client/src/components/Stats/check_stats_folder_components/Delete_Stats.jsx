import React from "react";

const Delete_Stats = ({ stats, setReFetch }) => {
  const deleteStat = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/stats/delete/${stats.id}`,

        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("MyToken"),
            "Content-Type": "application/json",
          },
        }
      );

      const json = await response.json();

      setReFetch((prev) => !prev);

      console.log(json);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button onClick={() => deleteStat()}>Delete</button>
    </div>
  );
};

export default Delete_Stats;
