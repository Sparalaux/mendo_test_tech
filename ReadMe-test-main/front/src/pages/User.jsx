import Header from "../components/Header";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchUser, updateUser, deleteUser } from "../services/userService";
import { ComicButton, FormField } from "../components/generic/Form";

function User() {
  const [message, setMessage] = useState(null);
  const [messageStyle, setMessageStyle] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const userStorage = JSON.parse(localStorage.getItem("user"));
  const params = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUser(params.id, userStorage.token);
        setUser(userData);
      } catch (error) {
        setMessage("Erreur lors de la récupération de l'utilisateur.");
        setMessageStyle("text-red-500");
      }
    };

    fetchUserData();
  }, [params.id, userStorage.token]);

  const handleDeleteProfile = async () => {
    const result = await deleteUser(params.id, userStorage.token);

    if (result.success) {
      if (user._id === userStorage._id) {
        localStorage.clear();
      }
      navigate("/");
    } else {
      setMessage(result.message);
      setMessageStyle("text-red-500");
    }
  };

  const handleUpdateProfile = async (values) => {
    const customBody = {
      _id: user._id,
      ...(values.email && { email: values.email }),
      ...(values.password && { password: values.password }),
    };

    if (!values.email && !values.password) {
      setMessage("Erreur : Il faut au moins remplir une des cases");
      setMessageStyle("text-red-500");
      return;
    }

    const result = await updateUser(customBody, userStorage.token);

    if (result.success) {
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

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {user ? (
        <div className="flex flex-col items-center justify-center py-12">
          {userStorage.isAdmin || user._id === userStorage._id ? (
            <div className="w-full max-w-2xl p-8 bg-white border-4 border-black rounded-lg shadow-lg">
              <p className="mb-6 text-5xl text-center text-black font-doodles">
                {user.email}
              </p>
              {message && (
                <p className={`text-center text-xl mb-6 text-justicefest ${messageStyle}`}>
                  {message}
                </p>
              )}
              <div className="flex flex-col items-center">
                <ComicButton
                  onClick={handleDeleteProfile}
                  className="mb-8 text-white bg-red-500 hover:bg-red-700"
                >
                  Supprimer le Profil ?
                </ComicButton>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={handleUpdateProfile}
                >
                  {({ isSubmitting }) => (
                    <div className="w-full p-8 bg-cover rounded-lg">
                      <Link to="/" className="block mb-4">
                        <img
                          alt="mini logo"
                          src="/images/ReadMeMini.png"
                          className="mx-auto"
                        />
                      </Link>
                      <p className="mb-6 text-3xl text-center font-doodles">
                        Editer Profil :
                      </p>
                      <Form className="space-y-4 font-doodles">
                        <FormField name="email" label="Email" type="email" />
                        <FormField name="password" label="Mot de Passe" type="password" />
                        <ComicButton
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full text-white bg-blue-500 hover:bg-blue-700"
                        >
                          {isSubmitting ? "Modification en cours..." : "Modifier"}
                        </ComicButton>
                      </Form>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          ) : (
            <p className="text-2xl text-center text-red-500">Accès non autorisé</p>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-2xl text-gray-700">Chargement...</p>
        </div>
      )}
    </div>
  );
}

export default User;