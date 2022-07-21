export default function TableHeaderCell({ children }) {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
    >
      {children}
    </th>
  );
}
