const express = require("express");
const Router = express.Router();
const { UserController } = require("../Controller/User");
const fileupload = require("express-fileupload");
const { GetImageDest, GetRamdomImageName } = require("../Helper")
const path = require("path");
const fs = require("fs")

Router.post("/", fileupload({ createParentPath: true }), (req, res) => {
    const Image = req.files.image;
    const ImageArr = Image.name.split(".");
    const ext = ImageArr[ImageArr.length - 1]
    const AllowExt = ["png", "jpeg", "jpg", "gif", "webp"]
    if (AllowExt.includes(ext.toLowerCase())) {
        const ImageName = GetRamdomImageName(Image.name)
        const Destination = GetImageDest("user", ImageName)
        try {
            Image.mv(Destination)
            const response = new UserController().addData(req.body, ImageName)
            response
                .then(
                    (success) => {
                        res.send(success)
                    }
                ).catch(
                    (error) => {
                        res.send(error)
                    }
                )

        } catch (error) {
            res.send(
                {
                    msg: "Unable to add data",
                    status: 0
                }
            )
        }
    } else {
        res.send(
            {
                msg: "this file is not allowed only Image file are allowed",
                status: 0
            }
        )
    }
})

Router.get("/:id?", (req, res) => {
    try {
        const response = new UserController().getData(req.params.id);
        response
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    } catch (error) {
        res.send(error)
    }
})

Router.delete("/:id?/:ImageName", (req, res) => {

    try {
        const response = new UserController().DeleteData(req.params.id, req.params.ImageName);
        response
            .then(
                (success) => {
                    res.send(success)
                }
            ).catch(
                (error) => {
                    res.send(error)
                }
            )
    } catch (error) {
        res.send(error)
    }
})

Router.put("/:id?", fileupload({ createParentPath: true }), (req, res) => {
    let OldImage = req.body.old_image;
    const NewImage = req.files.image;
    const NewImageArr = NewImage.name.split(".");
    const ext = NewImageArr[NewImageArr.length - 1]
    const AllowExt = ["png", "jpeg", "jpg", "gif", "webp"]

    try {
        if (AllowExt.includes(ext.toLowerCase())) {

            if (NewImage !== undefined) {
                OldImage = GetRamdomImageName(NewImage.name);
                const Destination = GetImageDest("user", OldImage);
                NewImage.mv(Destination)
                const Imagepath = path.join(__dirname, "../public/upload/user/", req.body.old_image)
                fs.unlinkSync(Imagepath)
            }

            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                age: req.body.age,
                gender: req.body.gender,
                image: OldImage
            }

            const response = new UserController().UpdateData(req.params.id, data);
            response
                .then(
                    (success) => {
                        res.send(success)
                    }
                ).catch(
                    (error) => {
                        res.send(error)
                    }
                )

        } else {
            res.send(
                {
                    msg: "this file is not allowed only Image file are allowed",
                    status: 0
                }
            )
        }

    } catch (error) {

        res.send(error)
    }
})
module.exports = Router