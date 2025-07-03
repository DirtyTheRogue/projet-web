import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "../graphql/mutation"; 

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register] = useMutation(REGISTER);

  const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    await register({
      variables: { input: { email, password } },
    });
    navigate('/login');
  } catch (err) {
    console.error(err);
    alert('Échec de l\'inscription');
  }
};

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          S’inscrire
        </button>
      </form>
    </div>
  );
}
