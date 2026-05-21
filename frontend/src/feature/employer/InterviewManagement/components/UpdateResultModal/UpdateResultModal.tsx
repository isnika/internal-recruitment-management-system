import React, { useState } from "react";
import Modal from "../BaseModal/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  data: any;
  onSave: (updated: any) => void;
};

const UpdateResultModal = ({ open, onClose, data, onSave }: Props) => {
  const [status, setStatus] = useState(data?.status || "DONE");
  const [note, setNote] = useState("");

  const handleSave = () => {
    onSave({
      ...data,
      status,
      note,
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Update Interview Result">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PASS">PASS</option>
          <option value="FAIL">FAIL</option>
          <option value="DONE">DONE</option>
        </select>

        <label>Note</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />

        <button onClick={handleSave}>Update</button>
      </div>
    </Modal>
  );
};

export default UpdateResultModal;