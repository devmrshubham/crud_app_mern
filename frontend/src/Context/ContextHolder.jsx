import React, { useState } from 'react'
import { createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const MainContext = createContext()

const ContextHolder = (props) => {
    const [loader, setLoader] = useState()
    const notify = (msg, type) => {

        if (type === 1) {
            toast.success(msg);
        } else {
            toast.error(msg)
        }
    }
    return (

        <MainContext.Provider value={{ notify, setLoader }}>
            <div className="box" style={{ display: loader ? "flex" : "none" }}>
                <div></div>
            </div>
            <ToastContainer />
            {
                props.children
            }
        </MainContext.Provider>
    )
}

export default ContextHolder
