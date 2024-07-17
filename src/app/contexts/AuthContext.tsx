'use client'
import { api, loginUser } from "@/lib/api";
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
  nome: string,
  senha: string
}

type User = {
  user_id: number,
  nome: string,
};

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'movimenta.token': token } = parseCookies()
    if(token){
      const user: User = decode(token)
      setUser(user)
      //router.push('/dashboard');
    }
  },[])

  async function signIn(data: signInData): Promise<void> {
    try {

      const authToken = await loginUser(data.nome, data.senha)
      console.log(authToken?.data.token)
      setCookie(undefined, 'movimenta.token', authToken?.data.token, {
        maxAge: 60*60*3, //3 horas
      })  
      api.defaults.headers['Authorization'] = `Bearer ${authToken?.data.token}`
      const user: User = decode(authToken?.data.token)
      setUser(user)
      router.push('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      throw error; // Rethrow the error to be handled elsewhere
  }
}
  

  return (
    <AuthContext.Provider value={{
      user: user || { user_id: 0, nome: ""},
      isAuthenticated,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  );
}
