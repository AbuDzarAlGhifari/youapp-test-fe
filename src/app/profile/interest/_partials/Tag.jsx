const Tag = ({ label, onRemove }) => (
  <div className="flex items-center gap-2 p-2 text-sm font-medium text-white bg-[#FFFFFF] bg-opacity-10 rounded-md shadow-md">
    <span>{label}</span>
    {onRemove && (
      <button
        onClick={onRemove}
        className="text-white transition-colors hover:text-opacity-55 focus:outline-none"
      >
        ✕
      </button>
    )}
  </div>
);

export default Tag;
