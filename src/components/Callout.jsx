/**
 * Callout — highlighted aside block for MDX posts.
 *
 * Usage:
 *   import Callout from '../../components/Callout.jsx';
 *   <Callout type="insight">
 *     MSRCP outperformed autoMSRCR because it preserves the luminance
 *     channel separately, avoiding the halo artifacts that plague
 *     naive multi-scale retinex on high-contrast terrain.
 *   </Callout>
 *
 * Types: insight | warning | note | result
 */

const CONFIG = {
  insight: { icon: "💡", label: "Insight",  borderColor: "var(--amber)", bg: "rgba(255,179,0,0.05)",   labelColor: "var(--amber)" },
  warning: { icon: "⚠️", label: "Warning",  borderColor: "#FF5566",      bg: "rgba(255,85,102,0.05)",  labelColor: "#FF5566" },
  note:    { icon: "📎", label: "Note",     borderColor: "var(--blue)",  bg: "rgba(0,182,255,0.05)",  labelColor: "var(--blue)" },
  result:  { icon: "✓",  label: "Result",   borderColor: "var(--green)", bg: "rgba(0,255,159,0.05)",  labelColor: "var(--green)" },
};

export default function Callout({ type = "note", children }) {
  const { icon, label, borderColor, bg, labelColor } = CONFIG[type] ?? CONFIG.note;
  return (
    <div style={{ borderLeft: `2px solid ${borderColor}`, background: bg, borderRadius: "0 6px 6px 0", padding: "1rem 1.25rem", margin: "1.75rem 0" }}>
      <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: labelColor, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 6 }}>
        {icon} {label}
      </div>
      <div style={{ color: "var(--mutedL)", fontSize: 14.5, lineHeight: 1.75 }}>{children}</div>
    </div>
  );
}
