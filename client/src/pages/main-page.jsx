import React, {useEffect, useState} from 'react'
import MainLayout from '../layouts/main-layout'
import {useStore} from '../services/store.service'
import {Box, Divider, Heading, Text} from '@chakra-ui/react'
import moment from 'moment'
import 'moment/locale/ru'

const MainPage = () => {
    moment.locale('ru')
    const {getAllPatients, patients} = useStore(state => state)
    const [soredAmount, setSortedAmount] = useState([])

    const totalAmount = patients?.reduce((acc, item) => acc + item.amount, 0)

    useEffect(() => {
        if (!patients.length) {
            getAllPatients()
        }
    }, [])

    useEffect(() => {
        if (patients.length) {
            genAmountMap()
        }
    }, [patients])

    function genAmountMap() {
        const amountMap = {}
        const resultArr = []

        patients.forEach(p => {
            const key = moment(p.date).format('MMMM YYYY')
            if (!amountMap[key]) {
                amountMap[key] = 0
            }

            amountMap[key] += p.amount
        })

        Object.keys(amountMap).map(k => {
            resultArr.push({[k]: amountMap[k]})
        })

        resultArr.sort((a, b) => {
            const keyA = parseInt(Object.keys(a).join('').split(' ')[1])
            const keyB = parseInt(Object.keys(b).join('').split(' ')[1])

            if (keyA < keyB) return -1
            if (keyA > keyB) return 1
            return 0
        })

        setSortedAmount(resultArr.reverse())
    }

    return (
        <MainLayout>
            <Box
                bgColor="#2196f3"
                color="white"
                p="5"
                my="2"
                borderRadius="10"
            >
                <Heading size={{base: "lg", md: "xl"}} mb="5">{`Общее количество пациентов: ${patients?.length} чел.`}</Heading>
                <Divider/>
                <Heading size={{base: "lg", md: "xl"}} mt="3" mb="5">{`Общая сумма: ${totalAmount.toLocaleString()} руб.`}</Heading>
                <Divider/>
                <Heading size={{base: "md", md: "lg"}} py="3">Детализация:</Heading>
                {soredAmount.length
                    ? soredAmount.map((item, index) => {
                        const key = Object.keys(item)
                        const value = item[key]

                        return <Text key={index}>{`${key}: ${value.toLocaleString()} руб.`}</Text>
                    })
                    : ''
                }
            </Box>
        </MainLayout>
    )
}

export default React.memo(MainPage)
