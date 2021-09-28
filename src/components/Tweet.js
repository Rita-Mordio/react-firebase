import React, { useState } from 'react';
import moment from 'moment';
import firebaseAPI from '../firebaseAPI';

const Tweet = ({ user, tweet }) => {
  const [value, setValue] = useState(tweet.value);
  const [isEdit, setIsEdit] = useState(false);

  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };

  const onChangeInputHandler = (event) => setValue(event.target.value);

  const onClickDelete = () => {
    if (window.confirm('are you sure delete?')) {
      firebaseAPI.deleteDoc(`tweets/${tweet.id}`);
    }
  };

  const onClickEdit = () => {
    firebaseAPI.updateDoc(`tweets/${tweet.id}`, { value });
    setIsEdit(false);
  };

  return (
    <div style={tweetStyle}>
      {isEdit ? (
        <input type="text" value={value} onChange={onChangeInputHandler} />
      ) : (
        <span style={valueStyle}>{tweet.value}</span>
      )}
      <span style={dateStyle}>{moment(tweet.createdAt.toDate()).format('YYYY-MM-DD')}</span>
      {user.uid === tweet.creatorId && (
        <>
          {isEdit && (
            <button style={buttonStyle} onClick={onClickEdit}>
              save
            </button>
          )}
          <button style={buttonStyle} onClick={toggleIsEdit}>
            {isEdit ? 'Cancel' : 'Edit'}
          </button>
          <button style={buttonStyle} onClick={onClickDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

const tweetStyle = {
  marginBottom: '10px',
};

const valueStyle = {
  marginRight: '20px',
};

const dateStyle = {
  color: '#777777',
};

const buttonStyle = {
  marginLeft: '10px',
};

export default Tweet;
