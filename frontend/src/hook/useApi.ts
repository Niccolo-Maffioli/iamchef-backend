import { useState, useEffect } from "react";
import useIntroPageStore from "./useApiKeyStore";

interface UseApiReturn<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export function useApi<T = any>(url: string): UseApiReturn<T> {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(url);

				if (!response.ok) {
					throw new Error(`Errore API (${response.status})`);
				}

				const result = await response.json();

				if (!cancelled) {
					const payload = Array.isArray(result)
						? result
						: (result.results ?? result);
					setData(payload as T);
				}
			} catch (err) {
				if (!cancelled) {
					setError((err as Error).message);
				}
			} finally {
				if (!cancelled) {
					setLoading(false);
				}
			}
		};

        if(url.length > 0)
        {
            fetchData();
        }

		return () => {
			cancelled = true;
		};
	}, [url]);

	return { data, loading, error };
}

/**
 * funzione di helper per costruire l'URL con i parametri necessari
 * @param query stringa di ricerca
 * @returns URL completo per la chiamata API
 */

export const getIngredientURL = (query: string) =>
{
    const ENDPOINT = "/food/ingredients/search";
    const resultsNum = 10;
	const apiKey = useIntroPageStore.getState().apiKey;

    return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?apiKey=${apiKey}&query=${query}&number=${resultsNum}`;
}

export const getRecipeURL = (query: string) => {
	const ENDPOINT = "/recipes/findByIngredients";
	const apiKey = useIntroPageStore.getState().apiKey;
	const params = new URLSearchParams({
		apiKey,
		ingredients: query,
		number: "10",
		ranking: "2",
		ignorePantry: "true",
	});

	return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?${params.toString()}`;
}

export const getRecipeInformationURL = (id: number) => {
	const apiKey = useIntroPageStore.getState().apiKey;
	const ENDPOINT = `/recipes/${id}/information`;
	const params = new URLSearchParams({
		apiKey,
		includeNutrition: "false",
	});

	return `${import.meta.env.VITE_BASE_URL}${ENDPOINT}?${params.toString()}`;
}