import { api } from "../config";


export const fetchFeaturedCharity = async () => {
  const res = await fetch(`${api}/charities/single`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error('couldn"t load featured data');
    return await res.json();
};


export const fetchCharity = async (charity_id) => {
    const res = await fetch(`${api}/charities/${charity_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("couldn't load featured data");
    return await res.json();
}


