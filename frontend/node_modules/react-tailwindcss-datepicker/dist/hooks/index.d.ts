import { RefObject } from "react";
export default function useOnClickOutside(ref: RefObject<HTMLDivElement>, handler: (e?: MouseEvent | TouchEvent) => void): void;
