import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useAppStore } from "../store/useAppStore";
import { Recipe } from "../types";

export default function Modal() {
  const {
    modal,
    closeModal,
    selectedRecipe,
    handleClickFavorite,
    favoritesExists,
  } = useAppStore();

  const renderIngredients = () => {
    // ! EN VEZ DE FOR: return Array.from({ length: 6 }, (_, index) => {
    const ingredients: JSX.Element[] = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof Recipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof Recipe];

      if (ingredient && measure) {
        //*push => se llena un array | NO STATE
        ingredients.push(
          <li key={i} className="text-lg font-normal">
            {ingredient} - {measure}
          </li>
        );
        // ! ) : null; __! }).filter(Boolean) as JSX.Element[];
      }
    }

    return ingredients;
  };

  return (
    <>
      <Dialog
        open={modal}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeModal}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
              <DialogTitle
                as="h3"
                className="text-gray-900 text-4xl font-extrabold my-5 text-center"
              >
                {selectedRecipe.strDrink}
              </DialogTitle>

              <img
                src={selectedRecipe.strDrinkThumb}
                alt={`Imagen de ${selectedRecipe.strDrink}`}
                className="mx-auto w-96"
              />

              <DialogTitle
                as="h3"
                className="text-gray-900 text-2xl font-extrabold my-5"
              >
                Ingredientes y Cantidades
              </DialogTitle>

              {renderIngredients()}

              <DialogTitle
                as="h3"
                className="text-gray-900 text-2xl font-extrabold my-5"
              >
                Instrucciones
              </DialogTitle>

              <p className="text-lg">{selectedRecipe.strInstructions}</p>

              <div className="mt-5 flex justify-between gap-4">
                <button
                  type="button"
                  className="w-full rounded bg-gray-600 text-white p-3 font-bold uppercase shadow hover:bg-gray-400"
                  onClick={closeModal}
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  className="w-full rounded bg-orange-600 text-white p-3 font-bold uppercase shadow hover:bg-orange-400"
                  onClick={() => handleClickFavorite(selectedRecipe)} //la receta esta en selectedRecipe
                >
                  {favoritesExists(selectedRecipe.idDrink)
                    ? "Eliminar favorito"
                    : "Agregar a favoritos"}
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
