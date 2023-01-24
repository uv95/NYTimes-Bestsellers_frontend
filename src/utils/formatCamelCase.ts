export const formatCamelCase = (text: string) => {
  const formattedText = text
    .split(/(?=[A-Z])/)
    .map((word, i) => {
      if (i === 0) return word[0].toUpperCase() + word.slice(1);
      return word.toLowerCase();
    })
    .join(' ');

  return formattedText;
};
