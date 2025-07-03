import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from '../graphql/mutation';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const {  data} = await login ({
        variables: {
            email,
            password,
            },
        });
        const token = data?.login?.access_token;
        if (token) {
            localStorage.setItem("token", token);
            navigate("/dashboard");
        }
        } catch (err) {
        console.error(err);
        alert("Erreur lors de la connexion. Veuillez réessayer.");
        
        }
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Se connecter
        </button>
      </form>

      {/* 🔗 Lien vers l’inscription */}
      <p className="mt-4 text-sm text-center">
        Pas encore de compte ?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Créez-en un
        </Link>
      </p>
    </div>
  );
}
