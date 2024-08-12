const Footer = () =>{
    return(
        <div className="bg-black py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight">
                    OneUtil
                </span>
                <span className="text-white font-bold tracking-tight flex flex-col gap-2">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Services</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;