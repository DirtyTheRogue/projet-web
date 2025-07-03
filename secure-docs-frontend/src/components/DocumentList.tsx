import { useQuery, useMutation } from '@apollo/client';
import { GET_DOCUMENTS_BY_USER, DELETE_DOCUMENT } from '../graphql/queries';
import { useState } from 'react';

const userId = 'user1'; // Pour test sans auth

export default function DocumentList() {
  const { data, loading, refetch } = useQuery(GET_DOCUMENTS_BY_USER, {
    variables: { userId },
  });

  const [deleteDocument] = useMutation(DELETE_DOCUMENT);

  const handleDelete = async (id: string) => {
    await deleteDocument({ variables: { id } });
    refetch();
  };

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h2>Mes documents</h2>
      <ul>
        {data?.getDocumentsByUser.map((doc: any) => (
          <li key={doc.id}>
            <strong>{doc.title}</strong> – {doc.description}
            <br />
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
              Fichier
            </a>{' '}
            | <button onClick={() => handleDelete(doc.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
