import Handlebars from "handlebars";

export function renderTemplate(
  templateStr: string,
  variables: Record<string, string | number>
): string {
  const template = Handlebars.compile(templateStr);

  return template(variables);
}
