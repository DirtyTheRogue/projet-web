import CreateDocumentForm from "../components/CreateDocumentForm";
import DocumentList from "../components/DocumentList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Secure Docs</h1>
      <CreateDocumentForm />
      <hr className="my-6" />
      <h2 className="text-2xl font-semibold mb-2">Mes documents</h2>
      <DocumentList />
    </div>
  );
}
