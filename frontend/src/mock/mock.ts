import type { RecipeType } from "../Types/recipes";

export const recipesMock: RecipeType[] = [
    {
        id: 1,
        name: "Pasta al pomodoro",
        imageUrl: "https://picsum.photos/seed/pasta/800/600",
        description: "Un classico della cucina italiana, semplice e veloce.",
        instructions: "Cuoci la pasta, prepara il sugo e unisci tutto con basilico fresco.",
        ingredients: [
            { id: 101, name: "Pasta", quantity: "200 g" },
            { id: 102, name: "Passata di pomodoro", quantity: "250 g" },
            { id: 103, name: "Basilico", quantity: "q.b." },
        ],
    },
    {
        id: 2,
        name: "Insalata di ceci",
        imageUrl: "https://picsum.photos/seed/insalata/800/600",
        description: "Fresca e nutriente, perfetta per l'estate.",
        instructions: "Mescola i ceci con verdure a cubetti e condisci con olio e limone.",
        ingredients: [
            { id: 201, name: "Ceci", quantity: "200 g" },
            { id: 202, name: "Pomodorini", quantity: "120 g" },
            { id: 203, name: "Cipolla rossa", quantity: "1/2" },
        ],
    },
];

export default recipesMock;