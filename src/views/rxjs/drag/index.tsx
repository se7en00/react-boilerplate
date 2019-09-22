import * as React from 'react'
import { Link, Route } from 'react-router-dom'
import SimpleDrag from './SimpleDrag'
import Drag from './VideoDrag'

interface IDragLinkProps {
}

const DragLink: React.SFC<IDragLinkProps> = (props) => {
    return <div className="drag">
        <ul className="drag__sideBar">
            <li><Link to='/drag/simpleDrag'>simpleDrag</Link></li>
            <li><Link to='/drag/test'>Drag</Link></li>
        </ul>
        <div className="drag__content">
            <Route path="/drag/simpleDrag" component={SimpleDrag} />
            <Route path="/drag/test" component={Drag} />
        </div>

    </div>
}

export default DragLink;
