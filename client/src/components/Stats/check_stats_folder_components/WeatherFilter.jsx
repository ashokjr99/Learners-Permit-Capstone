const WeatherFilter = ({ setWeather }) => {
  return (
    <div>
      <select
        className="dayTimeFilter"
        onChange={(e) => setWeather(e.target.value)}
        style={{boxShadow: "4px 4px 4px #000000"}}
      >
        <option>All</option>
        <option>Rainy</option>
        <option>Clear</option>
        <option>Snowy</option>
      </select>
    </div>
  );
};

export default WeatherFilter;
