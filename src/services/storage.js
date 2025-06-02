// Handles media uploads/downloads using firebase storage

import app from './Firebase';

const storage = getStorage(app);

// Uploads a file and and returns the download URL
export const uploadMedia = async (file, path) => {
    const fileRef = ref(storage, path);
    // Upload the file to Firebase Storage at the specified path
    await uploadBytes(fileRef, file);
    // Get and return the public URL to access the uploaded file
    return getDownloadURL(fileRef);
};

export default storage;
