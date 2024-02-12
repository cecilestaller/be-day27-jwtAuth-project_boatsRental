// removeBoot(bootId) function mit Boot.findByIdAndDelete(bootId)
import { Boot } from "../models/index.js";

export const removeBoot = async (bootId, authenticatedUserId) => {
  const foundBoot = await Boot.findById(bootId);
  if (!foundBoot) throw new Error("Boot doesn't exist");

  // authorization step:
  if (foundBoot.userId.toString() !== authenticatedUserId)
    throw new Error("You cannot remove boats created by other users!");
  const deletedBoot = await Boot.findByIdAndDelete(bootId);
  return deletedBoot;
};
