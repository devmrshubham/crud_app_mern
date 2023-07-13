import React, { useEffect, useState } from 'react'
import { UpadteData, GetData } from '../../Api/Api'
import { useContext } from 'react'
import { MainContext } from '../../Context/ContextHolder'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Edit = () => {

    const { notify, setLoader } = useContext(MainContext);
    const { id } = useParams()
    const [OldData, setOldData] = useState({});
    const navigate = useNavigate()
    const SubmitForm = (e) => {
        e.preventDefault()

        // const data = {
        //     name: e.target.name.value,
        //     email: e.target.email.value,
        //     password: e.target.password.value,
        //     age: e.target.age.value,
        //     gender: e.target.gender.value

        // }

        const formData = new FormData();
        formData.append("name", e.target.name.value);
        formData.append("email", e.target.email.value);
        formData.append("password", e.target.password.value);
        formData.append("age", e.target.age.value);
        formData.append("gender", e.target.gender.value);
        formData.append("image", e.target.image.files[0]);
        formData.append("old_image", e.target.old_image.value);

        UpadteData(id, formData)
            .then(
                (success) => {

                    if (success.data.status === 1) {
                        notify(success.data.msg, success.data.status)
                        e.target.reset()
                        navigate("/home/category/view")
                    } else {
                        notify(success.data.msg, success.data.status)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    // notify(error.data.msg, error.data.status)
                }
            )

    }

    useEffect(
        () => {

            if (id !== undefined) {
                setLoader(true)
                GetData(id)
                    .then(
                        (success) => {

                            setOldData({ Path: success.data.path, ...success.data.userData })
                            setLoader(false)
                        }
                    ).catch(
                        (error) => {
                            console.log(error)
                            setLoader(false)
                        }
                    )
            }
        }, []
    )

    return (
        <div className='  pt-10 w-full f h-screen'>
            <div className="w-[500px]  shadow-lg border-2 mx-auto p-5  h-[650px]">
                <div className="text-2xl text-center ">Edit Information</div>
                <form onSubmit={(e) => SubmitForm(e)} encType='multipart/form-data'>

                    <div className="">
                        <label htmlFor="">Name :</label><br />
                        <input type="text" name='name' value={OldData?.name} placeholder='Enter Your Name'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded" onChange={(e) => {
                                setOldData({ ...OldData, name: e.target.value })
                            }} />
                    </div>

                    <div className="">
                        <label htmlFor="">Email :</label><br />
                        <input type="email" name='email' value={OldData?.email} placeholder='Enter Your Email'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded"
                            onChange={(e) => setOldData({ ...OldData, email: e.target.value })} />
                    </div>

                    <div className="">
                        <label htmlFor="">Password :</label><br />
                        <input type="password" name='password' value={OldData?.password} placeholder='Enter Your Password'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded"
                            onChange={(e) => setOldData({ ...OldData, password: e.target.value })} />
                    </div>

                    <div className="">
                        <label htmlFor="">age :</label><br />
                        <input type="number" name='age' value={OldData?.age} placeholder='Enter Your Age'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded"
                            onChange={(e) => setOldData({ ...OldData, age: e.target.value })} />
                    </div>

                    <div className="">
                        <label htmlFor="">Gender </label><br />
                        <div className="flex  gap-x-2 items-center">
                            <label htmlFor="">Male</label>
                            <input type="radio" name="gender" required value="male" onChange={(e) => setOldData({ ...OldData, gender: e.target.value })} />
                            <label htmlFor="">Female</label>
                            <input type="radio" name="gender" required value="female" onChange={(e) => setOldData({ ...OldData, gender: e.target.value })} />
                            <label htmlFor="">Other</label>
                            <input type="radio" name="gender" required value="other" onChange={(e) => setOldData({ ...OldData, gender: e.target.value })} />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="">New Image :</label><br />
                        <input type="file" required name='image'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded"
                        />
                    </div>

                    <input type="hidden" name="old_image" value={OldData.image} />

                    <div className="">
                        <div className="">Old Image</div>
                        <img src={OldData.Path + OldData?.image} className="w-[100px]" alt="img" />
                    </div>

                    <div className="mt-4">
                        <button className=' rounded bg-blue-500 text-white px-6 py-1'>Submit</button>
                    </div>
                </form>
            </div>
        </div>





    )
}

export default Edit
