import React, { useState, useEffect } from 'react';
import { sendEmail, getList } from '../api';

const EmailForm = ({ listId }) => {
  const [emailData, setEmailData] = useState({ subject: 'Welcome to MathonGo!', body: 'Hey [name]!\n\nThank you for signing up with your email [email]. We have received your city as [city].\n\nTeam MathonGo.' });
  const [selectedList, setSelectedList] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchSelectedList = async () => {
      try {
        const data = await getList(listId);
        setSelectedList(data);
      } catch (error) {
        console.error('Error fetching selected list:', error);
      } finally {
        setLoading(false); // Update loading state after fetching data
      }
    };
    fetchSelectedList();
  }, [listId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendEmail(listId, emailData);
      alert('Email sent successfully');
      setEmailData({ subject: '', body: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    }
  };

  // Render loading message if data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render form when data is fetched
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Send Email to {selectedList?.title}</h2>
      <input
        type="text"
        value={emailData.subject}
        onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
        placeholder="Email Subject"
        required
        className="border border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
      />
      <textarea
        value={emailData.body}
        onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
        placeholder="Email Body"
        required
        className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        rows="4"
      />
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Send Email</button>
    </form>
  );
};

export default EmailForm;
