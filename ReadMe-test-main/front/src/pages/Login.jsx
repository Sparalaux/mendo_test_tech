import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { ComicButton, FormField } from "../components/generic/Form";
import { loginUser } from "../services/userService";

export default function Login() {
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

  const handleLogin = async (values) => {
    const result = await loginUser(values);

    if (result.success) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          _id: result.user._id,
          email: result.user.email,
          token: result.user.token,
          isAdmin: result.user.isAdmin,
        })
      );
      setMessage(result.message);
      setMessageStyle("text-green-500");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      setMessage(result.message);
      setMessageStyle("text-red-500");
    }
  };

  // Show a loading message or spinner if desired while checking login status
  if (user) {
    return null; // This ensures nothing is rendered while the redirect is occurring.
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <div className="p-8 transform bg-white border-4 border-black rounded-lg shadow-comic">
            <Link to="/">
              <img alt="mini logo" src="/images/ReadMeMini.png" className="mx-auto mb-6" />
            </Link>
            <p className="mb-6 text-4xl text-center font-doodles">Connexion :</p>
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
}