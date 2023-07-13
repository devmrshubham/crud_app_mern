import React from 'react'
import { AddData } from '../../Api/Api'
import { useContext } from 'react'
import { MainContext } from '../../Context/ContextHolder'

const Add = () => {

    const { notify } = useContext(MainContext);

    const SubmitForm = (e) => {
        e.preventDefault()


        const formData = new FormData();
        formData.append("name", e.target.name.value)
        formData.append("image", e.target.image.files[0])
        formData.append("email", e.target.email.value)
        formData.append("password", e.target.password.value)
        formData.append("age", e.target.age.value)
        formData.append("gender", e.target.gender.value)




        AddData(formData)
            .then(
                (success) => {
                    console.log(success)
                    if (success.data.status === 1) {
                        notify(success.data.msg, success.data.status)
                        e.target.reset()
                    } else {
                        notify(success.data.msg, success.data.status)
                    }
                }
            ).catch(
                (error) => {
                    console.log(error)
                    notify(error.data.msg, error.data.status)
                }
            )

    }
    return (
        <div className='  pt-10 w-full f h-screen'>
            <div className="w-[500px]  shadow-2xl  border-2 mx-auto p-5  h-[500px]">
                <div className="text-2xl text-center ">Information</div>
                <form onSubmit={(e) => SubmitForm(e)} encType='multipart/form-data'>
                    <div className="">
                        <label htmlFor="">Name :</label><br />
                        <input type="text" name='name' placeholder='Enter Your Name'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded" />
                    </div>

                    <div className="">
                        <label htmlFor="">Email :</label><br />
                        <input type="email" name='email' placeholder='Enter Your Email'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded" />
                    </div>

                    <div className="">
                        <label htmlFor="">Password :</label><br />
                        <input type="password" name='password' placeholder='Enter Your Password'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded" />
                    </div>

                    <div className="">
                        <label htmlFor="">age :</label><br />
                        <input type="number" name='age' placeholder='Enter Your Age'
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded" />
                    </div>

                    <div className="">
                        <label htmlFor="">Image:</label><br />
                        <input type="file" name="image"
                            className="w-full py-1 px-3 outline-none mt-1 border-2 rounded" />
                    </div>

                    <div className="">
                        <label htmlFor="">Gender </label><br />
                        <div className="flex  gap-x-2 items-center">
                            <label htmlFor="">Male</label>
                            <input type="radio" name="gender" value="male" />
                            <label htmlFor="">Female</label>
                            <input type="radio" name="gender" value="female" />
                            <label htmlFor="">Other</label>
                            <input type="radio" name="gender" value="other" />
                        </div>
                    </div>


                    <div className="mt-4">
                        <button className=' rounded bg-blue-500 text-white px-6 py-1'>Submit</button>
                    </div>





                </form>
            </div>
        </div>
    )
}

export default Add
