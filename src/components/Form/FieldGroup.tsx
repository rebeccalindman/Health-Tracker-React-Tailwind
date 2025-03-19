

interface FieldGroupProps {
  label?: string;
  children: React.ReactNode;
}

const FieldGroup: React.FC<FieldGroupProps> = ({ label, children }) => {
  return (
    <div className="flex flex-wrap gap-4">
      {label && <label className="w-full font-semibold">{label}</label>}
      <div className="flex w-full gap-4">{children}</div>
    </div>
  );
};

export default FieldGroup;
