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
    Icon
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";
import { useAuthenticate } from "../../hooks/AuthContext";

import { RiArrowLeftLine } from 'react-icons/ri'

import { usePayments } from "../../hooks/PaymentsContext";


export function CreatePaymentForm() {

    const { months, secretaries, createPayment } = usePayments()
    const { user } = useAuthenticate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        await createPayment(data)
    }



    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3" h="100vh">
                <Text fontSize="16" color="gray.600" fontWeight="bold">Criar novo pagamento</Text>
                <HStack color="gray.500"><Icon as={RiArrowLeftLine} /><Link href="/pagamentos"><a>Voltar ao relatório</a></Link></HStack>

                <Stack as="form" pt="2" onSubmit={handleSubmit(onSubmit)}>
                    <Stack align="center" py="4" direction={{ base: "column", md: "row" }}>
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='processo'>Processo</FormLabel>
                            <Input id='processo' type='text' {...register("processo")} required />
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='month_id'>Mês de pagamento</FormLabel>
                            <Select defaultValue="" {...register("month_id")}>
                                {months.map(month =>
                                    <option key={month.id} value={`${month.id}`}>{month.name}</option>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='referencia'>Referente ao mês</FormLabel>
                            <Select defaultValue="" {...register("referencia")}>
                                {months.map(month =>
                                    <option key={month.id} value={`${month.name}`}>{month.name}</option>
                                )}
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='empresa'>Empresa</FormLabel>
                            <Input required id='empresa' type='text' {...register("empresa")} />
                        </FormControl>
                    </Stack>

                    <Stack align="center" pt="2" direction={{ base: "column", md: "row" }}>
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='assunto'>Assunto</FormLabel>
                            <Input required id='assunto' type='text' {...register("assunto")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='secretaria'>Secretaria</FormLabel>
                            <Select defaultValue="" {...register("secretary_id")}>
                                {secretaries.map(secretary =>
                                    <option key={secretary.id} value={`${secretary.id}`}>{secretary.name}</option>
                                )}
                            </Select>
                        </FormControl>

                    </Stack>

                    <Stack align="center" pt="2" direction={{ base: "column", md: "row" }}>
                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='fonte'>Fonte de recurso</FormLabel>
                            <Input required id='fonte' type='text' {...register("fonte")} />
                        </FormControl>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='pago'>Data de pagamento</FormLabel>
                            <Input required id='pago' type='date' {...register("pago")} />
                        </FormControl>
                    </Stack>

                    <Stack align="center" pt="4" direction={{ base: "column", md: "row" }}>

                        <FormControl>
                            <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='valor'>Valor pago</FormLabel>
                            <Input required id='valor' type='text' {...register("valor")} />
                            <Text>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(watch("valor"))}</Text>
                        </FormControl>

                    </Stack>

                    <HStack py="6">
                        <Button type='submit'>Criar demanda</Button>
                    </HStack>
                </Stack>


            </Stack>
        </>
    )
}

