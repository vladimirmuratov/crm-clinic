import {CSVLink} from 'react-csv'
import moment from 'moment'
import {Text} from '@chakra-ui/react'

export const ExportCSV = ({csvData}) => {
    const fileName = `patients_${moment().format("DD_MM_YYYY_HH_mm")}`

    return (
        <Text>
            <CSVLink data={csvData} filename={fileName}>Експорт данных</CSVLink>
        </Text>
    )
}
