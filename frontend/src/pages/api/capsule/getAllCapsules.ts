import { APIResponse } from "@/common/types/APIResponse";
import { Capsules } from "@/common/types/Capsule/Capsule";

export const getAllCapsules = async (
  access_token: string,
  tag?: string,
  location?: string,
  person?: string,
  institution?: string,
): Promise<Capsules> => {
  try {
    const page_size = 20;

    let url = `${process.env.NEXT_PRIVATE_API_URL}/capsule/?page_size=${page_size}`;

    if (tag) {
      url += `&tag=${tag}`;
    }

    if (location) {
      url += `&location=${location}`;
    }

    if (person) {
      url += `&person=${person}`;
    }

    if (institution) {
      url += `&institution=${institution}`;
    }

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
