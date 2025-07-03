import Sidebar from './components/Sidebar/Sidebar';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Spreadsheet />
    </div>
  );
}

export default App;