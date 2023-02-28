import { useState, useMemo, useEffect } from 'react';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import Select from 'react-select';
import { Tooltip } from 'react-tooltip';

import 'react-tooltip/dist/react-tooltip.css';
import InfoCircle from './assets/info-circle.svg'

import Sidebar from './components/Sidebar';
import MapChart from './components/Map';

// import dataSet from './data/sets/coal_consumption_per_cap.json';
import dataSets from './data/dataSets.json';

function App() {
  const [dataSet, setDataSet] = useState({});
  const [selectedDataSet, setSelectedDataSet] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [comparedCountries, setComparedCountries] = useState([]);

  const formatDataSetName = (name) => name
    .replaceAll('_', ' ')
    .replace('cap', 'capita')
    .toLowerCase()
    .split(' ')
    .map((word) => word[0]?.toUpperCase() + word?.substr(1))
    .join(' ');

  const dataSetName = useMemo(() => formatDataSetName(selectedDataSet), [selectedDataSet]);

  const dataSetYear = useMemo(() => {
    return selectedYear === 'placeholder' ? '' : `(${selectedYear})`;
  }, [selectedYear]);

  const getCountryData = (country) => {
    if(selectedYear === 'placeholder') return '';
    if(!dataSet[country?.trim()]) return 'No Data Available';

    return dataSet[country][selectedYear];
  };

  const countryData = useMemo(() => getCountryData(selectedCountry), [selectedCountry, selectedYear]);

  const yearList = useMemo(() => {
    const countryKeys = Object.keys(dataSet);
    if(countryKeys.length === 0) return [];

    return Object.keys(dataSet[countryKeys[0]]).map((year) => ({ value: year, label: year }));
  }, [dataSet]);

  // change dataSet based on selectedDataSet, dynamically import the data set
  useEffect(() => {
    if(selectedDataSet === '') return;

    const importDataSet = async () => {
      const dataSet = await import(`./data/sets/${selectedDataSet}.json`);
      setDataSet(dataSet.default);
    }

    importDataSet();

  }, [selectedDataSet]);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-white">
      <div className="flex flex-row items-center justify-center gap-4 pt-2">
        <Select placeholder="Select a data set..." options={dataSets.map((set) => ({ value: set?.name, label: formatDataSetName(set?.name) }))} onChange={(e) => {
          setSelectedDataSet(e.value);
        }} />

        <Select placeholder="Select a year..." options={yearList} onChange={(e) => {
          setSelectedYear(e.value);
        }} />

        <a 
          data-tooltip-id="info-tooltip" 
          data-tooltip-content="Quick tip! Hold down the CTRL key while clicking on a country to compare it to another country." 
          data-tooltip-place="bottom"
        >
          <img src={InfoCircle} alt="info-circle" className="w-8 h-8" />
        </a>
      </div>

      <MapChart setTooltipContent={setSelectedCountry} comparedCountries={comparedCountries} setComparedCountries={setComparedCountries} />
      <MouseTooltip
        visible={comparedCountries?.length === 0 ? selectedCountry !== "" : comparedCountries?.length > 0}
        offsetX={15}
        offsetY={10}
      >
        <div className="bg-black bg-opacity-75 text-white rounded-md p-2 flex flex-col justify-start">
          {selectedDataSet !== '' && (<span className="text-10 text-grey capitalize">{dataSetName} {dataSetYear}</span>)}
          {comparedCountries?.length === 0 ? (
            <>
              <span className="text-14">{selectedCountry}</span>
              <span className="text-14">{countryData || 'No Data Available'}</span>
            </>
          ) : (
            <>
              {comparedCountries?.map((country, i) => (
                <>
                  <span className="text-14">{country}</span>
                  <span className="text-14">{getCountryData(country) || 'No Data Available'}</span>
                  {i !== comparedCountries?.length - 1 && <hr className="my-2"/>}
                </>
              ))}
            </>
          )}
          
        </div>
      </MouseTooltip>

      <Tooltip id="info-tooltip" />
    </div>
  );
}

export default App;
