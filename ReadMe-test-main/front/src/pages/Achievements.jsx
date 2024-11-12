import React, { useState, useEffect } from "react";
import { fetchBooks } from "../services/bookService";
import { ComicButton } from "../components/generic/Form";
import { fetchCategories } from "../services/categoryService";
import Header from "../components/Header";

function Achievements() {
  const [tickets, setTickets] = useState([
    { 
      id: 1, 
      title: "Demande non résolue",
      description: "Do you sell this book? I was looking through the catalog but couldn’t find a way to buy it. Is it possible to purchase directly from your site?", 
      image: "",
      category: "L1", 
      email: "sophie.b@example.com", 
      status: "show", 
      resolved: "not detecting" 
    },
    { 
      id: 2, 
      title: "Requête sur le catalogue",
      description: "How can I search for books by a specific author? It’s not very clear where to do that, and I’m struggling to find the books I want.", 
      image: "",
      category: "L1", 
      email: "claire.l@example.com", 
      status: "show", 
      resolved: "not detecting" 
    },
    { 
      id: 3, 
      title: "Ouli... quoi ?",
      description: "Salut, j'ai vu une catégorie qui s'appelle 'Oulipo'. À quoi ça correspond exactement ?", 
      image: "",
      category: "L1", 
      email: "michael.t@example.com", 
      status: "show", 
      resolved: "not detecting" 
    },
    { 
      id: 4, 
      title: "Une Histoire Mythique",
      description: "Bonjour, la catégorie 'Mythe' semble avoir disparu du site. Est-ce que c’est un bug ou elle a été supprimée ?", 
      image: "",
      category: "L2", 
      email: "claire.l@example.com", 
      status: "show", 
      resolved: "pending" 
    },
    { 
      id: 6, 
      title: "Test Test 1 2",
      description: "Hey, just wanted to let you know that I found a 'Test' category.", 
      image: "",
      category: "L2", 
      email: "michael.t@example.com", 
      status: "show", 
      resolved: "pending" 
    },
    { 
      id: 7, 
      title: "Doublons de livres",
      description: "Je crois qu'il y a des doublons dans la liste des livres. J'ai vu le même livre apparaître plusieurs fois.", 
      image: "",
      category: "L2", 
      email: "camille.v@example.com",
      status: "show", 
      resolved: "pending" 
    },
    { 
      id: 16, 
      title: "Book Not Found",
      description: "Every time I try to view the details of a book.",
      image: "",
      category: "L3", 
      email: "peter.w@example.com", 
      status: "show", 
      resolved: "pending" 
    },
    { 
      id: 14, 
      title: "Plus Disponible Mais on a toujours du stock",
      description: "Impossible d'ajouter un livre. Peux-tu corriger ça ? C’est un peu urgent.",
      image: "",
      category: "L3", 
      email: "alexandre@mendo.ai",
      status: "show", 
      resolved: "not detecting" 
    },
    { 
      id: 20, 
      title: "What is this ?",
      description: "There is a black dot showing near every book",
      image: "",
      category: "L3", 
      email: "maxime@gmail.com",
      status: "show", 
      resolved: "not detecting" 
    },
    { 
      id: 22, 
      title: " c'e....st .... le....nt",
      description: "le site est lent pour moi", 
      image: "",
      category: "L3", 
      email: "yann@gmail.com", 
      status: "show", 
      resolved: "not detecting" 
    },
    { 
      id: 18, 
      title: "Deco ?",
      description: "voir image", 
      image: "./images/error1.png",
      category: "L3", 
      email: "alexandre@mendo.ai", 
      status: "show", 
      resolved: "not detecting" 
    },
    {
      id: 70,
      title: "Images de couverture manquantes dans le formulaire Book",
      description: "Le formulaire de création de livre ne permet pas d'ajouter une image de couverture mais devrait pouvoir le faire.",
      category: "L3",
      email: "eray@mendo.ai",
      status: "show", 
      resolved: "not detecting"
    },    
    {
      id: 80,
      title: "Broken Filter?",
      description: "Some books don't seem to filter into the right category (check category 'Fantastique').",
      category: "L3",
      email: "charlotte@mycowork.pizza",
      status: "show", 
      resolved: "not detecting"
    },    
    { 
      id: 10, 
      title: "Search Your Author",
      description: "Hey, would be nice to filter using the author with a searchbar. Any chance this could be added? endpoint /api/books/search and with a variable input (text written to search the author name) in the body of the request", 
      category: "Feature Request", 
      email: "ines@mendo.ai", 
      status: "show", 
      resolved: "pending" 
    },
    { 
      id: 13, 
      title: "Akinator du Livre",
      description: "Bonjour, je suis la personne qui te regarde actuellement et je pense que ce serait bien de créer un système qui recommande des livres en fonction des préférences des utilisateurs. Tu pourrais mettre en place quelque chose pour cela ? Il faudrait que tu fasses des requêtes à l'API OpenAI dans l'API Readme, et que tu ajoutes le nécessaire dans le backend et le frontend. La demande doit être envoyée à l'endpoint /api/books/bookinator, avec un corps acceptant une variable appelée input. La page correspondante est déjà créée, à toi de jouer !", 
      category: "Feature Request", 
      email: "rayane@mendo.ai", 
      status: "show", 
      resolved: "pending" 
    },
  ]);
  const [message, setMessage] = useState(null);
  const [visibility, setVisibility] = useState({
    L1: false,
    L2: false,
    L3: true,
    'Feature Request': true,  
  });
  const userStorage = JSON.parse(localStorage.getItem("user"));

  const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzE5MDg2ZDg4YmRlMzE5N2FjMzA2MmEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzAzNjg5NTksImV4cCI6NDEwMjQ0NDgwMH0.cWl7DeJipFpMkwDU1MZ6oOPWFLmtSudzTIZ14zhddNw";
  const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzFlZDZiNTNiNzg1OTNhNTRjOWFjMTYiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzMwMDc0NjI2LCJleHAiOjQxMDI0NDQ4MDB9.BxUPmr829R1qDvFPuonpEBFdO1BhnFdQ_Zw4QNXXQT8";

  const toggleVisibility = (category) => {
    setVisibility((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  useEffect(() => {
    const checkTicketsStatus = async () => {

      try {
        const books = await fetchBooks();
        const categories = await fetchCategories();
        const testCategoryExists = categories.some((category) => category.name.toLowerCase() === "Test".toLowerCase());
        const mythCategoryExists = categories.some((category) => category.name.toLowerCase() === "Mythe".toLowerCase());

        const bookinatorResponse = await fetch("/api/books/bookinator", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify({ input: "Hey Mate" })
        });
        
        const isBookinatorResolved = bookinatorResponse.ok;
        
        const searchResponse = await fetch("/api/books/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify({ input: "Hey Mate" })
        });
        
        const isSearchResolved = searchResponse.ok;
        
        const checkBook = await fetch(`/api/books/67190aab88bde3197ac30020`);
        const canUserCheckIt = checkBook.ok;        


        const updatedTickets = tickets.map((ticket) => {
          switch (ticket.id) {
            case 1:
              return { ...ticket, resolved: "not detecting" };
            case 2:
              return { ...ticket, resolved: "not detecting" };
            case 3:
              return { ...ticket, resolved: "not detecting" };
            case 4:
              return { ...ticket, resolved: mythCategoryExists ? "resolved" : "pending" };
            case 6:
              return { ...ticket, resolved: !testCategoryExists ? "resolved" : "pending" };
            case 7:
              const uniqueBooks = new Set(books.map((book) => book.title.trim().toLowerCase()));
              const hasDuplicates = uniqueBooks.size !== books.length;
              return { ...ticket, resolved: !hasDuplicates ? "resolved" : "pending" };
            case 16:
              return { ...ticket, resolved: canUserCheckIt ? "resolved" : "pending" };
            case 10:
              return { ...ticket, resolved: isSearchResolved ? "resolved" : "pending" };
            case 13:
              return { ...ticket, resolved: isBookinatorResolved ? "resolved" : "pending" };
            default:
              return ticket;
          }
        });

        setTickets(updatedTickets);
      } catch (error) {
        console.error("Error checking tickets:", error);
        setMessage("Erreur lors de la récupération du statut des tickets.");
      }
    };

    checkTicketsStatus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <h1 className="py-8 text-4xl text-center font-doodles">Réalisations des Tickets</h1>
      <section className="max-w-4xl p-6 mx-auto mb-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-4 text-2xl font-semibold">Test Technique Mendo</h2>
        <p className="text-gray-700">
          👋 Bienvenue dans ce test technique ! On souhaite évaluer ta capacité à analyser et résoudre des problèmes techniques en tant que support. Pour cet exercice, tu vas te mettre dans la peau d’un support pour le site <strong>Readme</strong>, un site vitrine de livres. Ta mission ? Gérer les tickets des utilisateurs et les aider au mieux possible.
        </p>
        <p className="mt-4 text-red-700">
          ⚠️<strong>L'Examinateur 'Moi' (mais celui du futur) veut voir comment tu te débrouilles. Du coup, tu te concentreras d'abord sur les tickets L3, les Feature Requests, et la recherche de bugs non indiqués. Si tu finis rapidement, tu pourras t'occuper des autres tickets L2/L1. C'est avant tout un test technique en programmation 🙂. Mais pas de pression, on ne s'attend pas à ce que tu termines tout le test technique. Le plus important, c’est de voir ta manière de réfléchir et d'aborder les problèmes.</strong>
        </p>
        <p className="mt-4 text-red-700">
          💡 Comme indiqué, certains bugs ou comportements inattendus ne sont pas mentionnés dans les tickets. À toi de les identifier en explorant l'application de près. C’est là que ton œil de détective fait la différence ! 🕵️‍♂️
        </p>
        <p className="mt-4 text-red-700">
          Pour accéder à la page admin de Readme, utilise ces identifiants :
        </p>
        <p className="mt-2 text-red-700">
          🔑 <strong>Identifiant Admin :</strong> support@mendo.ai<br />
          🔒 <strong>Mot de passe :</strong> Ilovemendo31
        </p>
        <p className="mt-4 text-gray-700">
          🎯 L’objectif, c’est de voir comment tu t'appropries le rôle de support mais surtout de développeur, alors fais au mieux et amuse-toi en même temps. Bonne chance, et on a hâte de découvrir ton travail ! 😊
        </p>
      </section>

      {/* Toggle buttons for each category */}
      <div className="mb-4 text-center">
        <button
          onClick={() => toggleVisibility('L1')}
          className="px-4 py-2 m-2 text-white bg-yellow-400 rounded"
        >
          {visibility.L1 ? "Masquer" : "Afficher"} Tickets L1
        </button>
        <button
          onClick={() => toggleVisibility('L2')}
          className="px-4 py-2 m-2 text-white bg-orange-500 rounded"
        >
          {visibility.L2 ? "Masquer" : "Afficher"} Tickets L2
        </button>
        <button
          onClick={() => toggleVisibility('L3')}
          className="px-4 py-2 m-2 text-white bg-red-600 rounded"
        >
          {visibility.L3 ? "Masquer" : "Afficher"} Tickets L3
        </button>
        <button
          onClick={() => toggleVisibility("Feature Request")}
          className="px-4 py-2 m-2 text-white bg-green-500 rounded"
        >
          {visibility["Feature Request"] ? "Masquer" : "Afficher"} Feature Requests
        </button>
      </div>

      {message && <p className="m-4 text-lg text-center text-red-500">{message}</p>}
      
      <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-lg">
        <ul className="space-y-4">
          {tickets
            .filter(ticket => visibility[ticket.category])
            .map((ticket) => (
              <li
                key={ticket.id}
                className={`p-4 border-2 rounded-lg ${
                  ticket.category === "L1"
                    ? "border-yellow-500 bg-yellow-100"
                    : ticket.category === "L2"
                    ? "border-orange-500 bg-orange-100"
                    : ticket.category === "L3"
                    ? "border-red-600 bg-red-100"
                    : "border-green-500 bg-green-100"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-lg font-bold">{ticket.title}</span>
                    <span className="block text-sm">{ticket.description}</span>
                    <span className="block text-base font-semibold text-gray-600">
                      Catégorie : {ticket.category} | Email : {ticket.email}
                    </span>
                    {ticket.image ? (
                      <div className="mt-2">
                        <img
                          alt="ticket image"
                          src={ticket.image}
                          className="object-cover w-16 h-16 transition-opacity duration-200 rounded cursor-pointer hover:opacity-80"
                          onClick={() => window.open(ticket.image, "_blank")}
                        />
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <span
                    className={`text-lg ${
                      ticket.resolved === "resolved"
                        ? "text-green-600"
                        : ticket.resolved === "not detecting"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {ticket.resolved === "resolved"
                      ? "Résolu"
                      : ticket.resolved === "not detecting"
                      ? "Non détectable"
                      : "En attente"}
                  </span>
                </div>
              </li>
            ))}
        </ul>
        <div className="mt-8 text-center">
          <ComicButton
            onClick={() => window.location.reload()}
            className="text-white bg-blue-500 hover:bg-blue-700"
          >
            Rafraîchir le statut
          </ComicButton>
        </div>
      </div>
    </div>
  );
}

export default Achievements;
