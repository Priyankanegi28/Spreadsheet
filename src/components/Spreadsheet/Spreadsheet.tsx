import { useState, useRef, useEffect } from 'react';
import {
  MdSettings,
  MdVisibilityOff,
  MdSwapVert,
  MdFilterList,
  MdViewModule,
  MdFileDownload,
  MdFileUpload,
  MdShare,
  MdAdd,
  MdNotificationsNone,
  MdSearch
} from 'react-icons/md';
import './styles.css';

interface FinancialData {
  jobRequest: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  answerQuestion: string;
  date: string;
  extract: string;
  value: string;
}

const statusColors: Record<string, string> = {
  'In-process': '#ffe6a1',
  'Need to start': '#ffe1e1',
  'Complete': '#c6f5d7',
  'Blocked': '#ffd6d6',
};
const statusTextColors: Record<string, string> = {
  'In-process': '#b38b00',
  'Need to start': '#d32f2f',
  'Complete': '#388e3c',
  'Blocked': '#d32f2f',
};
const priorityColors: Record<string, string> = {
  'Medium': '#ffe6a1',
  'High': '#ffd6d6',
  'Low': '#e3f0ff',
};
const priorityTextColors: Record<string, string> = {
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
  const initialData: FinancialData[] = [
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
  const [data, setData] = useState<FinancialData[]>(initialData);
  const [selected, setSelected] = useState<{row: number, col: number} | null>(null);
  const [editing, setEditing] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState('');
  const [columnWidths, setColumnWidths] = useState(columns.map(col => col.width || 120));
  const [hiddenColumns, setHiddenColumns] = useState<number[]>([]);
  const startResizeRef = useRef<{colIdx: number, startX: number, startWidth: number} | null>(null);

  // For empty rows
  const totalRows = 20;

  // Handle cell click/selection
  const handleCellClick = (rowIdx: number, colIdx: number) => {
    setSelected({ row: rowIdx, col: colIdx });
    setEditing(null);
  };

  // Handle double click to edit
  const handleCellDoubleClick = (rowIdx: number, colIdx: number, value: string) => {
    setEditing({ row: rowIdx, col: colIdx });
    setEditValue(value);
    setSelected({ row: rowIdx, col: colIdx });
  };

  // Handle input change
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // Save edit
  const saveEdit = () => {
    if (editing) {
      const { row, col } = editing;
      const key = columns[col]?.key;
      if (key) {
        const newData = [...data];
        (newData[row] as any)[key] = editValue;
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
  const handleCellKeyDown = (e: React.KeyboardEvent, rowIdx: number, colIdx: number) => {
    if (editing) {
      if (e.key === 'Enter') {
        saveEdit();
      } else if (e.key === 'Escape') {
        cancelEdit();
      }
      return;
    }
    let next = { row: rowIdx, col: colIdx };
    if (e.key === 'ArrowDown') next.row = Math.min(data.length - 1, rowIdx + 1);
    else if (e.key === 'ArrowUp') next.row = Math.max(0, rowIdx - 1);
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
        setEditValue((data[rowIdx] as any)[key] || '');
      } else {
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
  const handleToolbarClick = (name: string) => {
    alert(`${name} clicked! (placeholder)`);
  };

  const handleResizeMouseDown = (e: React.MouseEvent, colIdx: number) => {
    startResizeRef.current = {
      colIdx,
      startX: e.clientX,
      startWidth: columnWidths[colIdx]
    };
    document.body.style.cursor = 'col-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
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

  const handleHideColumn = (colIdx: number) => {
    setHiddenColumns(cols => [...cols, colIdx]);
  };
  const handleShowAllColumns = () => {
    setHiddenColumns([]);
  };

  return (
    <div className="spreadsheet-modern-container">
      {/* Header */}
      <div className="spreadsheet-header">
        <div className="spreadsheet-breadcrumbs">
          <span className="icon">📁</span>
          <span>Workspace</span>
          <span className="chevron">›</span>
          <span>Folder 2</span>
          <span className="chevron">›</span>
          <span>Spreadsheet 3</span>
          <span className="spreadsheet-header-menu">⋯</span>
        </div>
        <div className="spreadsheet-header-actions">
          <div className="spreadsheet-search-wrapper">
            <MdSearch className="search-icon" />
            <input className="spreadsheet-search" placeholder="Search within sheet" />
          </div>
          <button className="spreadsheet-header-btn notification-btn" title="Notifications">
            <MdNotificationsNone className="icon" />
          </button>
          <div className="spreadsheet-user">
            <span className="user-avatar">JD</span>
            <span className="user-name">John Doe</span>
          </div>
        </div>
      </div>
      
      {/* Toolbar Row */}
      <div className="spreadsheet-toolbar-row">
        <div className="spreadsheet-toolbar-left">
          <button className="spreadsheet-toolbar-btn" onClick={() => handleToolbarClick('Tool bar')}><MdSettings className="icon" /> Tool bar</button>
          <button className="spreadsheet-toolbar-btn" onClick={() => handleToolbarClick('Hide fields')}><MdVisibilityOff className="icon" /> Hide fields</button>
          <button className="spreadsheet-toolbar-btn" onClick={() => handleToolbarClick('Sort')}><MdSwapVert className="icon" /> Sort</button>
          <button className="spreadsheet-toolbar-btn" onClick={() => handleToolbarClick('Filter')}><MdFilterList className="icon" /> Filter</button>
          <button className="spreadsheet-toolbar-btn" onClick={() => handleToolbarClick('Cell view')}><MdViewModule className="icon" /> Cell view</button>
        </div>
        <div className="spreadsheet-toolbar-right">
          <button className="spreadsheet-header-btn" onClick={() => handleToolbarClick('Import')}><MdFileDownload className="icon" /> Import</button>
          <button className="spreadsheet-header-btn" onClick={() => handleToolbarClick('Export')}><MdFileUpload className="icon" /> Export</button>
          <button className="spreadsheet-header-btn" onClick={() => handleToolbarClick('Share')}><MdShare className="icon" /> Share</button>
          <button className="spreadsheet-action-btn" onClick={() => handleToolbarClick('New Action')}><MdAdd className="icon" /> New Action</button>
        </div>
      </div>
      
      {/* Table */}
      <div className="spreadsheet-table-container">
        <table className="spreadsheet-table">
            <thead>
            {/* Group header row */}
            <tr>
              <th className="row-number-header" style={{ background: '#fafbfc', border: 'none' }}></th>
              <th colSpan={5} className="q3-group-header">
                Q3 Financial Overview
              </th>
              <th className="group-abc group-header-cell" style={{fontWeight:600}}>
                ABC
              </th>
              <th className="group-question group-header-cell" colSpan={2} style={{fontWeight:600}}>
                Answer a question
              </th>
              <th className="group-extract group-header-cell" style={{fontWeight:600}}>
                Extract
              </th>
              <th className="group-plus group-header-cell">
                <button className="spreadsheet-group-tab group-plus" onClick={handleAddRow}><MdAdd /></button>
              </th>
                </tr>
            {/* Column header row */}
            <tr>
              <th className="row-number-header"></th>
              {columns.slice(1).map((col, j) => {
                const colIdx = j + 1;
                if (hiddenColumns.includes(colIdx)) return null;
                return (
                  <th key={colIdx} style={{ position: 'relative', width: columnWidths[colIdx], minWidth: 40, maxWidth: 400 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>{col.label}</span>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button
                          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 4 }}
                          title="Hide column"
                          onClick={e => { e.stopPropagation(); handleHideColumn(colIdx); }}
                        >
                          <span style={{ fontWeight: 'bold', fontSize: 14 }}>×</span>
                        </button>
                        <div
                          style={{ width: 6, cursor: 'col-resize', height: 24, marginLeft: 2 }}
                          onMouseDown={e => handleResizeMouseDown(e, colIdx)}
                          title="Resize column"
                        />
                      </div>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? 'spreadsheet-row-alt' : ''}>
                <td className="row-number">{i + 1}</td>
                {columns.slice(1).map((col, j) => {
                  const colIdx = j + 1;
                  if (hiddenColumns.includes(colIdx)) return null;
                  const key = col.key;
                  if (!key) return <td key={colIdx}></td>;
                  const isSelected = selected && selected.row === i && selected.col === colIdx;
                  const isEditing = editing && editing.row === i && editing.col === colIdx;
                  let value = (row as any)[key] || '';
                  // Special rendering for status/priority tags and links
                  let cellContent = value;
                  if (key === 'status' && value) {
                    cellContent = <span className="spreadsheet-tag" style={{ background: statusColors[value], color: statusTextColors[value] }}>{value}</span>;
                  } else if (key === 'priority' && value) {
                    cellContent = <span className="spreadsheet-tag" style={{ background: priorityColors[value], color: priorityTextColors[value] }}>{value}</span>;
                  } else if (key === 'url' && value) {
                    cellContent = <a href={`https://${value}`} className="spreadsheet-link" target="_blank" rel="noopener noreferrer">{value}</a>;
                  }
                  return (
                    <td
                      key={colIdx}
                      tabIndex={0}
                      className={isSelected ? 'spreadsheet-cell-selected' : ''}
                      onClick={() => handleCellClick(i, colIdx)}
                      onDoubleClick={() => handleCellDoubleClick(i, colIdx, value)}
                      onKeyDown={e => handleCellKeyDown(e, i, colIdx)}
                      onFocus={() => setSelected({ row: i, col: colIdx })}
                      style={{ outline: isSelected ? '2px solid #1976d2' : undefined, cursor: 'pointer' }}
                    >
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editValue}
                          onChange={handleEditChange}
                          onBlur={saveEdit}
                          onKeyDown={e => {
                            if (e.key === 'Enter') saveEdit();
                            else if (e.key === 'Escape') cancelEdit();
                          }}
                          style={{ width: '100%', border: 'none', outline: 'none', background: '#e3f0ff', fontSize: 15 }}
                        />
                      ) : (
                        cellContent
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Empty rows for spreadsheet look */}
            {Array.from({ length: totalRows - data.length }).map((_, idx) => (
              <tr key={`empty-${idx}`} className={(data.length + idx) % 2 === 0 ? 'spreadsheet-row-alt' : ''}>
                {Array.from({ length: columns.length }).map((_, colIdx) => (
                  <td key={colIdx}>&nbsp;</td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      {/* Footer Tabs */}
      <div className="spreadsheet-footer-tabs">
        <button className="active" onClick={() => handleToolbarClick('All Orders')}>All Orders</button>
        <button onClick={() => handleToolbarClick('Pending')}>Pending</button>
        <button onClick={() => handleToolbarClick('Reviewed')}>Reviewed</button>
        <button onClick={() => handleToolbarClick('Arrived')}>Arrived</button>
        <button className="footer-plus" onClick={() => handleToolbarClick('Footer +')}>+</button>
      </div>

      {hiddenColumns.length > 0 && (
        <button style={{ margin: '8px 0', fontSize: 13 }} onClick={handleShowAllColumns}>
          Show all columns
        </button>
      )}
    </div>
  );
};

export default Spreadsheet;