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
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

import { fontes } from './../../utils/fontes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from "react-hook-form";

import { RiAddLine } from 'react-icons/ri'

import { usePayments } from "../../hooks/PaymentsContext";


export function CreatePaymentForm() {

    const { createPayment } = usePayments()

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        try {
            await createPayment(data)
            onClose()
        } catch (err) {
            console.log(err)
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <ToastContainer />

            <HStack>
                <Button w="100%" size="sm" colorScheme="blue" onClick={onOpen}>
                    <HStack spacing="2">
                        <Icon as={RiAddLine} />
                        <Text fontWeight="normal">Criar nova transação</Text>
                    </HStack>
                </Button>
            </HStack>

            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Criar novo pagamento</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Stack as="form" pt="2" onSubmit={handleSubmit(onSubmit)}>

                            <FormControl>
                                <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='processo'>Processo</FormLabel>
                                <Input id='processo' type='text' {...register("processo")} required />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='month'>Mês de pagamento</FormLabel>
                                <Select defaultValue="" {...register("month")}>
                                    <option value="Janeiro">Janeiro</option>
                                    <option value="Fevereiro">Fevereiro</option>
                                    <option value="Março">Março</option>
                                    <option value="Abril">Abril</option>
                                    <option value="Maio">Maio</option>
                                    <option value="Junho">Junho</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='referencia'>Referente ao mês</FormLabel>
                                <Select defaultValue="" {...register("referencia")}>
                                    <option value="Janeiro">Janeiro</option>
                                    <option value="Fevereiro">Fevereiro</option>
                                    <option value="Março">Março</option>
                                    <option value="Abril">Abril</option>
                                    <option value="Maio">Maio</option>
                                    <option value="Junho">Junho</option>
                                </Select>
                            </FormControl>

                            <FormControl>
                                <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='empresa'>Empresa</FormLabel>
                                <Input required id='empresa' type='text' {...register("empresa")} />
                            </FormControl>



                            <FormControl>
                                <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='assunto'>Assunto</FormLabel>
                                <Input required id='assunto' type='text' {...register("assunto")} />
                            </FormControl>

                            <FormControl>
                                <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='secretaria'>Secretaria</FormLabel>
                                <Select defaultValue="" {...register("secretary")}>
                                    <option value="Fazenda">Fazenda</option>
                                    <option value="Saúde">Saúde</option>
                                </Select>
                            </FormControl>


                            <Stack align="center" pt="2" direction={{ base: "column", md: "row" }}>
                                <FormControl>
                                    <FormLabel color="#909090" fontWeight="normal" fontSize="sm" htmlFor='fonte'>Fonte de recurso</FormLabel>
                                    <Select defaultValue="" {...register("fonte")}>
                                        {fontes.map(fonte => (
                                            <option key={fonte.id}>{fonte.nome}</option>
                                        ))}
                                    </Select>
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
                                <Button type='submit'>Criar pagamento</Button>
                            </HStack>
                        </Stack>

                    </ModalBody>

                    <ModalFooter>

                        <Button variant='ghost' onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}

