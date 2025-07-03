import { useQuery, useMutation } from '@apollo/client';
import { GET_DOCUMENTS_BY_USER, DELETE_DOCUMENT } from '../graphql/queries';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  sub: string;
  email?: string;
  role?: string;
  iat?: number;
  exp?: number;
}

export default function DocumentList() {
  const token = localStorage.getItem('token');
  let userId = '';
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      userId = decoded.sub;
    } catch (err) {
      console.error('Erreur lors du décodage du token :', err);
    }
  }

  const { data, loading, refetch } = useQuery(GET_DOCUMENTS_BY_USER, {
    variables: { userId },
    skip: !userId,
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
