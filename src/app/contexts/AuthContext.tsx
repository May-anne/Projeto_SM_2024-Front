'use client'
import { loginUser } from "@/lib/api";
import { createContext, useEffect, useState } from "react";
import { parseCookies, setCookie } from 'nookies'
import decode from "jwt-decode";
import { useRouter } from "next/navigation";

type AuthContextType = {
  isAuthenticated: boolean,
  user: User,
  signIn: (data: signInData) => Promise<void>

}

type signInData = {
  login: string,
  senha: string
}

type User = {
  id: number,
  login: string,
  nome: string,
  idPerfil: number,
  senha: string
};

const jwt = require('jsonwebtoken');

const secret = '139278d6e53435c6e598475318d70d7b45d64f990f225f94fb81080a1bffeff579f004d3d5477e270c92af5355ddc186d28e1dbd1c090b092c23a27b82a08bc5';

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'engsoft.token': token } = parseCookies()
    if(token){
      const user: User = decode(token)
      setUser(user)
    }
  },[])

  async function signIn(data: signInData): Promise<void> {
    try {
        const result = await loginUser(data.login, data.senha);
        if (result) {
            const user = result.data;
            setUser(user);

            jwt.sign({ id: user.id, login: user.login, nome: user.nome, idPerfil: user.idPerfil }, secret, { expiresIn: '3h', algorithm: 'HS256' }, (err:any, token:any) => {
                if (err) {
                    console.error('JWT sign error:', err);
                    return;
                }
                if (token) {
                    setCookie(undefined, 'engsoft.token', token, {
                        maxAge: 60 * 60 * 3, // 3 hours
                    });
                    router.push('/dashboard');
                }
            });
        }
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be handled elsewhere
  }
}
  

  return (
    <AuthContext.Provider value={{
      user: user || { id: 0, login: "", nome: "", idPerfil: 0, senha: '' },
      isAuthenticated,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}
