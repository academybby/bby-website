import Omise from "omise";

type OmiseClient = ReturnType<typeof Omise>;

let client: OmiseClient | null = null;

export function getOmise(): OmiseClient {
  if (client) return client;

  const secretKey = process.env.OMISE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Missing OMISE_SECRET_KEY environment variable");
  }

  client = Omise({ secretKey, omiseVersion: "2019-05-29" });
  return client;
}
