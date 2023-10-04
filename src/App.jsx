import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import cloudy from "./assets/images/cloudy.gif";
import rain from "./assets/images/rain.gif";
import storm from "./assets/images/storm.gif";
import sun from "./assets/images/sun.gif";
import foggy from "./assets/images/foggy.gif";

const api = {
    key: "16bfa98849718de13b6e8978b87d47b8",
    base: "https://api.openweathermap.org/data/2.5",
};

function App() {
    const [weather, setWeather] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const successCallback = (position) => {
            const { latitude, longitude } = position.coords;
            axios.get(`${api.base}/weather?lat=${latitude}&lon=${longitude}&APPID=${api.key}`).then((res) => {
                console.log(res.data);
                setWeather(res.data);
                setIsLoading(true);
            });
        };
        const errorCallback = (position) => {
            console.log(position);
            alert("aplikasi perlu izin akses lokasi");
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        setIsLoading(false);
    }, []);

    const stopLoading = () => {
        if (!isLoading) {
            return <div className="mx-auto p-4 text-center">loading...</div>;
        } else {
            let images;
            switch (weather.weather[0].main) {
                case "Clear":
                    images = sun;
                    break;
                case "Rain":
                    images = rain;
                    break;
                case "Clouds":
                    images = cloudy;
                    break;
                case "Thunderstorm":
                    images = storm;
                    break;
                case "Haze":
                    images = foggy;
                    break;
                default:
                    images = "maaf gambar belum tersedia";
                    break;
            }
            let tempC = weather?.main?.temp - 273.15 || "";
            return (
                <>
                    <div className="text-center">
                        <h2>{weather.name}</h2>
                        <img src={`${images}`} alt={`${images}`} />
                    </div>
                    <div className="flex justify-between">
                        <div>{Math.round(tempC)}&deg;C</div>
                        <div>{weather?.weather?.[0]?.description || ""}</div>
                    </div>
                </>
            );
        }
    };

    return (
        <>
            <header>
                <nav>
                    <div className="mt-12 mx-20 flex justify-between items-center flex-wrap">
                        <h1 className="text-3xl font-bold">weather app</h1>
                        <ul className="flex gap-12">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="#">Download App</a>
                            </li>
                            <li>
                                <a href="#">Contact Us</a>
                            </li>
                        </ul>
                        <button type="button" className="flex px rounded-2xl py-3 px-4 bg-sky-500">
                            Sign Up
                        </button>
                    </div>
                </nav>
            </header>
            <main>
                <div className="flex flex-wrap mt-28 justify-around">
                    <h3 className="w-96 text-end font-semibold text-2xl">Seeing the weather of the whole world with Dark Weather!</h3>
                    <div className="w-96 font-semibold text-2xl">
                        <div className="rounded-md w-full bg-sky-700 overflow-hidden p-4">{stopLoading()}</div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default App;
