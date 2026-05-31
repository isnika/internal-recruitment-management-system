import { useEffect, useState } from "react";
import Modal from "../BaseModal/Modal";

import type { Interview } from "../../types/types";

type Props = {
  open: boolean;
  onClose: () => void;
  data: Interview | null;
  onSave: (updated: {
    id: number;
    result: string;
    note?: string;
  }) => void;
};

export default function UpdateResultModal({
  open,
  onClose,
  data,
  onSave,
}: Props) {
  const [result, setResult] = useState("");
  const [note, setNote] = useState("");

  // ======================
  // SYNC DATA (SAFE)
  // ======================
  useEffect(() => {
    if (open && data) {
      setResult(data.result ?? "");
      setNote(data.note ?? "");
    }

    if (!open) {
      setResult("");
      setNote("");
    }
  }, [data, open]);

  // ======================
  // SAVE
  // ======================
  const handleSave = () => {
    if (!data) return;

    onSave({
      id: data.id,
      result,
      note,
    });

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Update Interview Result">
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {/* RESULT */}
        <label>Result</label>
        <textarea
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Enter interview result..."
        />

        {/* NOTE */}
        <label>Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note..."
        />

        {/* ACTION */}
        <button onClick={handleSave}>
          Update
        </button>
      </div>
    </Modal>
  );
}