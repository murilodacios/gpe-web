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
    Box,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { RiDownload2Line, RiLoader2Fill } from "react-icons/ri";
import { convertISOtoDate } from "../../utils/convertISOtoDate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { usePayments } from "../../hooks/PaymentsContext";
import { CreatePaymentForm } from "./CreatePaymentForm";
import { useAuthenticate } from "../../hooks/AuthContext";

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';




export function TablePayments() {

    const { payments, selectMonth, selectYear, setTakesLoadingPayments, reportAllPayments } = usePayments()
    const { register, handleSubmit, watch } = useForm();
    const { user } = useAuthenticate()

    const onSubmit = async (data: any) => {
        selectMonth(data.month)
        selectYear(data.year)
    }

    async function handleViewReport() {

        const paymentReport = await reportAllPayments()

        const doc = new jsPDF({
            orientation: "landscape",
        })


        doc.setFontSize(9)
        doc.text(`Relatório de pagamento de fornecedores (Mês: ${watch("month") ? watch("month") : "Todos os meses"})  (${watch("year") ? watch("year") : "Todos os anos"}) - Gerado dia ${new Date().toLocaleDateString()}`, 15, 10)

        autoTable(doc, {
            head: [['Processo', 'Empresa', 'Assunto', 'Fonte', 'Referência', 'Secretaria', 'Valor', 'Pago']],
            body: paymentReport?.map((payment) => [
                [payment.processo],
                [payment.empresa],
                [payment.assunto],
                [payment.fonte],
                [payment.referencia],
                [payment.secretary],
                {
                    content: [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(payment.valor)],
                    styles: {
                        overflow: 'visible',
                        cellWidth: 40,
                    }
                },
                [convertISOtoDate(payment.pago)]
            ]),
        })

        doc.save(`${new Date().toLocaleDateString().trim()}-Fornecedores.pdf`)
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

                {/* <iframe title="BIPostgresGPE" width="100%" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=96bc6d5e-c511-423c-bd2a-d742a62f41f6&autoAuth=true&ctid=6c7045de-414e-4b53-8f50-9d4afa293fc0&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLWJyYXppbC1zb3V0aC1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" allowFullScreen></iframe> */}

                {Number(user?.level) >= 1 ?
                    <HStack py="4">
                        <CreatePaymentForm />

                        <Box>
                            <Button w="100%" size="sm" colorScheme="blue" variant="ghost" onClick={() => handleViewReport()}>
                                <HStack spacing="2">
                                    <Icon as={RiDownload2Line} />
                                    <Text fontWeight="normal">Relatório</Text>
                                </HStack>
                            </Button>
                        </Box>
                    </HStack>
                    :
                    <></>
                }



                <Table variant='simple' w="100%" id="#pagamentos">
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

