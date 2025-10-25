"use server";

import { z } from "zod";
import { aiMentorAssistance, AIMentorAssistanceOutput } from "@/ai/flows/ai-mentor-assistance";

const getAIHelpInput = z.object({
  topic: z.string(),
  problemDescription: z.string(),
  userCode: z.string(),
});

export type State = {
  message?: string | null;
  data?: AIMentorAssistanceOutput | null;
};

export async function getAIHelp(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = getAIHelpInput.safeParse({
    topic: formData.get("topic"),
    problemDescription: formData.get("problemDescription"),
    userCode: formData.get("userCode"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid input.",
    };
  }

  try {
    const result = await aiMentorAssistance(validatedFields.data);
    return { data: result, message: "Success" };
  } catch (error) {
    return { message: "An error occurred while getting assistance." };
  }
}
