import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/firebase-config';
import './EditProfile.css'

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(); 

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setDisplayName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    } else {
      navigate('/login'); 
    }
  }, [navigate, auth]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (user) {
        
        await updateProfile(user, { displayName });

        
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { displayName, email }, { merge: true });

        setSuccess('Profile updated successfully');

      }
    } catch (error) {
      setError('Error updating profile: ' + error.message);
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
