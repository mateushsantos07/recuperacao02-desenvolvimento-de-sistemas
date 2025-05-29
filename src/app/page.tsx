'use client'

import { Dev } from "@/types/Dev";
import { useState } from "react";

export default function Page() {
  const [dev, setDev] = useState<Dev[]>([]);

  async function loadDevs() {
    // FAZ CHAMADA API PARA BUSCAR TODOS OS DE
    // JOGA AS INFORMAÇÕES DENTRO DO ESTADO setDev(response.data)
  }

  async function handleCreateDev() {
    // PEGA INFORMAÇÕES DO FORMULÁRIO/CAMPOS
    // CRIA OBJETO DO TIPO DEV
    // FAZ CHAMADA API PARA ADICIONAR DEV
    // FAZ CHAMADA API PARA BUSCAR LISTA DE DEVS ATUALIZADA
  }

  async function handleDeleteDev(id: string) {
    // FAZ CHAMADA DO TIPO DELETE A API (JSON-SERVER)
    // CHAMA O LOADDEVS PARA ATUALIZAR OS DEVS
  }

  return (
    <h1>Hello World</h1>
  )
}