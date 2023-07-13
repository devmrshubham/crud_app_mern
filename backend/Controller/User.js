const User = require("../Model/User")
const path = require("path")
const fs = require("fs")

class UserController {

    addData = (data, image) => {

        return new Promise(async (resolve, rejected) => {

            const { name, email, password, age, gender } = data
            const exist = await User.findOne({ email: data.email });
            try {
                if (!name || !email || !password || !age || !gender || !image) {
                    rejected(
                        {
                            msg: "Please Fill the Data",
                            status: 0
                        }
                    )
                } else {
                    if (exist) {
                        rejected(
                            {
                                msg: "Uesr already exist",
                                status: 0
                            }
                        )
                    } else {


                        if (data.age < 18) {
                            rejected(
                                {
                                    msg: "User not eligibal you are under 18",
                                    status: 0
                                }
                            )
                        } else if (data.age > 30) {
                            rejected(
                                {
                                    msg: "User is not eligible you are above 30 years",
                                    status: 0
                                }
                            )
                        } else if (data.age > 17) {
                            const newUser = new User(
                                {
                                    name, email, password, age, gender, image
                                }
                            )
                            newUser.save()
                                .then(
                                    (success) => {
                                        resolve(
                                            {
                                                UserData: newUser,
                                                msg: "Data Added Successfully",
                                                status: 1
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {

                                        rejected(
                                            {
                                                msg: "Unable to  add Data",
                                                status: 0
                                            }
                                        )
                                    }
                                )
                        }
                    }
                }

            } catch (error) {
                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })

    }


    getData = (id) => {
        return new Promise(async (resolve, rejected) => {
            try {
                if (id !== undefined) {
                    let data = await User.findById({ _id: id });
                    if (data == null) {
                        rejected(
                            {
                                msg: "Data not Found",
                                status: 0
                            }
                        )
                    } else {
                        resolve(
                            {
                                userData: data,
                                path: "http://localhost:5000/upload/user/",
                                status: 1
                            }
                        )
                    }
                } else {
                    const data = await User.find().sort({ _id: "desc" });
                    resolve(
                        {
                            userData: data,
                            path: "http://localhost:5000/upload/user/",
                            status: 1
                        }
                    )
                }
            } catch (error) {
                rejected(
                    {
                        msg: "Internal server error",
                        status: 0
                    }
                )
            }
        })

    }

    DeleteData = (id, ImageName) => {

        return new Promise((resolve, rejected) => {
            try {
                User.findByIdAndDelete({ _id: id })
                    .then(
                        (success) => {
                            const ImagePath = path.join(__dirname, "../" + "/public/upload/user/", ImageName);
                            fs.unlinkSync(ImagePath)
                            resolve(
                                {
                                    msg: "Data Deleted successfull",
                                    status: 1,
                                    Data: success
                                }
                            )
                        }
                    ).catch(
                        (error) => {

                            rejected(
                                {
                                    msg: "Unable to Deleted Data",
                                    status: 0
                                }
                            )
                        }
                    )
            } catch (error) {
                rejected(
                    {
                        msg: "internal server error",
                        status: 0
                    }
                )
            }
        })
    }

    UpdateData = (id, data) => {

        return new Promise(async (resolve, rejected) => {
            const { name, email, password, age, gender, image } = data

            try {

                if (id !== undefined) {
                    if (!name || !email || !password || !age || !gender || !image) {
                        rejected(
                            {
                                msg: "Please Fill the Data",
                                status: 0
                            }
                        )
                    } else {



                        if (data.age < 18) {
                            rejected(
                                {
                                    msg: "User not eligibal you are under 18",
                                    status: 0
                                }
                            )
                        } else if (data.age > 30) {
                            rejected(
                                {
                                    msg: "User is not eligible you are above 30 years",
                                    status: 0
                                }
                            )
                        } else if (data.age > 17) {
                            User.findByIdAndUpdate(
                                {
                                    _id: id
                                },
                                {
                                    name, email, password, age, gender, image
                                }
                            )

                                .then(
                                    (success) => {
                                        resolve(
                                            {
                                                UserData: success,
                                                msg: "Data Updated Successfully",
                                                status: 1
                                            }
                                        )
                                    }
                                ).catch(
                                    (error) => {

                                        rejected(
                                            {
                                                msg: "Unable to  Updated Data",
                                                status: 0
                                            }
                                        )
                                    }
                                )
                        }

                    }
                } else {
                    rejected(
                        {
                            msg: "Unable to  Updated Data becuse data is null",
                            status: 0
                        }
                    )
                }


            } catch (error) {
                rejected(
                    {
                        msg: "internal server error",
                        status: 0
                    }
                )
            }
        })
    }
}

module.exports = { UserController }