const conf = {
  serverUrl: String(import.meta.env.VITE_SERVER_URL),
  sendigFrom: String(import.meta.env.VITE_EMAIL_Id),
  stripePublicKey : String(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
};

export default conf;
