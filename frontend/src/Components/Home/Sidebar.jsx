import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
    const menus = [
        {
            name: "Dashbord",
            path: "/",
            multi: "false"

        },

        {
            name: "Category",
            multi: "true",
            item: [
                {
                    route: "Add",
                    path: "/home/category/add",
                },
                {
                    route: "View",
                    path: "/home/category/view",
                },
            ],
        }

    ];
    return (
        <div className=" h-screen bg-blue-400">
            <ul className=" ml-10 mt-10">
                {menus.map((d, i) => {
                    return <MenuList key={i} menu={d} />;
                })}
            </ul>
        </div>
    );
};

const MenuList = (props) => {
    const { menu } = props
    const [show, setShow] = useState(false)
    return (
        <li onClick={() => setShow(!show)} className=" select-none cursor-pointer my-2">
            {menu.multi === false ? <Link to={menu.path}>{menu.name}</Link> : <span>{menu.name} </span>}
            {
                menu.multi ? (<ul className={`${show ? "block" : "hidden"}`}>
                    {
                        menu.item?.map((d, i) => {
                            return (
                                <li key={i} >
                                    <Link to={d.path}>
                                        {
                                            d.route
                                        }
                                    </Link>
                                </li>
                            )
                        })
                    }
                </ul>) :
                    (<div></div>)
            }
        </li >
    );
};

export default Sidebar;
