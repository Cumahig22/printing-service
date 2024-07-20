import axios from "axios";

export async function getQueue(id, token) {
  let res = await axios.get(
    `https://staging.onecoopbank.com/gate/kiosk/${id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  return res;
}
