import {
    Box,
    Button,
    FormControl,
    FormLabel,
    HStack,
    Input,
    Stack,
    Text,

} from "@chakra-ui/react";
import fileToArrayBuffer from "file-to-array-buffer";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { useState } from "react";

import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useAuthenticate } from "../../hooks/AuthContext";


export function SignPdf() {

    const { user } = useAuthenticate()
    const [pdfInfo, setPdfInfo] = useState("");
    const [selectedFile, setSelectedFile] = useState<any>()

    async function modifyPdf() {

        if (selectedFile) {
            fileToArrayBuffer(selectedFile).then(async (fileUpload) => {
                // Fetch an existing PDF document

                const pdfDoc = await PDFDocument.load(fileUpload)

                // Embed the Helvetica font
                const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

                // Get the first page of the document
                const pages = pdfDoc.getPages()
                const firstPage = pages[0]

                // Get the width and height of the first page
                const { width, height } = firstPage.getSize()

                // Draw a string of text diagonally across the first page
                firstPage.drawText(`Assinado eletrônicamente por ${user?.name} no dia ${new Date().toLocaleDateString()} com a chave ${user?.id}`, {
                    x: 10,
                    y: height - 10,
                    size: 8,
                    font: helveticaFont,
                    color: rgb(0.95, 0.1, 0.1),
                })

                // Serialize the PDFDocument to bytes (a Uint8Array)
                const pdfBytes = await pdfDoc.save()

                // Trigger the browser to download the PDF document
                // download(pdfBytes, "pdf-lib_modification_example.pdf", "application/pdf");

                const bytes = new Uint8Array(pdfBytes);
                const blob = new Blob([bytes], { type: "application/pdf" });
                const docUrl = URL.createObjectURL(blob);
                setPdfInfo(docUrl);
            })

        } else {
            toast.error("Selecione um arquivo PDF para assinar")
        }
    }


    return (
        <>
            <ToastContainer />

            <Box p="6">
                <HStack>
                    <Button 
                        as="label" 
                        htmlFor="file-upload"
                        variant={selectedFile ? "solid" : "outline"}
                        colorScheme={selectedFile ? "green" : "gray"}
                        
                    >
                        {selectedFile ? "Arquivo pronto" : "Escolha um arquivo"}
                    </Button>
                    <Input
                        id="file-upload"
                        d="none"
                        border="none"
                        type="file"
                        required
                        onChange={(e: any) => setSelectedFile(e.target.files[0])}
                        accept="application/pdf"
                    />
                    <Button onClick={modifyPdf}>Assinar documento</Button>
                </HStack>
            </Box>


            <Box p="6" width="100%" height="100%">
                <iframe src={pdfInfo} width="100%" height="100%" />
            </Box>

        </>
    )
}

