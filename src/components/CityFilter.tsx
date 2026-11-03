type CityFilterProps = {
  value: string;
  onChange: (city: string) => void;
  cities: string[];
};

export default function CityFilter({ value, onChange, cities }: CityFilterProps) {
  return (
    <div>
      <label htmlFor="city-filter">Cidade</label>
      <select
        id="city-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Todas as cidades</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}