import { APIResponse } from "@/common/types/APIResponse";
import { Capsule } from "@/common/types/News/Capsule";

export const getAllCapsules = async (access_token: string): Promise<APIResponse<Capsule>> => {
  try {
    const page_size = 20;
    const url = `${process.env.NEXT_PRIVATE_API_URL}/news/capsule/?page_size=${page_size}`;

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
