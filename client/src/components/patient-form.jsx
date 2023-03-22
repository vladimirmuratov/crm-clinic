import React, {useEffect} from 'react'
import {Box, Button, ButtonGroup, FormControl, FormLabel, Input, Text, Textarea} from '@chakra-ui/react'
import {useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import {useStore} from '../services/store.service'

const PatientForm = ({patient = undefined}) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const {createPatient, message, updatePatient, deletePatient, isLoading} = useStore(state => state)
    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm()

    const onSubmit = data => {
        const payload = {
            ...data,
            name: data.name.trim()
        }
        if (id) {
            updatePatient(id, payload)
        } else {
            createPatient(payload)
        }
    }

    const onCancel = () => navigate('/patient')

    const onDelete = () => {
        const answer = window.confirm(`Вы действительно хотите удалить данные "${patient?.name}"?`)
        if (answer) {
            deletePatient(patient?._id)
        }
    }

    useEffect(() => {
        if (message) {
            navigate('/patient')
            reset()
        }
    }, [message])

    useEffect(() => {
        if (patient) {
            setValue('name', patient.name)
            setValue('amount', patient.amount)
            setValue('date', patient.date)
            setValue('birthday', patient.birthday)
            setValue('phone', patient.phone)
            setValue('email', patient.email)
            setValue('address', patient.address)
            setValue('auto', patient.auto)
            setValue('passport', patient.passport)
            setValue('oms', patient.oms)
            setValue('contract', patient.contract)
            setValue('info', patient.info)
        }
    }, [patient])

    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
            <Box
                border='2px solid #e0e0e0'
                borderRadius="5px"
                p='4'
                mt="4"
                display='grid'
                gridTemplateColumns={{base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)'}}
                gap="3"
            >
                <FormControl>
                    <FormLabel>Ф.И.О.</FormLabel>
                    <Input
                        type='text'
                        {...register("name", {
                            required: {value: true, message: 'Введите Ф.И.О.'}
                        })}
                        style={{borderColor: errors.name?.message ? 'red' : ''}}
                    />
                    <Text fontSize="sm" color="red">{errors.name?.message}</Text>
                </FormControl>
                <FormControl>
                    <FormLabel>Сумма</FormLabel>
                    <Input type='number' {...register("amount")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Дата оплаты</FormLabel>
                    <Input type='date' {...register("date")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>День рождения</FormLabel>
                    <Input type='text' {...register("birthday")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Телефон</FormLabel>
                    <Input type='text' {...register("phone")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='text' {...register("email")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Адрес</FormLabel>
                    <Textarea {...register("address")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Авто</FormLabel>
                    <Input type='text' {...register("auto")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Паспорт</FormLabel>
                    <Textarea {...register("passport")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>ОМС</FormLabel>
                    <Input type='text' {...register("oms")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Договор</FormLabel>
                    <Input type='text' {...register("contract")}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Доп.инфо</FormLabel>
                    <Textarea {...register("info")}/>
                </FormControl>
            </Box>
            <Box my="3" display="flex" justifyContent="space-between">
                <Button
                    onClick={onDelete}
                    visibility={patient?._id ? 'visible' : 'hidden'}
                    size={{base: "sm", md: "md"}}
                    type="button"
                    colorScheme="red"
                >
                    Удалить
                </Button>
                <ButtonGroup>
                    <Button
                        size={{base: "sm", md: "md"}}
                        type="button"
                        colorScheme="gray"
                        onClick={onCancel}
                    >
                        Назад
                    </Button>
                    <Button
                        isLoading={isLoading}
                        size={{base: "sm", md: "md"}}
                        type="submit"
                        colorScheme="teal"
                    >
                        Сохранить
                    </Button>
                </ButtonGroup>
            </Box>
        </form>
    )
}

export default React.memo(PatientForm)
