import * as React from "react";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-text-muted">
      <Star className="w-16 h-16 mb-4 opacity-50" />
      <h2 className="text-xl font-display font-medium text-text-primary mb-2">Favorites</h2>
      <p className="text-sm">No favorite formulas or calculations saved yet.</p>
    </div>
  );
}
