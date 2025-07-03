import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_DOCUMENT, GET_DOCUMENTS_BY_USER } from '../graphql/queries';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export default function CreateDocumentForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const [createDocument, { error }] = useMutation(CREATE_DOCUMENT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Token introuvable.");
      return;
    }

    let userId = '';
    try {
      const decoded = jwtDecode<DecodedToken>(token);

      userId = decoded.sub;
    } catch (err) {
      console.error("Erreur lors du décodage du token :", err);
      return;
    }

    if (!userId) {
      console.error("userId manquant dans le token.");
      return;
    }

    try {
      await createDocument({
        variables: {
          input: {
            title,
            description,
            fileUrl,
            userId,
          },
        },
        refetchQueries: [{ query: GET_DOCUMENTS_BY_USER, variables: { userId } }],
      });

      setTitle('');
      setDescription('');
      setFileUrl('');
    } catch (err) {
      console.error("Erreur Apollo :", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL du fichier"
        value={fileUrl}
        onChange={(e) => setFileUrl(e.target.value)}
      />
      <button type="submit">Créer</button>

      {error && <p style={{ color: 'red' }}>Erreur : {error.message}</p>}
    </form>
  );
}
