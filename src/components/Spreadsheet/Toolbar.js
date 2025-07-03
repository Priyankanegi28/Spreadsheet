import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import './styles.css';
const Toolbar = () => {
    const [showHideFields, setShowHideFields] = useState(false);
    const handleHideFieldsClick = () => {
        setShowHideFields(!showHideFields);
        console.log('Hide Fields clicked');
    };
    const handleToolbarAction = (action) => {
        console.log(`${action} clicked`);
    };
    return (_jsx("div", { className: "toolbar", children: _jsxs("div", { className: "hide-fields-container", children: [_jsx("button", { className: "hide-fields-button", onClick: handleHideFieldsClick, children: "Hide Fields" }), showHideFields && (_jsxs("div", { className: "hide-fields-dropdown", children: [_jsx("button", { onClick: () => handleToolbarAction('Sort'), children: "Sort" }), _jsx("button", { onClick: () => handleToolbarAction('Filter'), children: "Filter" }), _jsx("button", { onClick: () => handleToolbarAction('Call view'), children: "Call view" })] }))] }) }));
};
export default Toolbar;
