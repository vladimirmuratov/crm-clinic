import {create} from 'zustand'
import {devtools} from 'zustand/middleware'
import {getToken, removeToken, setToken} from './localStorage.service'
import axios from 'axios'

export const useStore = create(devtools((setState, getState) => ({
    isLoading: false,
    token: null,
    isAuth: false,
    message: null,
    error: null,
    patients: [],
    clear: (key) => {
        setState({
            [key]: null
        })
    },
    init: () => {
        const token = getToken()
        if (token) {
            setState({
                token,
                isAuth: true
            })
        }
    },
    sighUp: async (payload) => {
        setState({
            isLoading: true
        })

        try {
            const response = await axios.post('/api/auth/register', payload)

            if (response.status === 201) {
                setState({
                    isLoading: false,
                    message: 'Вы успешно зарегистрированы! Войдите в систему, используя свой логин и пароль'
                })
            }

        } catch (e) {
            if (e.response.status === 409) {
                setState({
                    isLoading: false,
                    error: e.response.data.message
                })
            }
        }
    },
    signIn: async (payload) => {
        setState({
            isLoading: true
        })

        try {
            const response = await axios.post('/api/auth/login', payload)

            if (response.status === 200) {
                setToken(response.data.token)
                setState({
                    isLoading: false,
                    message: 'Вы успешно вошли в систему',
                    token: response.data.token,
                    isAuth: true
                })
            }
        } catch (e) {
            if (e.response.status === 404) {
                setState({
                    isLoading: false,
                    error: e.response.data.message
                })
            }

            if (e.response.status === 401) {
                setState({
                    isLoading: false,
                    error: e.response.data.message
                })
            }
        }
    },
    logout: () => {
        removeToken()
        setState({
            isAuth: false,
            token: null
        })
    },
    getAllPatients: async () => {
        setState({
            isLoading: true
        })

        try {
            const response = await axios.get('/api/patient', {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                setState({
                    isLoading: false,
                    patients: response.data,
                    message: 'Список пациенов загружен'
                })
            }
        } catch (e) {
            if (e.response.status === 401) {
                removeToken()
                setState({
                    isLoading: false,
                    isAuth: false,
                    token: null,
                    error: 'Сессия закончилась. Пожалуйста войдите в систему'
                })
            }
        }
    },
    createPatient: async (payload) => {
        setState({
            isLoading: true
        })

        try {
            const response = await axios.post('/api/patient', payload, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 201) {
                setState({
                    isLoading: false,
                    message: 'Пациент добавлен',
                    patients: [
                        ...getState().patients,
                        response.data
                    ]
                })
            }
        } catch (e) {
            if (e.response.status === 401) {
                removeToken()
                setState({
                    isLoading: false,
                    isAuth: false,
                    token: null,
                    error: 'Сессия закончилась. Пожалуйста войдите в систему'
                })
            } else {
                setState({
                    isLoading: false,
                    error: 'Ошибка! Пациент не добавлен'
                })
            }
        }
    },
    updatePatient: async (id, payload) => {
        setState({
            isLoading: true
        })

        try {
            const response = await axios.patch(`/api/patient/${id}`, payload, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                const patients = getState().patients.map(p => {
                    if (p._id === id) {
                        return response.data
                    } else {
                        return p
                    }
                })
                setState({
                    isLoading: false,
                    message: 'Данные обновлены',
                    patients
                })
            }
        } catch (e) {
            if (e.response.status === 401) {
                removeToken()
                setState({
                    isLoading: false,
                    isAuth: false,
                    token: null,
                    error: 'Сессия закончилась. Пожалуйста войдите в систему'
                })
            } else {
                setState({
                    isLoading: false,
                    error: 'Ошибка! Данные не обновлены'
                })
            }
        }
    },
    deletePatient: async (id) => {
        setState({
            isLoading: true
        })

        try {
            const response = await axios.delete(`/api/patient/${id}`, {
                headers: {
                    Authorization: getState().token
                }
            })

            if (response.status === 200) {
                const patients = getState().patients.filter(p => p._id !== id)
                setState({
                    isLoading: false,
                    message: response.data.message,
                    patients
                })
            }
        } catch (e) {
            if (e.response.status === 401) {
                removeToken()
                setState({
                    isLoading: false,
                    isAuth: false,
                    token: null,
                    error: 'Сессия закончилась. Пожалуйста войдите в систему'
                })
            } else {
                setState({
                    isLoading: false,
                    error: 'Ошибка! Данные не удалены'
                })
            }
        }
    }
})))
