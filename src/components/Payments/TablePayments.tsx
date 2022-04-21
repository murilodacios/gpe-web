import {
    Avatar,
    Box,
    HStack,
    Icon,
    Stack,
    Text,
    Tooltip,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Tag,
    Input,
    InputGroup,
    InputLeftAddon,
    Button,
    Checkbox,
    IconButton,
    Select,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCheckLine, RiDeleteBackFill, RiDeleteBin7Line, RiEyeLine, RiSearchLine } from "react-icons/ri";
import { useAuthenticate } from "../../hooks/AuthContext";
import { useTasks } from "../../hooks/tasksContext";
import { useUsers } from "../../hooks/usersContext";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { isPastedDate } from "../../utils/isPastedDate";
import { isTodayDate } from "../../utils/isTodayDate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePayments } from "../../hooks/PaymentsContext";


export function TablePayments() {

    const { payments, months, selectMonth } = usePayments()


    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data: any) => {
        selectMonth(data.month_id)
    }


    const summary = payments.reduce((acc, payment) => {
        acc.total += parseFloat(payment.valor)
        return acc
    }, {
        total: 0
    })


    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3">

                <HStack py="4">
                    <Link href="/pagamentos/create">
                        <a>
                            <Button colorScheme="blue" variant="outline">
                                <HStack spacing="2">
                                    <Icon as={RiAddLine} />
                                    <Text>Criar novo pagamento</Text>
                                </HStack>
                            </Button>
                        </a>
                    </Link>
                </HStack>

                <Stack>
                    <Text>Total pago</Text>
                    <Text>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(summary.total)}</Text>
                </Stack>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Text>Selecione o mês que deseja visualizar os pagamentos</Text>
                    <HStack py="4">
                        <Select defaultValue="" {...register("month_id")}>
                            <option value="">Todos os pagamentos</option>
                            {months.map(month =>
                                <option key={month.id} value={`${month.id}`}>{month.name}</option>
                            )}
                        </Select>
                        <Button type="submit">Selecionar</Button>
                    </HStack>
                </form>

                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>Processo</Th>
                            <Th>Empresa</Th>
                            <Th>Assunto</Th>
                            <Th>Fonte</Th>
                            <Th>Referência</Th>
                            <Th>Secretaria</Th>
                            <Th>Valor</Th>
                            <Th>Pago</Th>
                        </Tr>
                    </Thead>
                    <Tbody>

                        {payments.map((payment) => (
                            <Tr key={payment.id} fontSize="sm">
                                <Td>{payment.processo}</Td>
                                <Td>{payment.empresa}</Td>
                                <Td>
                                    {payment.assunto}
                                </Td>
                                <Td>{payment.fonte}</Td>
                                <Td>{payment.referencia}</Td>
                                <Td>{payment.secretary.name}</Td>
                                <Td>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.valor)}
                                </Td>
                                <Td>{convertISOtoDate(payment.pago)}</Td>
                            </Tr>
                        ))
                        }
                    </Tbody>
                </Table>

            </Stack>
        </>
    )
}

