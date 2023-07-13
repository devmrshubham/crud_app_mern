
const GetRamdomImageName = (name) => {
    return new Date().getTime() + " " + Math.floor(Math.random() * 1000) + name;
}

const GetImageDest = (module, ImageName) => {
    return __dirname + `/public/upload/${module}/${ImageName}`
}

module.exports = { GetImageDest, GetRamdomImageName }