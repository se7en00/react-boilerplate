import * as React from 'react'
import { fromEvent } from 'rxjs'
import { concatAll, filter, map,takeUntil } from 'rxjs/operators'
import './SimpleDrag.scss'

export interface ISimpleDragProps {
}

export default class SimpleDrag extends React.Component<ISimpleDragProps> {

    componentDidMount() {
        const dragDOM = document.querySelector('.simpleDrag__block') as HTMLElement
        const dragContentDom = document.querySelector('.simpleDrag') as HTMLElement

        const mouseDown = fromEvent(dragDOM, 'mousedown');
        const mouseUp = fromEvent(dragContentDom, 'mouseup');
        const mouseMove = fromEvent<MouseEvent>(dragContentDom, 'mousemove');

        mouseDown.pipe(
            map(event => mouseMove.pipe(takeUntil(mouseUp))),
            concatAll(),
            // map(event => ({x: event.clientX, y: event.clientY}))
            map(event => ({x: event.offsetX, y: event.offsetY}))
        ).subscribe((pos: {x: number, y: number}) => {
            dragDOM.style.left = pos.x + 'px';
            dragDOM.style.top = pos.y + 'px';
        })
    }
    public render() {
        return <div className="simpleDrag">
            <div className="simpleDrag__block"></div>

        </div>
    }
}
