import {
    Button,
    HStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Stack,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form';
import { useDemands } from '../../../hooks/DemandsContext';


interface AddAnotationProps {
    id: string;
}

export function AddAnotationToDemandModal({ id }: AddAnotationProps) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { handleAddAnotationToDemand } = useDemands()

    const { handleSubmit, register } = useForm()


    const onSubmit = async (data: any) => {

        const { anotacao } = data

        await handleAddAnotationToDemand(id, anotacao)

        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Adicionar anotação</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar anotação</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Stack as="form" onSubmit={handleSubmit(onSubmit)}>
                            <FormControl>
                                <FormLabel htmlFor='anotacao'>Escreva uma nova anotação</FormLabel>
                                <Input id='anotacao' type='anotacao' {...register("anotacao")}/>
                            </FormControl>

                            <HStack py="4">
                                <Button colorScheme='blue' mr={3} type="submit">
                                    Adicionar anotação
                                </Button>
                            </HStack>
                        </Stack>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

