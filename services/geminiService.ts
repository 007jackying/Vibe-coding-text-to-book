// Service disabled by user request.
export const polishText = async (text: string): Promise<string> => {
  return text;
};

export const generateStory = async (topic: string): Promise<{ title: string; content: string }> => {
  return { title: topic, content: "Feature disabled." };
};