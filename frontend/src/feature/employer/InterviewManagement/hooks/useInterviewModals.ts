import { useState } from "react";
import type  { Interview } from "../types/types";

export default function useInterviewModals() {
  const [selected, setSelected] = useState<Interview | null>(null);

  const [openView, setOpenView] = useState(false);
  const [openReschedule, setOpenReschedule] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  return {
    selected,
    setSelected,
    openView,
    setOpenView,
    openReschedule,
    setOpenReschedule,
    openUpdate,
    setOpenUpdate,
  };
}