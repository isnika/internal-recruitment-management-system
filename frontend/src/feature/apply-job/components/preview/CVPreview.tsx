import { useState } from "react";

const CVPreview = ({ fileUrl }: { fileUrl?: string }) => {
  const [error, setError] = useState(false);

  if (!fileUrl || error) {
    return <div> No CV file available</div>;
  }

  return (
    <iframe
      src={fileUrl}
      width="100%"
      height="500px"
      style={{ border: "none", borderRadius: "8px" }}
      onError={() => setError(true)}
    />
  );
};

export default CVPreview;