import { ChangeEvent } from "react";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

interface BaseProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  className?: string;
}

export const FormInput = ({ label, name, value, onChange, type = "text", placeholder, disabled }: BaseProps & { type?: string, placeholder?: string, disabled?: boolean }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input id={name} name={name} type={type} className="input" value={value} onChange={onChange} placeholder={placeholder} disabled={disabled} />
  </>
);

export const FormSelect = ({ label, name, value, onChange, options }: BaseProps & { options: readonly string[] }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <select id={name} name={name} className="input" value={value} onChange={onChange}>
      {options.map((opt) => (
       <option key={opt} value={opt}>
          {capitalize(opt)} 
        </option>
      ))}
    </select>
  </>
);

export const FormTextArea = ({ label, name, value, onChange, placeholder }: BaseProps & { placeholder?: string }) => (
  <>
    <label htmlFor={name}>{label}</label>
    <textarea id={name} name={name} className="input" rows={4} value={value} onChange={onChange} placeholder={placeholder} />
  </>
);