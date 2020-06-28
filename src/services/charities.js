import { useAuth0 } from "../react-auth0-spa";
import { api } from "../config";


export const fetchFeaturedCharity = async () => {
  const res = await fetch(`${api}/charities/single`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
    // console.log(res)
    if (!res.ok) throw new Error('couldnt load featured data');
    return await res.json();
};


export const fetchCharity = async (charity_id) => {
    const res = await fetch(`${api}/charities/${charity_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (!res.ok) throw new Error("couldnt load featured data");
    return await res.json();
}


export const apple = async (user_id) => {
  const res = await fetch(`${api}/users/${user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (!res.ok) throw new Error("couldnt load featured data");
  return await res.json();
};