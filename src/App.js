import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Sidebar from './components/Sidebar/Sidebar';
import Spreadsheet from './components/Spreadsheet/Spreadsheet';
import './styles.css';
function App() {
    return (_jsxs("div", { className: "app-container", children: [_jsx(Sidebar, {}), _jsx(Spreadsheet, {})] }));
}
export default App;
