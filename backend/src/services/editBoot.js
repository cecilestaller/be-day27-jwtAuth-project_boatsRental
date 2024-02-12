// evtl editBoot function um andere Änderungen am Boot durcgzuführen....

import { Boot } from "../models/index.js";

export const editBoot = async (bootInfo, bootId) => {
  const filter = { _id: bootId };
  const update = {
    name: bootInfo.name,
    baujahr: bootInfo.baujahr,
    serienNr: bootInfo.serienNr,
    material: bootInfo.material,
    bootsart: bootInfo.bootsart,
    bildUrl: bootInfo.bildUrl,
    reservierung: bootInfo.reservierung
  };
  const bootUpdate = Boot.findOneAndUpdate(filter, update, { new: true });
  return bootUpdate;
};
