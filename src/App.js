import {useEffect, useState} from "react";
import axios from "axios";

const App = () => {
    const baseUrl = 'http://fakestoreapi.com/products';
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getAsync = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(baseUrl);
                setData(response.data);
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        getAsync();
    }, []);

    if (loading) {
        return <div>LOADING...</div>;
    }
    if (error) {
        return <div>ERROR my brother</div>;
    }
    if (!data || data.length === 0) {
        return <div>нету данных</div>;
    }

    return (
        <div style={{display:'flex', justifyContent:'space-around', flexWrap:'wrap', gap:'20px'}}>
            {data.map((item) => (
                <div style={{width:'250px', border:'2px solid black'}} key={item.id}>
                    <span>{item.title}</span>
                    <img width='200px' src={item.image} alt=""/>
                </div>
            ))}
        </div>
    );
};

export default App;
