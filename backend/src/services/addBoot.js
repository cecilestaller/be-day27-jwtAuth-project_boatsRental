// addBoot function mit Boot.create(bootInfo)

import { Boot } from "../models/index.js";

export const addBoot = async (bootInfo, authenticatedUserId) => {
  return Boot.create({ ...bootInfo, userId: authenticatedUserId });
};
