import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { MdSettings, MdVisibilityOff, MdSwapVert, MdFilterList, MdViewModule, MdFileDownload, MdFileUpload, MdShare, MdAdd, MdNotificationsNone, MdSearch } from 'react-icons/md';
import './styles.css';
const statusColors = {
    'In-process': '#ffe6a1',
    'Need to start': '#ffe1e1',
    'Complete': '#c6f5d7',
    'Blocked': '#ffd6d6',
};
const statusTextColors = {
    'In-process': '#b38b00',
    'Need to start': '#d32f2f',
    'Complete': '#388e3c',
    'Blocked': '#d32f2f',
};
const priorityColors = {
    'Medium': '#ffe6a1',
    'High': '#ffd6d6',
    'Low': '#e3f0ff',
};
const priorityTextColors = {
    'Medium': '#b38b00',
    'High': '#d32f2f',
    'Low': '#1976d2',
};
const columns = [
    { label: '', width: 40 }, // Row number
    { label: 'Job Request', color: '', group: 'Q3 Financial Overview', key: 'jobRequest' },
    { label: 'Submitted', color: '', group: 'Q3 Financial Overview', key: 'submitted' },
    { label: 'Status', color: '', group: 'Q3 Financial Overview', key: 'status' },
    { label: 'Submitter', color: '', group: 'Q3 Financial Overview', key: 'submitter' },
    { label: 'URL', color: '', group: 'Q3 Financial Overview', key: 'url' },
    { label: 'Assigned', color: '#e3f0ff', group: 'ABC', key: 'assigned' },
    { label: 'Priority', color: '#fff3e0', group: 'ABC', key: 'priority' },
    { label: 'Due Date', color: '#ede7f6', group: 'Answer a question', key: 'answerQuestion' },
    { label: 'Est. Value', color: '#ffe0e0', group: 'Extract', key: 'value' },
];
const Spreadsheet = () => {
    const initialData = [
        {
            jobRequest: "Launch social media campaign for pro...",
            submitted: "15-11-2024",
            status: "In-process",
            submitter: "Aisha Patel",
            url: "www.aishapatel.com",
            assigned: "Sophie Choudhury",
            priority: "Medium",
            answerQuestion: "20-11-2024",
            date: "18-11-2024",
            extract: "",
            value: "6,200,000 ₹"
        },
        {
            jobRequest: "Update press kit for company redesign",
            submitted: "28-10-2024",
            status: "Need to start",
            submitter: "Irfan Khan",
            url: "www.irfankhanpage.com",
            assigned: "Tejas Pandey",
            priority: "High",
            answerQuestion: "30-10-2024",
            date: "30-10-2024",
            extract: "",
            value: "3,500,000 ₹"
        },
        {
            jobRequest: "Finalize user testing feedback for app...",
            submitted: "05-12-2024",
            status: "In-process",
            submitter: "Mark Johnson",
            url: "www.markjohnson.com",
            assigned: "Rachel Lee",
            priority: "Medium",
            answerQuestion: "10-12-2024",
            date: "10-12-2024",
            extract: "",
            value: "4,750,000 ₹"
        },
        {
            jobRequest: "Design new features for the website",
            submitted: "10-01-2025",
            status: "Complete",
            submitter: "Emily Green",
            url: "www.emilygreen.com",
            assigned: "Tom Wright",
            priority: "Low",
            answerQuestion: "15-01-2025",
            date: "15-01-2025",
            extract: "",
            value: "5,900,000 ₹"
        },
        {
            jobRequest: "Prepare financial report for Q4",
            submitted: "25-01-2025",
            status: "Blocked",
            submitter: "Jessica Brown",
            url: "www.jessicabrown.com",
            assigned: "Kevin Smith",
            priority: "Low",
            answerQuestion: "30-01-2025",
            date: "30-01-2025",
            extract: "",
            value: "2,800,000 ₹"
        }
    ];
    const [data, setData] = useState(initialData);
    const [selected, setSelected] = useState(null);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState('');
    const [columnWidths, setColumnWidths] = useState(columns.map(col => col.width || 120));
    const [hiddenColumns, setHiddenColumns] = useState([]);
    const startResizeRef = useRef(null);
    const fileInputRef = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const profileRef = useRef(null);
    const [loggedIn, setLoggedIn] = useState(true);
    const [activeTab, setActiveTab] = useState('All Orders');
    const [customTabs, setCustomTabs] = useState([]);
    const [addingTab, setAddingTab] = useState(false);
    const [newTabName, setNewTabName] = useState('');
    const newTabInputRef = useRef(null);
    const [fieldsHidden, setFieldsHidden] = useState(false);
    const [sortAsc, setSortAsc] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [filterCol, setFilterCol] = useState('');
    const [filterVal, setFilterVal] = useState('');
    const [showCellView, setShowCellView] = useState(false);
    // For empty rows
    const totalRows = 20;
    // Handle cell click/selection
    const handleCellClick = (rowIdx, colIdx) => {
        setSelected({ row: rowIdx, col: colIdx });
        setEditing(null);
    };
    // Handle double click to edit
    const handleCellDoubleClick = (rowIdx, colIdx, value) => {
        setEditing({ row: rowIdx, col: colIdx });
        setEditValue(value);
        setSelected({ row: rowIdx, col: colIdx });
    };
    // Handle input change
    const handleEditChange = (e) => {
        setEditValue(e.target.value);
    };
    // Save edit
    const saveEdit = () => {
        if (editing) {
            const { row, col } = editing;
            const key = columns[col]?.key;
            if (key) {
                const newData = [...data];
                newData[row][key] = editValue;
                setData(newData);
            }
            setEditing(null);
        }
    };
    // Cancel edit
    const cancelEdit = () => {
        setEditing(null);
    };
    // Handle key navigation and editing
    const handleCellKeyDown = (e, rowIdx, colIdx) => {
        if (editing) {
            if (e.key === 'Enter') {
                saveEdit();
            }
            else if (e.key === 'Escape') {
                cancelEdit();
            }
            return;
        }
        let next = { row: rowIdx, col: colIdx };
        if (e.key === 'ArrowDown')
            next.row = Math.min(data.length - 1, rowIdx + 1);
        else if (e.key === 'ArrowUp')
            next.row = Math.max(0, rowIdx - 1);
        else if (e.key === 'ArrowRight' || e.key === 'Tab') {
            next.col = Math.min(columns.length - 1, colIdx + 1);
            if (next.col === columns.length - 1 && e.key === 'Tab') {
                next.row = Math.min(data.length - 1, rowIdx + 1);
                next.col = 1;
            }
        }
        else if (e.key === 'ArrowLeft' || (e.key === 'Tab' && e.shiftKey)) {
            next.col = Math.max(1, colIdx - 1);
            if (next.col === 1 && e.key === 'Tab' && e.shiftKey) {
                next.row = Math.max(0, rowIdx - 1);
                next.col = columns.length - 1;
            }
        }
        else if (e.key === 'Enter') {
            next.row = Math.min(data.length - 1, rowIdx + 1);
        }
        else if (e.key === 'F2') {
            setEditing({ row: rowIdx, col: colIdx });
            const key = columns[colIdx]?.key;
            if (key) {
                setEditValue(data[rowIdx][key] || '');
            }
            else {
                setEditValue('');
            }
            return;
        }
        setSelected(next);
        e.preventDefault();
    };
    // Add row
    const handleAddRow = () => {
        setData([...data, {
                jobRequest: '',
                submitted: '',
                status: '',
                submitter: '',
                url: '',
                assigned: '',
                priority: '',
                answerQuestion: '',
                date: '',
                extract: '',
                value: ''
            }]);
    };
    // Toolbar button handlers
    const handleFileImport = (event) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            // You can add your file processing logic here
            alert(`Selected file: ${file.name}`);
            // Reset input so the same file can be selected again if needed
            event.target.value = '';
        }
    };
    const handleExport = () => {
        // Convert data to CSV
        const csvRows = [];
        // Add header row
        csvRows.push(columns.slice(1).map(col => col.label).join(","));
        // Add data rows
        data.forEach(row => {
            const rowData = columns.slice(1).map(col => {
                const key = col.key;
                const val = key ? row[key] || '' : '';
                // Escape quotes
                return `"${String(val).replace(/"/g, '""')}"`;
            });
            csvRows.push(rowData.join(","));
        });
        const csvString = csvRows.join("\n");
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'spreadsheet_export.csv';
        a.click();
        URL.revokeObjectURL(url);
    };
    const handleShare = () => {
        const shareUrl = window.location.href;
        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('Shareable link copied to clipboard!');
        });
    };
    const handleNewAction = () => {
        if (window.confirm('Are you sure you want to create a new spreadsheet? This will clear all data.')) {
            // Create 20 empty rows
            const emptyRows = Array.from({ length: 20 }, () => ({
                jobRequest: '',
                submitted: '',
                status: '',
                submitter: '',
                url: '',
                assigned: '',
                priority: '',
                answerQuestion: '',
                date: '',
                extract: '',
                value: ''
            }));
            setData(emptyRows);
            setSelected(null);
            setEditing(null);
        }
    };
    const handleToolbarClick = (name) => {
        if (name === 'Import') {
            fileInputRef.current?.click();
            return;
        }
        if (name === 'Export') {
            handleExport();
            return;
        }
        if (name === 'Share') {
            handleShare();
            return;
        }
        if (name === 'New Action') {
            handleNewAction();
            return;
        }
        alert(`${name} clicked! (placeholder)`);
    };
    const handleResizeMouseDown = (e, colIdx) => {
        startResizeRef.current = {
            colIdx,
            startX: e.clientX,
            startWidth: columnWidths[colIdx]
        };
        document.body.style.cursor = 'col-resize';
    };
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (startResizeRef.current) {
                const { colIdx, startX, startWidth } = startResizeRef.current;
                const delta = e.clientX - startX;
                setColumnWidths(widths => {
                    const newWidths = [...widths];
                    newWidths[colIdx] = Math.max(40, startWidth + delta);
                    return newWidths;
                });
            }
        };
        const handleMouseUp = () => {
            if (startResizeRef.current) {
                startResizeRef.current = null;
                document.body.style.cursor = '';
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);
    const handleHideColumn = (colIdx) => {
        setHiddenColumns(cols => [...cols, colIdx]);
    };
    const handleShowAllColumns = () => {
        setHiddenColumns([]);
    };
    // Helper to highlight search matches
    function highlightMatch(text, search) {
        if (!search)
            return text;
        const idx = text.toLowerCase().indexOf(search.toLowerCase());
        if (idx === -1)
            return text;
        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + search.length);
        const after = text.slice(idx + search.length);
        return _jsxs(_Fragment, { children: [before, _jsx("span", { className: "spreadsheet-highlight", children: match }), after] });
    }
    // Filtered data based on search and active tab
    const statusFilter = (row) => {
        if (activeTab === 'All Orders')
            return true;
        if (activeTab === 'Pending')
            return row.status === 'Need to start' || row.status === 'In-process';
        if (activeTab === 'Arrived')
            return row.status === 'Complete';
        if (activeTab === 'Reviewed')
            return row.status === 'Blocked';
        return true;
    };
    const handleApplyFilter = () => {
        setShowFilter(false);
    };
    const handleClearFilter = () => {
        setFilterCol('');
        setFilterVal('');
        setShowFilter(false);
    };
    const filteredData = searchText.trim() === ''
        ? data.filter(row => statusFilter(row) &&
            (!filterCol || !filterVal || String(row[filterCol]).toLowerCase().includes(filterVal.toLowerCase())))
        : data.filter(row => statusFilter(row) &&
            (!filterCol || !filterVal || String(row[filterCol]).toLowerCase().includes(filterVal.toLowerCase())) &&
            columns.slice(1).some(col => {
                const key = col.key;
                const val = key ? String(row[key] ?? '').toLowerCase() : '';
                return val.includes(searchText.toLowerCase());
            }));
    const handleSort = () => {
        setSortAsc((asc) => !asc);
    };
    // In filteredData, apply sorting by 'jobRequest' if sort is active
    const sortedData = [...filteredData].sort((a, b) => {
        const aVal = (a.jobRequest || '').toLowerCase();
        const bVal = (b.jobRequest || '').toLowerCase();
        if (aVal < bVal)
            return sortAsc ? -1 : 1;
        if (aVal > bVal)
            return sortAsc ? 1 : -1;
        return 0;
    });
    useEffect(() => {
        if (!showProfile)
            return;
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setShowProfile(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfile]);
    const handleAddCustomTab = () => {
        setAddingTab(true);
        setTimeout(() => newTabInputRef.current?.focus(), 0);
    };
    const handleConfirmAddTab = () => {
        const name = newTabName.trim();
        if (name && !customTabs.includes(name)) {
            setCustomTabs(tabs => [...tabs, name]);
            setActiveTab(name);
        }
        setNewTabName('');
        setAddingTab(false);
    };
    const handleCancelAddTab = () => {
        setNewTabName('');
        setAddingTab(false);
    };
    const handleToggleFields = () => {
        if (fieldsHidden) {
            setHiddenColumns([]);
            setFieldsHidden(false);
        }
        else {
            setHiddenColumns(columns.slice(1).map((_, idx) => idx + 1));
            setFieldsHidden(true);
        }
    };
    const handleCellView = () => {
        setShowCellView(true);
    };
    if (!loggedIn) {
        return (_jsx("div", { style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f5f5f5' }, children: _jsxs("div", { style: { background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 16px rgba(0,0,0,0.10)', textAlign: 'center' }, children: [_jsx("h2", { children: "You are logged out" }), _jsx("button", { style: { padding: '10px 32px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, cursor: 'pointer' }, onClick: () => setLoggedIn(true), children: "Log in again" })] }) }));
    }
    return (_jsxs("div", { className: "spreadsheet-modern-container", children: [_jsxs("div", { className: "spreadsheet-header", children: [_jsxs("div", { className: "spreadsheet-breadcrumbs", children: [_jsx("span", { className: "icon", children: "\uD83D\uDCC1" }), _jsx("span", { children: "Workspace" }), _jsx("span", { className: "chevron", children: "\u203A" }), _jsx("span", { children: "Folder 2" }), _jsx("span", { className: "chevron", children: "\u203A" }), _jsx("span", { children: "Spreadsheet 3" }), _jsx("span", { className: "spreadsheet-header-menu", children: "\u22EF" })] }), _jsxs("div", { className: "spreadsheet-header-actions", children: [_jsxs("div", { className: "spreadsheet-search-wrapper", children: [_jsx(MdSearch, { className: "search-icon" }), _jsx("input", { className: "spreadsheet-search", placeholder: "Search within sheet", value: searchText, onChange: e => setSearchText(e.target.value) })] }), _jsx("button", { className: "spreadsheet-header-btn notification-btn", title: "Notifications", children: _jsx(MdNotificationsNone, { className: "icon" }) }), _jsxs("div", { className: "spreadsheet-user", style: { cursor: 'pointer', position: 'relative' }, onClick: () => setShowProfile(v => !v), children: [_jsx("span", { className: "user-avatar", children: "JD" }), _jsx("span", { className: "user-name", children: "John Doe" }), showProfile && (_jsxs("div", { ref: profileRef, style: { position: 'absolute', top: '110%', right: 0, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 8, padding: 16, minWidth: 200, zIndex: 1000 }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }, children: [_jsx("span", { className: "user-avatar", style: { fontSize: 24 }, children: "JD" }), _jsxs("div", { children: [_jsx("div", { style: { fontWeight: 600 }, children: "John Doe" }), _jsx("div", { style: { fontSize: 13, color: '#888' }, children: "john.doe@email.com" })] })] }), _jsx("button", { style: { width: '100%', padding: '8px 0', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }, onClick: e => { e.stopPropagation(); setLoggedIn(false); setShowProfile(false); }, children: "Log out" }), _jsx("button", { style: { position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', color: '#888' }, onClick: e => { e.stopPropagation(); setShowProfile(false); }, children: "\u00D7" })] }))] })] })] }), _jsxs("div", { className: "spreadsheet-toolbar-row", children: [_jsxs("div", { className: "spreadsheet-toolbar-left", children: [_jsxs("button", { className: "spreadsheet-toolbar-btn", onClick: () => handleToolbarClick('Tool bar'), children: [_jsx(MdSettings, { className: "icon" }), " Tool bar"] }), _jsxs("button", { className: "spreadsheet-toolbar-btn", onClick: handleToggleFields, children: [_jsx(MdVisibilityOff, { className: "icon" }), " ", fieldsHidden ? 'Show fields' : 'Hide fields'] }), _jsxs("button", { className: "spreadsheet-toolbar-btn", onClick: handleSort, children: [_jsx(MdSwapVert, { className: "icon" }), " Sort ", sortAsc ? '▲' : '▼'] }), _jsxs("button", { className: "spreadsheet-toolbar-btn", onClick: () => setShowFilter(v => !v), children: [_jsx(MdFilterList, { className: "icon" }), " Filter"] }), _jsxs("button", { className: "spreadsheet-toolbar-btn", onClick: handleCellView, children: [_jsx(MdViewModule, { className: "icon" }), " Cell view"] })] }), _jsxs("div", { className: "spreadsheet-toolbar-right", children: [_jsx("input", { type: "file", ref: fileInputRef, style: { display: 'none' }, accept: ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel", onChange: handleFileImport }), _jsxs("button", { className: "spreadsheet-header-btn", onClick: () => handleToolbarClick('Import'), children: [_jsx(MdFileDownload, { className: "icon" }), " Import"] }), _jsxs("button", { className: "spreadsheet-header-btn", onClick: () => handleToolbarClick('Export'), children: [_jsx(MdFileUpload, { className: "icon" }), " Export"] }), _jsxs("button", { className: "spreadsheet-header-btn", onClick: () => handleToolbarClick('Share'), children: [_jsx(MdShare, { className: "icon" }), " Share"] }), _jsxs("button", { className: "spreadsheet-action-btn", onClick: () => handleToolbarClick('New Action'), children: [_jsx(MdAdd, { className: "icon" }), " New Action"] })] })] }), _jsx("div", { className: "spreadsheet-table-container", children: _jsxs("table", { className: "spreadsheet-table", children: [_jsxs("thead", { children: [_jsxs("tr", { children: [_jsx("th", { className: "row-number-header", style: { background: '#fafbfc', border: 'none' } }), _jsx("th", { colSpan: 5, className: "q3-group-header", children: "Q3 Financial Overview" }), _jsx("th", { className: "group-abc group-header-cell", style: { fontWeight: 600 }, children: "ABC" }), _jsx("th", { className: "group-question group-header-cell", colSpan: 2, style: { fontWeight: 600 }, children: "Answer a question" }), _jsx("th", { className: "group-extract group-header-cell", style: { fontWeight: 600 }, children: "Extract" }), _jsx("th", { className: "group-plus group-header-cell", children: _jsx("button", { className: "spreadsheet-group-tab group-plus", onClick: handleAddRow, children: _jsx(MdAdd, {}) }) })] }), _jsxs("tr", { children: [_jsx("th", { className: "row-number-header" }), columns.slice(1).map((col, j) => {
                                            const colIdx = j + 1;
                                            if (hiddenColumns.includes(colIdx))
                                                return null;
                                            return (_jsx("th", { style: { position: 'relative', width: columnWidths[colIdx], minWidth: 40, maxWidth: 400 }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsx("span", { children: col.label }), _jsxs("div", { style: { display: 'flex', alignItems: 'center' }, children: [_jsx("button", { style: { background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 4 }, title: "Hide column", onClick: e => { e.stopPropagation(); handleHideColumn(colIdx); }, children: _jsx("span", { style: { fontWeight: 'bold', fontSize: 14 }, children: "\u00D7" }) }), _jsx("div", { style: { width: 6, cursor: 'col-resize', height: 24, marginLeft: 2 }, onMouseDown: e => handleResizeMouseDown(e, colIdx), title: "Resize column" })] })] }) }, colIdx));
                                        })] })] }), _jsxs("tbody", { children: [sortedData.map((row, i) => (_jsxs("tr", { className: i % 2 === 0 ? 'spreadsheet-row-alt' : '', children: [_jsx("td", { className: "row-number", children: i + 1 }), columns.slice(1).map((col, j) => {
                                            const colIdx = j + 1;
                                            if (hiddenColumns.includes(colIdx))
                                                return null;
                                            const key = col.key;
                                            if (!key)
                                                return _jsx("td", {}, colIdx);
                                            const isSelected = selected && selected.row === i && selected.col === colIdx;
                                            const isEditing = editing && editing.row === i && editing.col === colIdx;
                                            let value = row[key] || '';
                                            // Special rendering for status/priority tags and links
                                            let cellContent = value;
                                            if (key === 'status' && value) {
                                                cellContent = _jsx("span", { className: "spreadsheet-tag", style: { background: statusColors[value], color: statusTextColors[value] }, children: value });
                                            }
                                            else if (key === 'priority' && value) {
                                                cellContent = _jsx("span", { className: "spreadsheet-tag", style: { background: priorityColors[value], color: priorityTextColors[value] }, children: value });
                                            }
                                            else if (key === 'url' && value) {
                                                cellContent = _jsx("a", { href: `https://${value}`, className: "spreadsheet-link", target: "_blank", rel: "noopener noreferrer", children: value });
                                            }
                                            else if (searchText && typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())) {
                                                cellContent = highlightMatch(value, searchText);
                                            }
                                            return (_jsx("td", { tabIndex: 0, className: isSelected ? 'spreadsheet-cell-selected' : '', onClick: () => handleCellClick(i, colIdx), onDoubleClick: () => handleCellDoubleClick(i, colIdx, value), onKeyDown: e => handleCellKeyDown(e, i, colIdx), onFocus: () => setSelected({ row: i, col: colIdx }), style: { outline: isSelected ? '2px solid #1976d2' : undefined, cursor: 'pointer' }, children: isEditing ? (_jsx("input", { autoFocus: true, value: editValue, onChange: handleEditChange, onBlur: saveEdit, onKeyDown: e => {
                                                        if (e.key === 'Enter')
                                                            saveEdit();
                                                        else if (e.key === 'Escape')
                                                            cancelEdit();
                                                    }, style: { width: '100%', border: 'none', outline: 'none', background: '#e3f0ff', fontSize: 15 } })) : (cellContent) }, colIdx));
                                        })] }, i))), Array.from({ length: totalRows - sortedData.length }).map((_, idx) => (_jsx("tr", { className: (sortedData.length + idx) % 2 === 0 ? 'spreadsheet-row-alt' : '', children: Array.from({ length: columns.length }).map((_, colIdx) => (_jsx("td", { children: "\u00A0" }, colIdx))) }, `empty-${idx}`)))] })] }) }), _jsxs("div", { className: "spreadsheet-footer-tabs", children: [_jsx("button", { className: activeTab === 'All Orders' ? 'active' : '', onClick: () => setActiveTab('All Orders'), children: "All Orders" }), _jsx("button", { className: activeTab === 'Pending' ? 'active' : '', onClick: () => setActiveTab('Pending'), children: "Pending" }), _jsx("button", { className: activeTab === 'Reviewed' ? 'active' : '', onClick: () => setActiveTab('Reviewed'), children: "Reviewed" }), _jsx("button", { className: activeTab === 'Arrived' ? 'active' : '', onClick: () => setActiveTab('Arrived'), children: "Arrived" }), customTabs.map(tab => (_jsx("button", { className: activeTab === tab ? 'active' : '', onClick: () => setActiveTab(tab), children: tab }, tab))), addingTab ? (_jsx("input", { ref: newTabInputRef, value: newTabName, onChange: e => setNewTabName(e.target.value), onBlur: handleCancelAddTab, onKeyDown: e => {
                            if (e.key === 'Enter')
                                handleConfirmAddTab();
                            if (e.key === 'Escape')
                                handleCancelAddTab();
                        }, style: { marginLeft: 8, padding: '2px 8px', fontSize: 15, borderRadius: 4, border: '1px solid #1976d2', outline: 'none', minWidth: 60 }, placeholder: "Tab name", autoFocus: true })) : (_jsx("button", { className: "footer-plus", onClick: handleAddCustomTab, children: "+" }))] }), hiddenColumns.length > 0 && (_jsx("button", { style: { margin: '8px 0', fontSize: 13 }, onClick: handleShowAllColumns, children: "Show all columns" })), showFilter && (_jsxs("div", { style: { position: 'absolute', top: 50, right: 180, zIndex: 2000, background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', borderRadius: 8, padding: 16, minWidth: 220 }, children: [_jsx("div", { style: { marginBottom: 8, fontWeight: 600 }, children: "Filter" }), _jsx("div", { style: { marginBottom: 8 }, children: _jsxs("select", { value: filterCol, onChange: e => setFilterCol(e.target.value), style: { width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' }, children: [_jsx("option", { value: "", children: "Select column" }), columns.slice(1).map(col => (_jsx("option", { value: col.key, children: col.label }, col.key)))] }) }), _jsx("div", { style: { marginBottom: 12 }, children: _jsx("input", { value: filterVal, onChange: e => setFilterVal(e.target.value), placeholder: "Value", style: { width: '100%', padding: 6, borderRadius: 4, border: '1px solid #ccc' } }) }), _jsxs("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: 8 }, children: [_jsx("button", { onClick: handleClearFilter, style: { padding: '6px 12px' }, children: "Clear" }), _jsx("button", { onClick: handleApplyFilter, style: { padding: '6px 12px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }, children: "Apply" })] })] })), showCellView && (_jsx("div", { className: "modal-overlay", style: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }, children: _jsxs("div", { className: "modal-content", style: { background: '#fff', padding: 24, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)', position: 'relative' }, children: [_jsx("h3", { style: { marginTop: 0 }, children: "Cell View" }), selected ? (_jsx("div", { style: { fontSize: 18, padding: 16, background: '#f5f5f5', borderRadius: 4, minHeight: 40 }, children: (() => {
                                const row = sortedData[selected.row];
                                const col = columns[selected.col];
                                if (!row || !col || !col.key)
                                    return _jsx("span", { children: "No cell selected." });
                                return String(row[col.key] ?? '');
                            })() })) : (_jsx("div", { style: { color: '#888', fontSize: 16 }, children: "No cell selected." })), _jsx("button", { style: { position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#888' }, onClick: () => setShowCellView(false), children: "\u00D7" })] }) }))] }));
};
export default Spreadsheet;
