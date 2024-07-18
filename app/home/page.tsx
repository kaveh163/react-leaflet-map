import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
 
 
const DynamicHeader = dynamic(() => import('../../components/map-component'), {
  ssr: false,
})

export default function Home() {
    return (
        // <div className='grid grid-cols-3'>
        //     <div className=' col-span-1'>
            <DynamicHeader/>

        //     </div>

        // </div>
    )
}