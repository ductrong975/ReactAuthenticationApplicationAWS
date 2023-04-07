import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { getUser } from '../services/Authentication';
import './SubscriptionPage.css';
const getSubscriptionsUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/getsubscribe';
const unsubscribeUrl = 'https://vg6znkujdb.execute-api.us-east-1.amazonaws.com/production/unsubscribe';

function SubscriptionPage() {
  const [subscriptions, setSubscriptions] = useState([]);
  const user = getUser();
  const email = user !== 'undefined' && user ? user.email : '';

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const response = await axios.get(getSubscriptionsUrl);
      setSubscriptions(response.data.subscriptions);
    };
    fetchSubscriptions();
  }, []);

  async function handleUnsubscribe(subscription) {
    const params = {
      title: subscription.title,
      artist: subscription.artist,
      email: subscription.email,
      year: subscription.year,
      imageUrl: subscription.imageUrl,
    };
    try {
      const response = await axios.delete(unsubscribeUrl, { params });
      console.log(response.data);
  
      const updatedSubscriptions = subscriptions.filter((sub) => {
        return !(
          sub.title === subscription.title &&
          sub.artist === subscription.artist &&
          sub.year === subscription.year
        );
      });
      setSubscriptions(updatedSubscriptions);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <Navbar/>
      <div className="container2">
      <h2>Subscriptions</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Year</th>
            <th>Image</th>
            <th>Unsubscribe</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions
            .filter((subscription) => subscription.email === email)
            .map((subscription, index) => (
              <tr key={index}>
                <td>{subscription.title}</td>
                <td>{subscription.artist}</td>
                <td>{subscription.year}</td>
                <td>
                  <img
                    src={subscription.imageUrl}
                    alt={`${subscription.artist}`}
                    width="100"
                    height="100"
                  />
                </td>
                <td>
                  <button type="button" onClick={() => handleUnsubscribe(subscription)}>Remove</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default SubscriptionPage;
