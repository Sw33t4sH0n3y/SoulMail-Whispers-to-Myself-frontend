import { useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router';
import {userContext} from '../../contexts/UserContext';
import NavBar from '../NavBar/NavBar';
import * as userService from '../../services/userService';

const ProfileSettings = () => {
    const navigate = useNavigate();
    const { user } = useContext
}