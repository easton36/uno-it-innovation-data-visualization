import React, { memo, useState } from "react";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
} from "react-simple-maps";
import geography from '../data/features.json';

const MapChart = ({ setTooltipContent, comparedCountries, setComparedCountries }) => {
    return (
        <ComposableMap class="h-full w-full">
            <ZoomableGroup>
                <Geographies geography={geography}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography key={geo.rsmKey} geography={geo} onMouseEnter={()=> {
                                setTooltipContent(`${geo.properties.name}`);
                            }}
                            onMouseLeave = {() => {
                                setTooltipContent("");
                            }}
                            onClick={() => {
                                // if ctrl key is held down, add to selection
                                if (window.event.ctrlKey) {
                                    if (comparedCountries.includes(geo.properties.name)) {
                                        setComparedCountries(comparedCountries.filter((s) => s !== geo.properties.name));
                                    } else {
                                        setComparedCountries([...comparedCountries, geo.properties.name]);
                                    }
                                } else{
                                    
                                }
                            }}
                            style = {{
                                default: {
                                    fill: comparedCountries.includes(geo.properties.name) ? "#F53" : "#D6D6DA",
                                    outline: "none"
                                },
                                hover: {
                                    fill: "#F53",
                                    outline: "none"
                                },
                                pressed: {
                                    fill: "#E42",
                                    outline: "none"
                                }
                            }}/>
                        )
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    );
};

export default memo(MapChart);