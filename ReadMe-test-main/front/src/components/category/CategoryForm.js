import React from "react";
import { Formik, Field, Form } from "formik";
import { ComicButton } from "../generic/Form";

export default function CategoryForm({ categories = [], handleSubmit, handleDelete }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Form for Creating a New Category */}
      <div className="p-6 bg-white border border-gray-300 rounded-lg">
        <Formik initialValues={{ name: "" }} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <label className="flex flex-col font-comic">
                <span className="mb-1 text-lg">Créer une catégorie :</span>
                <Field
                  name="name"
                  placeholder="Category Name"
                  className="p-2 border rounded"
                />
              </label>
              <ComicButton type="submit" disabled={isSubmitting} className="self-end">
                {isSubmitting ? "Creating..." : "Créer"}
              </ComicButton>
            </Form>
          )}
        </Formik>
      </div>

      {/* Form for Deleting a Category */}
      <div className="p-6 bg-white border border-gray-300 rounded-lg">
        <Formik initialValues={{ name: "" }} onSubmit={handleDelete}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <label className="flex flex-col font-comic">
                <span className="mb-1 text-lg">Supprimer la catégorie :</span>
                <Field
                  as="select"
                  name="name"
                  className="p-2 border rounded"
                >
                  <option value="" disabled>
                    Sélectionnez une catégorie à supprimer                  
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </label>
              <ComicButton type="submit" disabled={isSubmitting} className="self-end">
                {isSubmitting ? "Deleting..." : "Supprimer"}
              </ComicButton>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
