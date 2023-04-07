import Navbar from '../Navbar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../services/Authentication';
import '../App.css';

const queryUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/query';
const connectstorageUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/connectstorage';
const subscribeUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/subscribe';
function QueryPage() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [imageUrls, setImageUrls] = useState({});
  const [subscriptions, setSubscriptions] = useState([]);
  const user = getUser();
  const email = user !== 'undefined' && user ? user.email : '';

  useEffect(() => {
    if (message) {
      alert(message);
    }
  }, [message]);

  const queryHandler = async (e) => {
    e.preventDefault();
    const requestBody = {
      title: title,
      artist: artist,
      year: year,
    };
  
    if (!title && !artist && !year) {
      setMessage('Fill up at least one attribute please!');
    } else {
      axios.post(queryUrl, requestBody).then(async (response) => {
        if (response.data.length === 0) {
          setMessage('No result is retrieved. Please query again!');
        } else {
          setMessage('');
        }
        setResults(response.data);
  
        const newImageUrls = { ...imageUrls };
        for (const result of response.data) {
          const trimArtist = result.artist.replaceAll(' ','');
          console.log(trimArtist);
          if (!newImageUrls[trimArtist]) {
            const imageUrl = await getArtistImage(trimArtist);
            newImageUrls[result.artist] = imageUrl;
          }
        }
        setImageUrls(newImageUrls);
      }).catch((error) => {
        console.error('Error details:', error);
        setMessage(error);
      });
    }
  };
  
  async function handleSubscribe(result) {
    console.log("Result:", result); // Add this line to check the result object
  
    if (user) {
      const subscriptionData = {
        title: result.title,
        artist: result.artist,
        email: email,
        year: result.year,
        imageUrl: imageUrls[result.artist],
      };
  
      console.log("Subscription Data:", subscriptionData); // Add this line to check the subscriptionData object
      console.log(typeof result.year);
      const response = await axios.post(subscribeUrl, subscriptionData);
      console.log(response.data);
  
      setSubscriptions([...subscriptions, subscriptionData]);
    } else {
      setMessage("Please Log In");
    }
  }
  

  async function getArtistImage(artist) {
    if (artist === '') {
      return undefined;
    }
    // Add the artist parameter as a query string parameter
    const response = await axios.get(connectstorageUrl, { params: { artist: artist } });
    return response.data.imageUrl;
  }

  return (
    <div className="container">
      <Navbar />
      <h1>Music Query</h1>
      <form onSubmit={queryHandler}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        />
        <br />
        <label htmlFor="year">Year</label>
        <input
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <br />
        <button type="submit">Search</button>
      </form>
      <h2>Results</h2>
      {results && results.length > 0 ? (
        <table className="styled-table">
          <thead>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Image</th>
            <th>Subcribe</th>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td>{result.title}</td>
                <td>{result.artist}</td>
                <td>{result.year}</td>
                <td>
                  {imageUrls[result.artist] && (
                    <img
                    src={imageUrls[result.artist]}
                    alt={`${result.artist}`}
                    width="100"
                    height="100"
                    />
                  )}</td>
                <td>
                  <button type="submit" onClick={() => handleSubscribe(result)}>
                    Subscribe
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>) : null}
    </div>
  );
};

export default QueryPage;
