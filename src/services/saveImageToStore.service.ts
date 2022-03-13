import { ResponseMessages } from "../constants/messages.constants";
import { IResponse } from "../interfaces/response.interfaces";
import { getImageTypeFromBase64, getRandomId } from "../helpers/string.helpers";
import { Paths } from "../constants/path.constants";
import { writeFile } from "fs";

export const saveImageToStore = (dataUrl: string): Promise<IResponse> => {
  let base64Image = dataUrl.split(";base64,").pop() as string;
  const imageType = getImageTypeFromBase64(dataUrl);
  const imageName = `${getRandomId()}.${imageType}`;

  return new Promise((resolve, reject) => {
    writeFile(
      Paths.storage(imageName),
      base64Image,
      { encoding: "base64" },
      (err) => {
        if (err)
          reject({
            status: "error",
            data: null,
            message: err.message,
          } as IResponse);
        else
          resolve({
            status: "success",
            data: imageName,
            message: ResponseMessages.fileSuccessSave,
          } as IResponse);
      }
    );
  });
};
