type Props = {
  type?: string;
  title: string;
  state: string;
  placeholder: string;
  isTextAres: boolean;
  setState: (value: string) => void;
};

const FormField = ({
  type,
  title,
  state,
  placeholder,
  isTextAres,
  setState,
}: Props) => {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label htmlFor="" className="w-full text-gray-100">
        {title}
      </label>

      {isTextAres ? (
        <textarea
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={state}
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      )}
    </div>
  );
};

export default FormField;
