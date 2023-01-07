import styled from 'styled-components';
import {DebounceInput} from 'react-debounce-input';
import { useState } from 'react';
import { getUsers } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({updateTimeline}) {
  const [users, setUsers] = useState();
  const [search, setSearch] = useState();
  const navigate = useNavigate();

  function eventHandler(e) {
    const { value } = e.target;
    console.log(value);
    if (!value) return;

    getUsers(value)
    .then(r => setUsers(r.data))
    .catch(err => {
      console.log(err);
      setUsers();
    });
  }

  function toUserPosts(id) {
    navigate("/user/" + id);
    setUsers();
    setSearch("");
    updateTimeline();
  }

  return (
    <Style>
      <DebounceInput placeholder="Search for people" minLength={3} debounceTimeout={300} onChange={eventHandler} value={search} />
      {users && <div className="result">
        {users.map(e => <div key={e.id} className="result-user" onClick={() => toUserPosts(e.id)}>
          <img src={e.imageUrl} alt="" />
          <span>{e.name}</span>
        </div>)}
      </div>}
    </Style>
  );
}

export const Style = styled.div`
  position: relative;
  width: 40%;
  * {
    font-family: 'Lato';
    font-weight: 400;
    font-size: 19px;
  }

  input {
    width: 100%;
    height: 45px;
    border-radius: 8px;
    background-color: white;
    padding: 0 14px;
    
    
    &::placeholder {
      color: #C6C6C6;
    }
  }
  
  .result {
    z-index: -1;
    position: absolute;
    top: 20px;
    left: 0;
    width: 100%;
    height: fit-content;
    border-radius: 8px;
    background-color: #E7E7E7;
    padding: 16px;
    padding-top: 41px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    .result-user {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #515151;
      cursor: pointer;
      
      img {
        border-radius: 85px;
        width: 40px;
        height: 40px;
      }
    }
  }
`;