import React from "react";

export function ToggleButton({ label, open, onClick }) {
  return (
    <div className="flex items-center self-center justify-center">
      <p className="font-justicefest text-4xl py-3.5">{label} :</p>
      <button
        onClick={onClick}
        className="font-justicefest text-6xl py-3.5 border-b border-t border-solid border-black px-2 py-2 rounded-md"
      >
        {open ? "Fermer" : "Ouvrir"}
      </button>
    </div>
  );
}