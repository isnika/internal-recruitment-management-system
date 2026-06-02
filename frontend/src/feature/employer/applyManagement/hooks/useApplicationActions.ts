import { useState } from 'react';
import applicationApi from '../../../../service/applicationApi';

export const useApplicationActions = (onSuccess?: () => void) => {
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const updateStatus = async (applicationId: number, newStatus: string) => {
    setUpdatingId(applicationId);
    try {
      await applicationApi.updateApplicationStatus(applicationId, { status: newStatus });
      if (onSuccess) onSuccess();
    } catch (error) {
      alert("Cập nhật trạng thái thất bại. Vui lòng thử lại!");
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    updateStatus,
    isUpdating: updatingId !== null,
    updatingId,
  };
};