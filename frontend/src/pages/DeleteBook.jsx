import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        // alert('Check console for error');
        enqueueSnackbar('Failed to delete book', { variant: 'error' });
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div 
      className='flex flex-col items-center border-2 rounded-xl border-sky-400 w-[600px] p-8 mx-auto'
      >
        <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
        <button 
          className='bg-red-500 text-white m-8 w-full' 
          onClick={handleDeleteBook}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteBook