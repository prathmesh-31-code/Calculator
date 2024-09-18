import { render } from "react-dom";
import { useForm } from "react-hook-form"; // Corrected import
import "./styles.scss";

const Field = ({ label, id, register, validationRules, errors, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <input id={id} {...register(id, validationRules)} {...rest} />
    {errors[id] && <span className="error">{errors[id]?.message}</span>}
  </div>
);

const Select = ({ label, id, register, validationRules, errors, children, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <select id={id} {...register(id, validationRules)} {...rest}>
      {children}
    </select>
    {errors[id] && <span className="error">{errors[id]?.message}</span>}
  </div>
);

const Textarea = ({ label, id, register, validationRules, errors, ...rest }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <textarea id={id} {...register(id, validationRules)} {...rest} />
    {errors[id] && <span className="error">{errors[id]?.message}</span>}
  </div>
);

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      prn: "",
      email: "",
      framework: "",
      message: ""
    }
  });

  const onSubmit = (values) => alert(JSON.stringify(values, null, 2));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field 
        label="First Name" 
        id="firstName" 
        register={register} 
        validationRules={{ required: "First name is required" }}
        errors={errors}
      />
      <Field 
        label="Last Name" 
        id="lastName" 
        register={register} 
        validationRules={{ required: "Last name is required" }}
        errors={errors}
      />
      <Field 
        label="PRN" 
        id="prn" 
        register={register} 
        validationRules={{ required: "PRN is required", minLength: { value: 10, message: "PRN must be at least 10 characters" } }}
        errors={errors}
      />
      <Field 
        label="Email" 
        id="email" 
        register={register} 
        validationRules={{
          required: "Email is required", 
          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" }
        }}
        errors={errors}
      />
      <Select 
        label="Framework" 
        id="framework" 
        register={register} 
        validationRules={{ required: "Framework selection is required" }}
        errors={errors}
      >
        <option value="">I'm interested in...</option>
        <option value="react">React</option>
        <option value="vue">Vue</option>
        <option value="angular">Angular</option>
        <option value="svelte">Svelte</option>
      </Select>
      <Textarea 
        label="Message" 
        id="message" 
        register={register} 
        validationRules={{ required: "Message is required", minLength: { value: 10, message: "Message must be at least 10 characters long" } }}
        errors={errors}
      />
      <input type="submit" />
    </form>
  );
}

render(<App />, document.getElementById("root"));
export default App;
