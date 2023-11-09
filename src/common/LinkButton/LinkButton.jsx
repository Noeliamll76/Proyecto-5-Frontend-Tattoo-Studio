
import './LinkButton.css'

import { useNavigate } from 'react-router-dom'

export const LinkButton = ({path, title}) =>{
const navegate = useNavigate()

return (
    <div className="linkButtonDesign" onClick={()=>navegate(path)}>{title}
    </div>
)
}
