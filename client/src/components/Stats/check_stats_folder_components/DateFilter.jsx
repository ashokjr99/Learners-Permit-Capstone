const DateFilter = ({ setStartDate, setEndDate }) => {
  return (
    <div>
      <input
        className="dateFilter"
        type="date"
        onChange={(e) => setStartDate(e.target.value)}
        style={{boxShadow: "4px 4px 4px #000000"}}
        // start date for the filter that needs an onchange. when user plugs in the start date, it sets the variable for the start date and plugs it into the fetch
      ></input>
      <input
        className="dateFilter"
        type="date"
        onChange={(e) => setEndDate(e.target.value)}
        style={{boxShadow: "4px 4px 4px #000000"}}
        // when user plugs in the end date , it sets the variable for the end date and plugs it into the fetchs
      ></input>
    </div>
  );
};

export default DateFilter;
