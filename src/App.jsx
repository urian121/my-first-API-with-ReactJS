import { useEffect, useState } from 'react';
import './assets/css/api.css';


const MyComponent = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await fetch('https://reqres.in/api/users?page=1');
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const json = await response.json();
        console.log(json.data);
        setData(json.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className='text-center'>Cargando Data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {data && (
        <section className='mt-5'>
          <div className='col-md-12'>
            <h2 className='text-center titulo'>Consumiendo una API desde ReactJS <hr /> </h2>
          </div>
          {data.map((item) => (
            <div className="media mb-3"  key={item.id}>
            <img src={item.avatar} className="mr-3 latidos-animation" alt="perfil"/>
            <div className="media-body">
                <h4 className="mt-2">{item.first_name} { item.last_name }</h4>
                <p> <strong> Email: </strong> {item.email}</p>

                <div className="circle">
                  <span className="number">{item.id}</span>
                </div>

            </div>
          </div>
            
          ))}
        </section>
      )}
    </>
  );
};

export default MyComponent;
