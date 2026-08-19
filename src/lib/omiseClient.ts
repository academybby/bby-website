declare global {
  interface Window {
    Omise?: {
      setPublicKey: (key: string) => void;
      createToken: (
        type: "card",
        card: {
          name: string;
          number: string;
          expiration_month: number;
          expiration_year: number;
          security_code: string;
        },
        callback: (statusCode: number, response: { id?: string; message?: string }) => void
      ) => void;
    };
  }
}

interface CardInput {
  name: string;
  number: string;
  expirationMonth: number;
  expirationYear: number;
  cvv: string;
}

export function createCardToken(card: CardInput): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!window.Omise) {
      reject(new Error("Omise.js failed to load"));
      return;
    }
    const publicKey = import.meta.env.VITE_OMISE_PUBLIC_KEY;
    if (!publicKey) {
      reject(new Error("Missing VITE_OMISE_PUBLIC_KEY"));
      return;
    }
    window.Omise.setPublicKey(publicKey);
    window.Omise.createToken(
      "card",
      {
        name: card.name,
        number: card.number.replace(/\s+/g, ""),
        expiration_month: card.expirationMonth,
        expiration_year: card.expirationYear,
        security_code: card.cvv,
      },
      (statusCode, response) => {
        if (statusCode === 200 && response.id) {
          resolve(response.id);
        } else {
          reject(new Error(response.message || "Failed to tokenize card"));
        }
      }
    );
  });
}
