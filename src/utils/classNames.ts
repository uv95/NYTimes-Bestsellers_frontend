export const classNames = (
  mainClass: string,
  ...conditionalClasses: (boolean | string | undefined)[]
) => {
  if (!conditionalClasses.length) return '';
  const filtered = conditionalClasses
    .map((el) => (!!el ? `${mainClass}--${el}` : ''))
    .join(' ')
    .trim();

  return filtered;
};
