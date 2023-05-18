import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ item: { webformatURL, tags, largeImageURL } }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
        onClick={toggleModal}
      />
      {showModal && (
        <Modal largeImageURL={largeImageURL} alt={tags} onModal={toggleModal} />
      )}
    </div>
  );
};

export default ImageGalleryItem;
