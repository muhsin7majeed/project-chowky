import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const isSidebarOpenAtom = atomWithStorage("isSidebarOpen", true);

export const useIsSidebarOpen = () => {
  return useAtomValue(isSidebarOpenAtom);
};

export const useSetIsSidebarOpen = () => {
  return useSetAtom(isSidebarOpenAtom);
};

export const useIsSidebarOpenAtom = () => {
  return useAtom(isSidebarOpenAtom);
};
