import { useState } from 'react';
import MouseTooltip from 'react-sticky-mouse-tooltip';

import Sidebar from './components/Sidebar';
import MapChart from './components/Map';

function App() {
    const [config, setConfig] = useState({});
    const [content, setContent] = useState("");

    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-white">        
        <MapChart setTooltipContent={setContent} />
        <MouseTooltip
          visible={content !== ""}
          offsetX={15}
          offsetY={10}
        >
          <div class="bg-black bg-opacity-75 text-white text-center rounded-md p-2">
            <span>{content}</span>
          </div>
        </MouseTooltip>
      </div>
    );
}

export default App;
