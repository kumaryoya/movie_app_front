import React from 'react';
import Modal from 'react-modal';

const DeleteConfirmModal: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>削除確認</h2>
      <p>この映画を削除してもよろしいですか？</p>
      <button onClick={onConfirm}>はい</button>
      <button onClick={onClose}>いいえ</button>
    </Modal>
  );
};

export default DeleteConfirmModal;
