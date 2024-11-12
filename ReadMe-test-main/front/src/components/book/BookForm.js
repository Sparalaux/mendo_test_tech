import React from "react";
import { Formik, Field, Form, FieldArray } from "formik";
import { FormField, ComicButton } from "../generic/Form";

export default function BookForm({ initialValues = {}, handleSubmit, categories }) {
  // Ensure `initialValues` has the necessary structure for both creation and updates.
  const defaultValues = {
    title: '',
    author: '',
    editor: '',
    categories: [], // Start with an empty array for dynamic slots
    description: '',
    stock: 0,
    price: 0,
    isbn: '',
    pagenumber: 0,
    publishingyear: new Date().getFullYear(),
    librarianreview: '',
  };

  // Merge the default values with any provided initialValues (useful for updates).
  const formInitialValues = { ...defaultValues, ...initialValues };

  return (
    <Formik initialValues={formInitialValues} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField name="titre" label="Titre" />
          <FormField name="author" label="Auteur" />
          <FormField name="editor" label="Éditeur" />

          {/* Dynamic Category Slots Using FieldArray */}
          <div className="col-span-2">
            <label className="flex flex-col font-comic">
              <span className="mb-1 text-lg">Categories:</span>
              <FieldArray name="categories">
                {({ push, remove }) => (
                  <div>
                    {Array.isArray(values.categories) && values.categories.length > 0 ? (
                      values.categories.map((_, index) => (
                        <div key={index} className="flex items-center mb-2">
                          <Field
                            as="select"
                            name={`categories.${index}`}
                            className="flex-grow mr-2 border rounded"
                          >
                            <option value="" label="Sélectionner une catégorie" />
                            {Array.isArray(categories) && categories.length > 0 ? (
                              categories.map((category) => (
                                <option key={category._id} value={category.name}>
                                  {category.name}
                                </option>
                              ))
                            ) : (
                              <option value="" disabled>
                                Aucune catégorie disponible
                              </option>
                            )}
                          </Field>
                          <ComicButton
                            type="button"
                            onClick={() => remove(index)}
                            className="px-2 py-1 text-sm"
                          >
                            Supprimer
                          </ComicButton>
                        </div>
                      ))
                    ) : (
                      <p>Aucune catégorie ajoutée pour ce livre.</p>
                    )}
                    <ComicButton
                      type="button"
                      onClick={() => push("")}
                      className="mt-2"
                    >
                      Ajouter une catégorie
                    </ComicButton>
                  </div>
                )}
              </FieldArray>
            </label>
          </div>

          <FormField name="description" label="Description" as="textarea" />
          <FormField name="stock" label="Stock" type="number" />
          <FormField name="price" label="Prix" type="number" />
          <FormField name="isbn" label="ISBN" />
          <FormField name="pagenumber" label="Nombre de Pages" type="number" />
          <FormField name="publishingyear" label="Année de Publication" type="number" />
          <FormField name="librarianreview" label="Avis du Libraire" as="textarea" />

          <ComicButton type="submit" className="col-span-2 mt-4">
            {initialValues._id ? "Mettre à jour" : "Créer"}
          </ComicButton>
        </Form>
      )}
    </Formik>
  );
}
