const FormField = ({ label, children }) => (
  <div className="grid items-center grid-cols-12 gap-2">
    <label className="col-span-4 text-xs text-white text-opacity-45">
      {label}
    </label>
    <div className="col-span-8">{children}</div>
  </div>
);

export default FormField;
