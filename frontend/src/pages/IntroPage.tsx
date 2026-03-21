import { useState } from "react";
import useIntroPageStore from "../hook/useApiKeyStore";
import "../style/IntroPage.css";

type IntroPageProps = {
  goToHomePage: () => void;
};


const IntroPage = ({ goToHomePage }: IntroPageProps) => {
  const { setApiKey } = useIntroPageStore();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Inserisci la tua API key");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        apiKey: trimmed,
        number: "1",
      });

      const url = `${import.meta.env.VITE_BASE_URL}/recipes/random?${params.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("API key non valida o scaduta");
        }
        throw new Error(`Errore di validazione (${response.status})`);
      }

      const data = await response.json();
      if (data?.status === "failure") {
        throw new Error(data?.message ?? "API key non valida");
      }

      setApiKey(trimmed);
      goToHomePage();
    } catch (err) {
      setError((err as Error).message ?? "Impossibile validare la chiave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="intro-page">
      <div className="intro-card">
        <div className="intro-icon" aria-hidden="true">
          🔑
        </div>
        <h1>Benvenuto in IAmChef</h1>
        <p>
          Inserisci la tua API key di Spoonacular per iniziare a cercare ingredienti e ricette
          personalizzate.
        </p>

        <label className="input-label" htmlFor="api-key">
          API Key
        </label>
        <input
          id="api-key"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Es. 1234abcd..."
          autoComplete="off"
        />

        <button
          className="btn primary"
          onClick={handleSubmit}
          disabled={!value.trim() || loading}
        >
          {loading ? "Verifica in corso..." : "Salva e continua"}
        </button>

        {error && <span className="error-text">{error}</span>}

        <span className="helper-text">
          Non hai ancora una chiave? Ottienila dal tuo account Spoonacular.
        </span>
      </div>
    </div>
  );
}

export default IntroPage;