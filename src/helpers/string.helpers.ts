import crypto from "crypto";

export const getRandomId = () => crypto.randomBytes(20).toString("hex");

export const getImageTypeFromBase64 = (base64: string) => {
  const fromSlashToSemicolonRegex = /\w+(?=;)/;
  const imageType = base64.match(fromSlashToSemicolonRegex)?.[0];
  return imageType;
};
