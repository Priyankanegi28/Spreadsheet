import { useState } from 'react';
import './styles.css';

const Toolbar = () => {
  const [showHideFields, setShowHideFields] = useState(false);

  const handleHideFieldsClick = () => {
    setShowHideFields(!showHideFields);
    console.log('Hide Fields clicked');
  };

  const handleToolbarAction = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <div className="toolbar">
      <div className="hide-fields-container">
        <button 
          className="hide-fields-button"
          onClick={handleHideFieldsClick}
        >
          Hide Fields
        </button>
        
        {showHideFields && (
          <div className="hide-fields-dropdown">
            <button onClick={() => handleToolbarAction('Sort')}>Sort</button>
            <button onClick={() => handleToolbarAction('Filter')}>Filter</button>
            <button onClick={() => handleToolbarAction('Call view')}>Call view</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;