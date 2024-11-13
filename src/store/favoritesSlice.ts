import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import {
  createNotificationSlice,
  NotificationSliceType,
} from "./notificationSlice";

export type FavoritesSliceType = {
  favorites: Recipe[]; //se alamacena en Recipe
  handleClickFavorite: (recipe: Recipe) => void;
  favoritesExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

//nester slices o anidados
export const createFavoritesSlice: StateCreator<
  FavoritesSliceType & RecipesSliceType & NotificationSliceType,
  [],
  [],
  FavoritesSliceType
> = (set, get, api) => ({
  favorites: [],
  //
  handleClickFavorite: (recipe) => {
    // Código para quitar la receta de los favoritos
    if (get().favoritesExists(recipe.idDrink)) {
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== recipe.idDrink
        ),
      }));
      // console.log("exitste");
      createNotificationSlice(set, get, api).showNotification({
        text: "Se elimino de favoritos",
        error: false,
      });
    }
    // Código para agregar la receta a los favoritos
    else {
      // *: esto esta pra temas mas directos y simples por rendimiento
      // set({
      //   favorites: [...get().favorites, recipe],
      // });
      set((state) => ({
        favorites: [...state.favorites, recipe],
      }));
      // console.log("no existe");
      createNotificationSlice(set, get, api).showNotification({
        text: "Se agrego a favoritos",
        error: false,
      });
    }

    createRecipesSlice(set, get, api).closeModal();

    //LOCAL STORAGE SET
    localStorage.setItem("favorites", JSON.stringify(get().favorites));
  },

  favoritesExists: (id) => {
    return get().favorites.some((favorite) => favorite.idDrink === id);
  },

  //LOCAL STORAGE GET
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites),
      });
    }
  },
  //
});

//Slice Pattern
