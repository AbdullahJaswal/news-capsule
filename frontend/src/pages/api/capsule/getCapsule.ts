import { Capsule } from "@/common/types/Capsule/Capsule";

export const getCategory = async (slug: string, access_token: string): Promise<Capsule> => {
  try {
    const url = `${process.env.NEXT_PRIVATE_API_URL}/capsule/${slug}/`;

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
