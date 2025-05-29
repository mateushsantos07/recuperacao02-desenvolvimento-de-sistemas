'use client'

import { Dev } from "@/types/Dev";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from "axios";
import { randomUUID } from "crypto";
import styles from './styles.module.css';
import { MdAdd, MdDelete } from "react-icons/md";
import { CircularProgress } from "@mui/material";


export default function Page() {
  const [dev, setDev] = useState<Dev[]>([]);
  const router = useRouter()
  const [newDev, setNewDev] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [devs, setDevs] = useState<Dev[]>([]);
  
  useEffect(() => {
    loadDevs();
  }, [])

  async function loadDevs() {
    // FAZ CHAMADA API PARA BUSCAR TODOS OS DEVS
    // JOGA AS INFORMAÇÕES DENTRO DO ESTADO setDev(response.data)
    useEffect(() => {
      loadDevs();
    }, [])
  
    try {
      setIsLoading(true);
      const storedToken = localStorage.getItem('access_token')

      const response = await axios.get('http://localhost:3333/devs', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setDevs(response.data);
      
    }catch (error) {
      console.error('Erro ao carregar os itens:', error);
    }finally{
      setIsLoading(false);
    }
  }

  async function handleCreateDev() {
    // PEGA INFORMAÇÕES DO FORMULÁRIO/CAMPOS
    // CRIA OBJETO DO TIPO DEV
    // FAZ CHAMADA API PARA ADICIONAR DEV
    // FAZ CHAMADA API PARA BUSCAR LISTA DE DEVS ATUALIZADA
    try {
      setIsLoading(true);
      const newDev = {
        id: randomUUID,
        name: String,
        tech: String,
        description: String,
        avatarUrl: String,
        githubUrl: String
      }
      await axios.post('http://localhost:3333/devs', newDev);
      loadDevs();
    }catch (error) {
      console.error('Problema ao criar desenvolvedor:', error);
    }finally{
      setIsLoading(false);
    }
    useEffect(() => {
      loadDevs();
    }, [])
  }
    

  async function handleDeleteDev(id: string) {
    // FAZ CHAMADA DO TIPO DELETE A API (JSON-SERVER)
    // CHAMA O LOADDEVS PARA ATUALIZAR OS DEVS
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3333/devs/${id}`);
      loadDevs();
    }catch (error) {
      console.error('Problema ao deletar desenvolvedor:', error);
    }finally{
      setIsLoading(false);
    }
    useEffect(() => {
      loadDevs();
    }, [])
  }

  return (
    <div className={styles.container}>
      <h1>Lista de Desenvolvedores</h1>
      <div className={styles.groupInput}>
            <input 
              type="text" 
              placeholder="Nome do desenvolvedor" 
              className={styles.inputdevs} 
              value={newDev}
              onChange={(e) => setNewDev(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Descrição do dev" 
              className={styles.inputdevs} 
              value={newDev}
              onChange={(e) => setNewDev(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Avatar do dev(URL)" 
              className={styles.inputdevs} 
              value={newDev}
              onChange={(e) => setNewDev(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Github do dev" 
              className={styles.inputdevs} 
              value={newDev}
              onChange={(e) => setNewDev(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Área do desenvolvedor" 
              className={styles.inputdevs} 
              value={newDev}
              onChange={(e) => setNewDev(e.target.value)}
            />
            
            <button className={styles.adddevs} onClick={handleCreateDev}>
                <MdAdd />
            </button>

            <div className={styles.list}>
          {isLoading ? 
            <div className={styles.loading}>
              <CircularProgress />
            </div>
          : (
            <div>
              {devs.map((devs) => (
                        <button onClick={() => handleDeleteDev(devs.id)} className={styles.delete}>
                            <MdDelete />
                        </button>
              ))}
            </div>
          )}
          
        </div>
    </div>
        </div>
  )
}