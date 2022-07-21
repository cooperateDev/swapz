export default function TableHeader({ children }) {
  return (
    <thead className="bg-light-purple">
      <tr>{children}</tr>
    </thead>
  );
}
