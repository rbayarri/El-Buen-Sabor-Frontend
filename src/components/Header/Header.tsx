import '../../components/Header/Header.css'

export const Header = () => {
    return (
        <>
            <div className='header' style={{
                position: "relative",
                height: "570px",
                background: "#000 url(https://wallpapers.com/images/hd/burger-king-veggie-burger-5bhc56evplhjlvf0.jpg)",
                backgroundSize: "cover",
                backgroundPositionY: "bottom",
                opacity: "80%",
            }}>
                <img className='logoH' src={"src/assets/lcfbr.png"} alt=""/>
            </div>
        </>
    )
}



