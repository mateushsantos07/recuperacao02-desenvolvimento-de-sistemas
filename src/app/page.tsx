'use client'

import { Dev } from "@/types/Dev";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import axios from "axios";
import styles from './styles.module.css';
import { MdAdd, MdDelete } from "react-icons/md";
import { CircularProgress } from "@mui/material";
import { de } from "date-fns/locale";


export default function Page() {
  const router = useRouter()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [tech, setTech] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [devs, setDevs] = useState<Dev[]>([]);

  useEffect(() => {
    loadDevs();
  }, [])

  async function loadDevs() {
    // FAZ CHAMADA API PARA BUSCAR TODOS OS DEVS
    // JOGA AS INFORMAÇÕES DENTRO DO ESTADO setDev(response.data)
    try {
      setIsLoading(true);
      const storedToken = localStorage.getItem('access_token')

      const response = await axios.get('http://localhost:3333/devs', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setDevs(response.data);

    } catch (error) {
      console.error('Erro ao carregar os itens:', error);
    } finally {
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

      const dev = {
        id: crypto.randomUUID(),
        name: name,
        description: description,
        avatarUrl: avatarUrl,
        githubUrl: githubUrl,
        tech: tech,
      };

      await axios.post('http://localhost:3333/devs', dev);
      loadDevs();
    } catch (error) {
      console.error('Erro ao criar dev:', error);
    } finally {
      setIsLoading(false);
    }

  }


  async function handleDeleteDev(id: string) {
    // FAZ CHAMADA DO TIPO DELETE A API (JSON-SERVER)
    // CHAMA O LOADDEVS PARA ATUALIZAR OS DEVS
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:3333/devs/${id}`);
      loadDevs();
    } catch (error) {
      console.error('Problema ao deletar desenvolvedor:', error);
    } finally {
      setIsLoading(false);
    }
    loadDevs();
  }

  return (

    <div className={styles.container}>
      <h1>Lista de Desenvolvedores</h1>
      <div className={styles.groupInput}>
        <input
          type="text"
          placeholder="Nome do desenvolvedor"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Descrição do dev"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="text"
          placeholder="Avatar do dev (URL)"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Github do dev"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
        />

        <input
          type="text"
          placeholder="Área do desenvolvedor"
          value={tech}
          onChange={(e) => setTech(e.target.value)}
        />

        <button className={styles.adddevs} onClick={handleCreateDev}>
          <MdAdd />
        </button>

        <div className={styles.dev}>
          {isLoading ?
            <div className={styles.loading}>
              <CircularProgress />
            </div>
            : (
              <div>
                {devs.map((dev) => (
                  <div key={dev.id} className={styles.item}>
                    <span>{dev.name} {dev.tech} {dev.description} {dev.avatarUrl} {dev.githubUrl}

                    </span>
                    <button onClick={() => handleDeleteDev(dev.id)} className={styles.delete}>
                      <MdDelete />
                    </button>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  );
}