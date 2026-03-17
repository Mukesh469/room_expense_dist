import Marquee from "react-fast-marquee";

const TopBar = () => {
    return (
        <Marquee pauseOnHover={true} speed={50} gradient={true} className="z-100">
            <span className="text-orange-500">welcome to the room expense distributor </span>
            <span className="text-orange-500 ml-10">created with ❤️ by Mukesh Kumar</span>
        </Marquee>
    )
}

export default TopBar