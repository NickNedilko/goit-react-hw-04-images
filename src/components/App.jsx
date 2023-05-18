import React, { useState, useEffect } from 'react';
import Button from './Button/Button';
import { ToastContainer, toast } from 'react-toastify';
import { InfinitySpin } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import ApiImages from 'services/Api';
import css from './App.module.css';
import Error from './Error/Error';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    async function getImages() {
      try {
        setIsLoading(true);
        const images = await ApiImages(search);

        const { hits, total } = images.data;
        toast(`Знайдено картинок ${total}`);
        if (!total) {
          toast(`Нічого не знайдено за пошуком ${search}, перевірте!!!`);
        }
        setImages(hits);
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false);
      }
    }
    if (search) {
      getImages();
    }
  }, [search]);

  useEffect(() => {
    async function getImages() {
      try {
        setIsLoading(true);
        const images = await ApiImages(search, page);
        const { hits } = images.data;
        setImages(prev => [...prev, ...hits]);
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false);
      }
    }
    if (page > 1) {
      getImages();
    }
  }, [search, page]);

  const searchInput = message => {
    setSearch(message);
    setImages(null);
    setPage(1);
  };

  const loadMoreBtn = () => setPage(prev => prev + 1);
  return (
    <>
    
      <Searchbar onSubmit={searchInput} />
      {error && <Error/>}
      <ImageGallery images={images} />
      <ToastContainer autoClose={1500} />
      {isLoading && (
        <div className={css.spinner}>
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      )}
      {images?.length && <Button onClick={loadMoreBtn} />}
    </>
  );
};

export default App;
