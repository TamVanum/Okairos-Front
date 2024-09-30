import { Card, Carousel, Typography } from "antd";
import temporalLogo from '../assets/aaaaaa.jpg';
import Meta from "antd/es/card/Meta";
import p1 from "../assets/p1.webp";
import p2 from "../assets/p2.webp";
import p3 from "../assets/p3.png";

import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="h-fit mx-4 lg:mx-10 my-10 py-10 border-2 rounded-2xl border-primary-200">
            <div className="flex flex-col lg:flex-row items-center p-5">
                <div className="w-full lg:w-3/5 p-5 lg:p-10">
                    <p className="font-sans text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                        Bienvenido
                    </p>
                    <p className="font-sans text-lg lg:text-2xl text-gray-700 leading-relaxed mb-6">
                        Estamos emocionados de tenerte de vuelta.
                    </p>
                    <button
                        onClick={() => navigate("/customer/plants")}
                        className="bg-primary-400 text-white font-semibold py-2 px-4 lg:px-6 rounded-lg shadow-lg hover:bg-primary-300 transition duration-300 ease-in-out"
                    >
                        Hidropónicos
                    </button>
                </div>

                <div className="w-full lg:w-2/5 mt-8 lg:mt-0">
                    <Carousel autoplay>
                        <div>
                            <img src={`${p1}`} alt="Imagen 1" className="w-full rounded-lg" />
                        </div>
                        <div>
                            <img src={`${p2}`} alt="Imagen 2" className="w-full rounded-lg" />
                        </div>
                        <div>
                            <img src={`${p3}`} alt="Imagen 3" className="w-full rounded-lg" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </div>
    );
};

export default Home;