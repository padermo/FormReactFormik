import React, {useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./App.css";

function App() {
  const [formEnv, setFormEnv] = useState(false)
  return (
    <div className="form">
      <Formik
        initialValues={{ name: "", email: "" }}
        validate={(valores) => {
          let errores = {};

          if (!valores.name) {
            errores.name = "Por favor ingresa un nombre.";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
            errores.name = "El nombre solo puede contener letras y espacios.";
          }

          if (!valores.email) {
            errores.email = "Por favor ingresa un correo electronico.";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              valores.email
            )
          ) {
            errores.email =
              "El correo solo puede contener letras, numeros, puntos, guiones y guion bajo.";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          setFormEnv(true);
          setTimeout(() => setFormEnv(false), 5000);
        }}
      >
        {({ errors }) => (
          <Form className="form__content container">
            <section className="form__inputs">
              <div className="form__group">
                <label className="form__label">Name</label>
                <Field type="text" className="form__input" name="name" />
                <ErrorMessage
                  name="name"
                  component={() => <span className="error">{errors.name}</span>}
                />
              </div>

              <div className="form__group">
                <label className="form__label">Email</label>
                <Field type="email" className="form__input" name="email" />
                <ErrorMessage
                  name="email"
                  component={() => <span className="error">{errors.email}</span>}
                />
              </div>

              <div className="form__group">
                <input type="submit" value="Enviar" className="form__submit" />
                {formEnv && (
                  <p className="ok">Formulario enviado exitosamente.</p>
                )}
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default App;
