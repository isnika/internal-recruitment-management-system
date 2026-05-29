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

  // sync data khi mở modal
  useEffect(() => {
    if (data) {
      setResult(data.result || "");
      setNote(data.note || "");
    }
  }, [data, open]);

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
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label>Result</label>
        <textarea
          value={result}
          onChange={(e) => setResult(e.target.value)}
          placeholder="Enter interview result..."
        />

        <label>Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Optional note..."
        />

        <button onClick={handleSave}>
          Update
        </button>
      </div>
    </Modal>
  );
}