import { useUIStore } from "../../hooks"

import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const ButtonScrollUp = () => {

    const { scrollTop } = useUIStore();

  return (
    <button className='scroll-buttom' onClick={ scrollTop } >
        <ExpandLessIcon style={{ fontSize: '50px' }}/>
    </button>    
  )
}
