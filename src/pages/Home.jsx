import { Card, Carousel, Typography } from "antd"
import temporalLogo from '../assets/aaaaaa.jpg';
import Meta from "antd/es/card/Meta";
import p1 from "../assets/p1.webp"
import p2 from "../assets/p2.webp"
import p3 from "../assets/p3.png"

import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    const cardsData = [
        { title: "Perfil", number: 1 },
        { title: "Hidropónicos", number: 2 },
        { title: "Hydroponicos Activos", number: 3 },
    ];
    return (
        <div className="h-fit mx-10 my-10 py-10 border-2 rounded-2xl border-primary-200">
            <div className="flex items-center p-5">
                <div className="w-3/5 p-10">
                    <p className="font-sans text-5xl font-bold text-gray-900 leading-tight mb-4">
                        Bienvenido
                    </p>
                    <p className="font-sans text-2xl text-gray-700 leading-relaxed mb-6">
                        Estamos emocionados de tenerte de vuelta.
                    </p>
                    <button onClick={() => navigate("/customer/plants")} className="bg-primary-400 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-primary-300 transition duration-300 ease-in-out">
                        Hidropónicos
                    </button>
                </div>
                <div className="w-2/5">
                    <Carousel autoplay>
                        <div>
                            <img src={`${p1}`} alt="" />
                        </div>
                        <div>
                            <img src={`${p2}`} alt="" />
                        </div>
                        <div>
                            <img src={`${p3}`} alt="" />
                        </div>
                    </Carousel>
                </div>
            </div>


        </div>
    )
}

export default Home
{/* 
    <Card
        className="w-60 h-80 border-2 border-white rounded-lg text-center"
        title={<div className="text-white">Alertas Levantadas</div>}
        cover={
            <div className="flex items-center justify-center h-32 bg-gray-800 text-white">
                <div className="text-6xl">2</div>
            </div>
        }
    >
        <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>

    <Card
        className="w-60 h-80 border-2 border-white rounded-lg text-center"
        title={<div className="text-white">Hydroponicos Activos</div>}
        cover={
            <div className="flex items-center justify-center h-32 bg-gray-800 text-white">
                <div className="text-6xl">3</div>
            </div>
        }
    >
        <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card> */}