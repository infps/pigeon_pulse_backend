import got from "got";

export const getAccessToken = async (): Promise<string> => {
  try {
    const response = await got.post(
      `${process.env.PAYPAL_API_BASE}/v1/oauth2/token`,
      {
        form: {
          grant_type: "client_credentials",
        },
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      }
    );
    const data = JSON.parse(response.body);
    return data.access_token;
  } catch (error) {
    console.error("Error fetching PayPal access token:", error);
    throw new Error("Failed to fetch PayPal access token");
  }
};
