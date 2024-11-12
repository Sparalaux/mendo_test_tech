import { Link } from "react-router-dom";
import BookCategories from "./BookCategories";

export function BookCard({ book }) {
    return (
      <Link to={`/${book._id}`} className="block group">
        <div className="relative p-4 transition-transform transform group-hover:scale-105">
          <div className="relative z-10">
            <div className="mb-4 aspect-w-3 aspect-h-4">
              {book.images.length === 0 ? (
                <img
                  alt="Affichage basique du livre"
                  src="/images/cadre.png"
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  alt="Affichage donné dans la BD du livre"
                  src={book.images[0]}
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <div className="text-center">
              <h3 className="mb-1 text-xl font-comic line-clamp-2">{book.title}</h3>
              <p className="mb-1 text-lg text-gray-600 font-comic">{book.author}</p>
              <p className="text-sm text-gray-500 font-comic">{book.publishingyear}</p>
              {book.categories && <BookCategories categories={book.categories} />}
            </div>
          </div>
        </div>
      </Link>
    );
  }