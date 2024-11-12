import { Field } from "formik";

export function FormField({ name, label, as, type = "text" }) {
    const Component = as === "textarea" ? ComicTextarea : ComicInput;
    return (
      <label className="flex flex-col font-comic">
        <span className="mb-1 text-lg">{label} :</span>
        <Field
          name={name}
          as={Component}
          type={type}
        />
      </label>
    );
}

export const ComicInput = ({ className = "", ...props }) => (
    <input
      {...props}
      className={`p-2 border-4 border-black rounded-lg font-comic text-lg ${className}`}
    />
);
  
export const ComicTextarea = ({ className = "", ...props }) => (
    <textarea
      {...props}
      className={`p-2 border-4 border-black rounded-lg font-comic text-lg ${className}`}
    />
);

export const ComicButton = ({ children, onClick, className = "", type = "button" }) => (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 text-lg font-bold text-white bg-black border-4 border-black rounded-lg shadow-comic hover:bg-white hover:text-black transition-all duration-200 ${className}`}
    >
      {children}
    </button>
);