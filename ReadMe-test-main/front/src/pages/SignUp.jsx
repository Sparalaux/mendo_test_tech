import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ComicButton, FormField } from "../components/generic/Form";
import { signUpUser } from "../services/userService";

export default function SignUp() {
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Redirect to the homepage if the user is already logged in
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignUp = async (values) => {
    const result = await signUpUser(values);

    if (result.success) {
      setMessage(result.message);
      setMessageStyle("text-green-500");

      // Redirect to the login page after a short delay
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else {
      setMessage(result.message);
      setMessageStyle("text-red-500");
    }
  };

  if (user) {
    return null; // Hide the signup form if the user is already logged in.
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSignUp}
      >
        {({ isSubmitting }) => (
          <div className="p-8 transform bg-white border-4 border-black rounded-lg shadow-comic">
            <Link to="/">
              <img alt="mini logo" src="/images/ReadMeMini.png" className="mx-auto mb-6" />
            </Link>
            <p className="mb-6 text-4xl text-center font-doodles">Inscription :</p>
            <Form className="grid gap-4 font-doodles">
              <FormField name="email" label="Email" type="email" />
              <FormField name="password" label="Mot de Passe" type="password" />
              <ComicButton type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Envoi en cours..." : "Envoyer"}
              </ComicButton>
              <Link to="/" className="mt-4 text-center text-blue-500 hover:underline">
                <p className="font-doodles">Retour</p>
              </Link>
            </Form>
            {message && (
              <p className={`mt-4 text-center font-justicefest text-xl ${messageStyle}`}>
                {message}
              </p>
            )}
          </div>
        )}
      </Formik>
    </div>
  );
};