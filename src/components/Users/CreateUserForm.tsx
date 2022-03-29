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

import { useUsers } from "../../hooks/usersContext";


export function CreateUserForm() {

    const { handleCreateNewUser } = useUsers()
    const { user } = useAuthenticate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {

        const dataNew = {
            id: data.id,
            name: data.name,
            email: data.email,
            password: data.password,
            permissions: "",
            level: parseInt(data.level),
            job_id: data.job_id
        }

        await handleCreateNewUser(dataNew)
    }

    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3" h="100vh">
                <Text fontSize="16" color="gray.600">Criar novo usuário - <Link href="/usuarios"><a>Voltar à listagem</a></Link></Text>

                <Stack as="form" pt="2" onSubmit={handleSubmit(onSubmit)}>
                    <HStack align="center" py="4">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='name'>Nome completo</FormLabel>
                            <Input id='name' type='text' {...register("name")} required />
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='tipo'>Tipo de permissão</FormLabel>
                            <Select required id='tipo' placeholder='Selecione o tipo de permissão' defaultValue={0} {...register("level")}>
                                <option value={0}>Padrão</option>
                                <option value={1}>Administrador</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='password'>Digite uma senha</FormLabel>
                            <Input required id='password' type='text' {...register("password")} />
                        </FormControl>
                    </HStack>

                    <HStack align="center" pt="2">
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='email'>E-mail</FormLabel>
                            <Input required id='email' type='email' {...register("email")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='job'>Cargo</FormLabel>
                            <Select required id='job' placeholder='Escolha um cargo' defaultValue="d7541a3c-42a5-4bfa-8ee1-6796268f718b" {...register("job_id")}>
                                <option value="d7541a3c-42a5-4bfa-8ee1-6796268f718b">Comissionado</option>
                            </Select>
                        </FormControl>
                    </HStack>

                    <HStack py="6">
                        <Button type='submit'>Criar usuário</Button>
                    </HStack>
                </Stack>


            </Stack>
        </>
    )
}

