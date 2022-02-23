const addUserToNotifications = async (email: string, threshold: number) => {
  return fetch(
    "https://us-central1-gas-fees-crypto.cloudfunctions.net/webApi/api/v1/addUserToNotifications",
    {
      method: "POST",
      body: JSON.stringify({
        email,
        threshold,
      }),
    }
  );
};

export default addUserToNotifications;
