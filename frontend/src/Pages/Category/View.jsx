import { useEffect, useState } from "react";
import { GetData, DeleteData } from "../../Api/Api";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useContext } from "react";
import { MainContext } from "../../Context/ContextHolder";
import { Link } from 'react-router-dom'

const View = () => {
    const [userData, setuserData] = useState([])
    const [ImagePath, setImagePath] = useState()
    const { setLoader, notify } = useContext(MainContext)

    const DeleteHandler = (id, ImageName) => {

        DeleteData(id, ImageName)
            .then(
                (success) => {
                    setLoader(true)
                    notify(success.data.msg, success.data.status)
                    GetData()
                        .then(
                            (success) => {
                                setuserData(success.data.userData)
                                setLoader(false)

                            }
                        ).catch(
                            (error) => {
                                console.log(error)
                                setLoader(false)

                            }
                        )
                }
            ).catch(
                (error) => {
                    console.log(error)
                    notify(error.data.msg, error.data.status)
                }
            )
    }

    useEffect(
        () => {
            setLoader(true)
            GetData()
                .then(
                    (success) => {
                        setImagePath(success.data.path)
                        setuserData(success.data.userData)
                        setLoader(false)
                    }
                ).catch(
                    (error) => {
                        console.log(error)
                        setLoader(false)
                    }
                )
        }, [setLoader]
    )

    return (
        <div className="pt-4">
            <table className="table text-center border">
                <tbody>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Image</th>
                        <th>Password</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Edit</th>
                        <th>Delete</th>

                    </tr>
                </tbody>
                <tbody>


                    {
                        userData?.map((d, i) => {
                            return <TableData data={d} Image={ImagePath} key={i} del={() => DeleteHandler(d._id, d.image)} />
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

const TableData = ({ data, del, Image }) => {


    return (
        <tr key={data?.id}>
            <td>{data?.name} </td>
            <td>{data?.email} </td>
            <td><img src={Image + data.image} className=" mx-auto w-[100px]" alt="img" /> </td>
            <td>{data?.password} </td>
            <td>{data?.age} </td>
            <td>{data?.gender} </td>
            <td><Link to={`/home/edit/${data?._id}`}><button className="px-3 bg-teal-950 text-white rounded py-1"><EditIcon />Edit</button></Link> </td>
            <td><button onClick={del} className="px-3 bg-red-800 text-white rounded py-1"><DeleteIcon />Delete</button> </td>
        </tr>
    );
};
export default View;
