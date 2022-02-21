import { Suspense, useState } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes, Router } from "blitz"
import Layout from "app/core/layouts/Layout"
import BorderComponent from "app/core/components/BorderComponent"
import {
  Button,
  Center,
  Grid,
  Image,
  Flex,
  GridItem,
  Box,
  Heading,
  Spacer,
  Text,
  IconButton,
  OrderedList,
  ListItem,
  UnorderedList,
  Code,
  Table,
  Tr,
  Td,
} from "@chakra-ui/react"
import MenuWindow from "app/core/components/MenuWindow"
import { AppViews } from "app/lang/available"

const CalcPage: BlitzPage = (props: any) => {
  const [text, setText] = useState(" ")

  return (
    <Box background="gray.200" id="calcview" backgroundColor={"inherit"}>
      <Box id="display">
        <Center>{text}</Center>
      </Box>
      <Table id="numpad">
      <Tr>
          <Td
            onClick={() => {
              setText((acc) => acc + "7")
            }}
          >
            7
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "8")
            }}
          >
            8
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "9")
            }}
          >
            9
          </Td>
          <Td

            onClick={() => {
              setText((acc) => acc + "+")
            }}
          >
            +
          </Td>
        </Tr>
        <Tr>
          <Td
            onClick={() => {
              setText((acc) => acc + "7")
            }}
          >
            7
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "8")
            }}
          >
            8
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "9")
            }}
          >
            9
          </Td>
          <Td
            rowSpan={2}
            onClick={() => {
              setText((acc) => acc + "+")
            }}
          >
            +
          </Td>
        </Tr>

        <Tr>
          <Td
            onClick={() => {
              setText((acc) => acc + "4")
            }}
          >
            4
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "5")
            }}
          >
            5
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "4")
            }}
          >
            6
          </Td>
        </Tr>

        <Tr>
          <Td
            onClick={() => {
              setText((acc) => acc + "1")
            }}
          >
            1
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "2")
            }}
          >
            2
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + "3")
            }}
          >
            3
          </Td>
          <Td
            rowSpan={2}
            onClick={() => {
              setText((acc) => acc + "=" + eval(text))
            }}
          >
            enter
          </Td>
        </Tr>
        <Tr>
          <Td
            colSpan={2}
            onClick={() => {
              setText((acc) => acc + "0")
            }}
          >
            0
          </Td>
          <Td
            onClick={() => {
              setText((acc) => acc + ".")
            }}
          >
            .
          </Td>
        </Tr>
      </Table>
    </Box>
  )
}

CalcPage.authenticate = true
CalcPage.getLayout = (page) => <Layout>{page}</Layout>

export default CalcPage
