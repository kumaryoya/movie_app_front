import React from 'react';
import Modal from 'react-modal';

const DeleteConfirmModal: React.FC<{
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void
}> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className='items-center text-center mx-20 py-5'>
        <p className='py-12'>この投稿を削除してもよろしいですか？</p>
        <button className='btn mx-5 my-12' onClick={onConfirm}>はい</button>
        <button className='btn mx-5 my-12' onClick={onClose}>いいえ</button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmModal;
