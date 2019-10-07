import * as React from 'react'
import { fromEvent, interval } from 'rxjs'
import { take,exhaustMap } from 'rxjs/operators'
import './SimpleDrag.scss'

export interface IVideoDragProps {
}

export default class VideoDrag extends React.Component<IVideoDragProps> {
    componentDidMount() {
        var clicks = fromEvent(document, 'click')
        var result = clicks.pipe(
            exhaustMap((ev) => interval(1000).pipe(take(5))))
        result.subscribe(x => console.log(x))
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

