const DayOrNightFilter = ({ setTime }) => {
  return (
    <div>
      <select
        className="dayTimeFilter"
        onChange={(e) => setTime(e.target.value)}
        style={{boxShadow: "4px 4px 4px #000000"}}
      >
        <option>All</option>
        <option>Day</option>
        <option>Night</option>
      </select>
    </div>
  );
};

export default DayOrNightFilter;
