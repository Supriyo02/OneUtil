import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import LatestServiceCard from '../components/LatestServiceCard';

const Home =()=>{
  const{data: services}= useQuery("fetchQuery", ()=> apiClient.fetchServices());

  const topRowServices = services?.slice(0,2) || [];
  const bottomRowServices = services?.slice(2,23) || [];

  return(
    <div className='space-y-3'>
      <h2 className='text-3xl font-bold'>Latest Services</h2>
      <p>Most recent services added by our partners</p>
      <div className='grid gap-4 '>
        <div className='grid md:grid-cols-2 grid-cols-1'>{topRowServices.map((service)=>(
          <LatestServiceCard service={service}/>
        ))}
        </div>
        <div className='grid md:grid-cols-3 gap-4'>
          {bottomRowServices.map((service)=>(
            <LatestServiceCard service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home;