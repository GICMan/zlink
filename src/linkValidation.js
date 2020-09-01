import { string } from "yup";

const aliasSchema = string().required("Please enter a meeting alias");

const linkSchema = string()
  .required("Please enter a link or id")
  .url("Please enter a valid url or meeting id")
  .matches(/.zoom.us\/j\//g, "Please enter a valid zoom link or id");

const idSchema = string()
  .required("Please enter a meeting link or id")
  .min(9, "ID must be between 9 and 11 digits")
  .max(11, "ID must be between 9 and 11 digits");

export default async (alias, link) => {
  try {
    await aliasSchema.validate(alias);
    if (isNaN(link)) {
      await linkSchema.validate(link);

      const splitLink = link.split(/\?pwd=|j\//);
      const id = splitLink[1];
      const password = splitLink[2];

      await idSchema.validate(id);

      return { id, password };
    } else {
      await idSchema.validate(link);
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
