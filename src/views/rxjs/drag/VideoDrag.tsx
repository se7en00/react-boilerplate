import * as React from 'react'
import './SimpleDrag.scss'

export interface IVideoDragProps {
}

export default class VideoDrag extends React.Component<IVideoDragProps> {
    componentDidMount() {
        
    }

    public render() {
        return <div className="videoDrag">
            <div className="videoDrag__anchor">
                <div className="videoDrag__video">
                    <div className="videoDrag__masker"></div>
                </div>
            </div>
        </div>
    }
}

