import axios from "axios";
const Url = "http://localhost:5000"

const AddData = (data) => {
    return new Promise((resolve, rejected) => {
        try {
            axios.post(`${Url}/user`, data)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {

        }
    })
}

const GetData = (id) => {
    return new Promise(async (resolve, rejected) => {
        try {
            if (id !== undefined) {

                await axios.get(`${Url}/user/${id}`)
                    .then(
                        (success) => {
                            resolve(success)
                        }
                    ).catch(
                        (error) => {
                            rejected(error)
                        }
                    )
            } else {
                await axios.get(`${Url}/user`)
                    .then(
                        (success) => {
                            resolve(success)
                        }
                    ).catch(
                        (error) => {
                            rejected(error)
                        }
                    )
            }
        } catch (error) {
            rejected(error.message)
        }
    })
}

const DeleteData = (id, ImageName) => {
    return new Promise((resolve, rejected) => {
        try {
            axios.delete(`${Url}/user/${id}/${ImageName}`)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {

        }
    })
}


const UpadteData = (id, data) => {
    return new Promise((resolve, rejected) => {
        try {
            axios.put(`${Url}/user/${id}`, data)
                .then(
                    (success) => {
                        resolve(success)
                    }
                ).catch(
                    (error) => {
                        rejected(error)
                    }
                )
        } catch (error) {

        }
    })
}

export { AddData, GetData, DeleteData, UpadteData };