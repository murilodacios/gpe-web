import {
    HStack,
    Icon,
    Stack,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Select,
    TableCaption,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiLoader2Fill } from "react-icons/ri";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePayments } from "../../hooks/PaymentsContext";
import { CreatePaymentForm } from "./CreatePaymentForm";

export function TablePayments() {

    const { payments, selectMonth, selectYear, setTakesLoadingPayments } = usePayments()
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data: any) => {
        selectMonth(data.month)
        selectYear(data.year)
    }

    return (
        <>
            <ToastContainer />
            <Stack w="100%" p="6" spacing="3">

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Text>Selecione o mês que deseja visualizar os pagamentos</Text>
                    <HStack py="4">
                        <Select defaultValue="" {...register("month")}>
                            <option value="">Todos os pagamentos</option>
                            <option value="Janeiro">Janeiro</option>
                            <option value="Fevereiro">Fevereiro</option>
                            <option value="Março">Março</option>
                            <option value="Abril">Abril</option>
                            <option value="Maio">Maio</option>
                            <option value="Junho">Junho</option>
                        </Select>
                        <Select defaultValue="2022" {...register("year")}>
                            <option value="2022">2022</option>
                            <option value="2021">2021</option>
                            <option value="">Todos os anos</option>
                        </Select>
                        <Button type="submit" px="12">Selecionar</Button>
                    </HStack>
                </form>

                <HStack py="4">
                    <CreatePaymentForm />
                </HStack>

                <Table variant='simple' w="100%">
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
                    <Tbody fontSize="sm">

                        {payments.map((payment) => (
                            <Tr key={payment.id} fontSize="xs">
                                <Td>{payment.processo}</Td>
                                <Td>{payment.empresa}</Td>
                                <Td>
                                    {payment.assunto}
                                </Td>
                                <Td >{payment.fonte}</Td>
                                <Td>{payment.referencia}</Td>
                                <Td>{payment.secretary}</Td>
                                <Td>
                                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.valor)}
                                </Td>
                                <Td>{convertISOtoDate(payment.pago)}</Td>
                            </Tr>
                        ))
                        }
                    </Tbody>

                    <TableCaption>Exibindo {payments.length} itens</TableCaption>
                </Table>

                <HStack>
                    <Button onClick={() => setTakesLoadingPayments(5)} size="sm" variant="ghost">
                        <HStack spacing="2">
                            <Icon as={RiLoader2Fill} />
                            <Text fontWeight="normal">Carregar mais</Text>
                        </HStack>
                    </Button>
                </HStack>

            </Stack>
        </>
    )
}

