const Tag = ({ label, onRemove }) => (
  <div className="flex items-center gap-1 px-3 py-1 text-xs font-semibold bg-white rounded-md bg-opacity-10">
    <span>{label}</span>
    {onRemove && (
      <button
        onClick={onRemove}
        className="text-white hover:text-red-400 focus:outline-none"
      >
        ✕
      </button>
    )}
  </div>
);

export default Tag;
