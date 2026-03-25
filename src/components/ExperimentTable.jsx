import { useState } from "react";

/**
 * ExperimentTable — embeddable in any MDX post.
 *
 * Usage in a .mdx file:
 *   import ExperimentTable from '../../components/ExperimentTable.jsx';
 *   <ExperimentTable
 *     caption="ATE results on MADMAX transfer learning"
 *     metric="lower is better"
 *     highlight="MSRCP"
 *     columns={["Method", "ATE avg.", "RPE avg."]}
 *     rows={[
 *       ["Original",   "185.37", "0.1932"],
 *       ["autoMSRCR",  "196.29", "0.1949"],
 *       ["MSRCP ★",   "165.62", "0.1912"],
 *     ]}
 *   />
 */
export default function ExperimentTable({ caption, metric, highlight, columns = [], rows = [] }) {
  const [sorted, setSorted] = useState({ col: null, dir: 1 });

  const doSort = (colIdx) => {
    setSorted(s => ({
      col: colIdx,
      dir: s.col === colIdx ? -s.dir : 1,
    }));
  };

  const displayRows = sorted.col !== null
    ? [...rows].sort((a, b) => {
        const va = parseFloat(a[sorted.col]) || a[sorted.col];
        const vb = parseFloat(b[sorted.col]) || b[sorted.col];
        return va < vb ? -sorted.dir : va > vb ? sorted.dir : 0;
      })
    : rows;

  return (
    <div style={{ margin: "1.75rem 0", overflowX: "auto" }}>
      {caption && (
        <p style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 8 }}>
          {caption}
          {metric && <span style={{ color: "var(--blue)", marginLeft: 12 }}>({metric})</span>}
        </p>
      )}
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--mono)", fontSize: 13 }}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <th key={i} onClick={() => doSort(i)} style={{ textAlign: "left", padding: "8px 14px", color: "var(--cream)", fontWeight: 500, borderBottom: "2px solid var(--border)", cursor: "pointer", userSelect: "none", whiteSpace: "nowrap" }}>
                {col}
                <span style={{ marginLeft: 6, color: "var(--muted)", fontSize: 10 }}>
                  {sorted.col === i ? (sorted.dir === 1 ? "↑" : "↓") : "⇅"}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayRows.map((row, i) => {
            const isHighlight = highlight && row[0].includes(highlight);
            return (
              <tr key={i} style={{ background: isHighlight ? "rgba(0,255,159,0.05)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.015)" }}>
                {row.map((cell, j) => (
                  <td key={j} style={{ padding: "8px 14px", borderBottom: "1px solid var(--border)", color: isHighlight ? (j === 0 ? "var(--green)" : "var(--cream)") : "var(--mutedL)", fontWeight: isHighlight && j !== 0 ? 500 : 400 }}>
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
