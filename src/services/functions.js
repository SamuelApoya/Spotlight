// Connects to Firebase Cloud Functions

import {getFunctions, httpsCallable} from 'firebase/functions';
import app from './Firebase';

const functions = getFunctions(app);


// callable function to select a challenge winner
export const selectWinner = httpsCallable(functions, 'selectWinner');

export default functions;
