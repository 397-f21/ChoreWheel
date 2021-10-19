import { FaDharmachakra } from 'react-icons/fa';


const Layout = ( {children} ) => (
    <div>
        <div className='navbar navbar-light bg-light'>
        <div className='container-fluid'>
          <span className='navbar-brand justify-content-bottom'>
            <FaDharmachakra size="1.7em" style={{color: '#d4af37', marginTop: '-.4em'}} />
            <span className="h2 fw-bold"> 
              ChoreWheel 
            </span>
          </span>
        </div>
      </div>
        {children}
    </div>
    
);

export default Layout;

