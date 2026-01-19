import { Modal } from "@/shared/ui/modal/Modal";

interface LockedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LockedModal = ({ isOpen, onClose }: LockedModalProps) => {
  return (
    <Modal $width={74} $height={48} isOpen={isOpen} onClose={onClose}>
      <h3>잠긴 섹션 🔒</h3>
      <p>이전 섹션을 완료해야 접근할 수 있어요.</p>
    </Modal>
  );
};
