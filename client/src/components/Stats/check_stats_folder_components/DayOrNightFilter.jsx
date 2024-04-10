const DayOrNightFilter = ({ setTime }) => {
  return (
    <div>
      <select
        className="dayTimeFilter"
        onChange={(e) => setTime(e.target.value)}
      >
        <option>All</option>
        <option>Day</option>
        <option>Night</option>
      </select>
    </div>
  );
};

export default DayOrNightFilter;
