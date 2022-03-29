import {

    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    Select,
    Stack,
    Text,

} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useAuthenticate } from "../../hooks/AuthContext";

import { useDemands } from "../../hooks/DemandsContext";


export function CreateDemandForm() {

    const { handleCreateNewDemand } = useDemands()
    const { user } = useAuthenticate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        const dataNew = {
            ...data,
            userId: user.id
        }

        await handleCreateNewDemand(dataNew)
    }

    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3" h="100vh">
                <Text fontSize="16" color="gray.600">Criar nova demanda - Controle público - <Link href="/demandas"><a>Voltar às demandas</a></Link></Text>

                <Stack as="form" pt="2" onSubmit={handleSubmit(onSubmit)}>
                    <HStack align="center" py="4">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='numero'>Número da demanda</FormLabel>
                            <Input id='numero' type='text' {...register("numero")} required/>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='tipo'>Tipo de documento</FormLabel>
                            <Select required id='tipo' placeholder='Selecione o tipo de documento' {...register("tipo")}>
                                <option>CI</option>
                                <option>OFÍCIO</option>
                                <option>OUTRO</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='orgao_origem'>Orgão de origem</FormLabel>
                            <Input required id='orgao_origem' type='text' {...register("orgao_origem")}/>
                        </FormControl>
                    </HStack>

                    <HStack align="center" pt="2">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='remetente'>Nome do remetente</FormLabel>
                            <Input required id='remetente' type='text' {...register("remetente")}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='assunto'>Breve resumo (Assunto)</FormLabel>
                            <Input required id='assunto' type='text' {...register("assunto")}/>
                        </FormControl>

                    </HStack>

                    <HStack align="center" pt="2">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='setores'>Setores envolvidos</FormLabel>
                            <Input required id='setores' type='text' {...register("setores")}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='processos'>Processos</FormLabel>
                            <Input required id='processos' type='text' placeholder='Digite o processo fazendário' {...register("processos")}/>
                        </FormControl>
                    </HStack>

                    <HStack align="center" pt="4">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='data_emissao'>Data de emissão</FormLabel>
                            <Input required id='data_emissao' type='date' {...register("data_emissao")}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='data_recebimento'>Data de recebimento</FormLabel>
                            <Input required id='data_recebimento' type='date' {...register("data_recebimento")}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='prazo_resposta'>Prazo de resposta</FormLabel>
                            <Input required id='prazo_resposta' type='date' {...register("prazo_resposta")}/>
                        </FormControl>
                    </HStack>

                    <HStack py="6">
                        <Button type='submit'>Criar demanda</Button>
                    </HStack>
                </Stack>


            </Stack>
        </>
    )
}

