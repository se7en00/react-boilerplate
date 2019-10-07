import * as React from 'react'
import axios, { AxiosResponse } from 'axios'
import classnames from 'classnames'
import { fromEvent, from, of, Subscription, asyncScheduler, EMPTY } from 'rxjs'
import {
    filter, pairwise, map, startWith, timeout, throttleTime,
    exhaustMap, catchError, delay, concat, concatMap, tap
} from 'rxjs/operators'

import './scroll.scss'
import divide from 'ramda/es/divide'
import { booleanLiteral } from '@babel/types'

interface INews {
    id: number
    title: string
    points?: number
    user?: string
    domain?: string
    url?: string
}

interface IPosition {
    sH: number
    sT: number
    cH: number
}

type IResp = {
    showLoader: boolean
    result: INews[]
}

export interface IScrollProps {
}

export interface IScrollStates {
    currentPage: number
    newsList: INews[]
    isLoading: boolean
    noMoreNews: boolean
}

export default class Scroll extends React.Component<IScrollProps, IScrollStates> {
    readonly state: IScrollStates = {
        currentPage: 1,
        newsList: [],
        isLoading: false,
        noMoreNews: false
    }
    private scrollSubscription: Subscription = new Subscription()
    private scrollElemRef = React.createRef<HTMLUListElement>()
    private limitMaxPage = 3 //滚动加载的最大页数

    /**
     * 请求
    */
    private getQuotesAPI = async () => {
        const { currentPage } = this.state
        console.log(currentPage)
        if (currentPage > this.limitMaxPage) return []
        return await axios.get<INews[]>('https://node-hnapi.herokuapp.com/news?page=' + this.state.currentPage)
            .then(resp => resp.data)
    }

    /**
      检查用户是否向下滚动，通过前一个滚动位置
      和当前滚动位置进行判断
    **/
    private isUserScrollingDown = (positions: IPosition[]) => {
        return positions[0].sT < positions[1].sT;
    }

    /**
      检查滚动位置是否达到了要求的容器百分比高度
    **/
    private isScrollExpectedPercent = (position: IPosition, percent: number) => {
        return ((position.sT + position.cH) / position.sH) > (percent / 100);
    }

    componentDidMount() {
        const scrollElem = this.scrollElemRef.current
        const scrollEvent$ = fromEvent<MouseEvent>(scrollElem!, 'scroll')

        const userScrolledDown$ = scrollEvent$.pipe(
            map(e => {
                const target = e.target as HTMLUListElement
                return {
                    sH: target.scrollHeight,
                    sT: target.scrollTop,
                    cH: target.clientHeight
                }
            }),
            pairwise(),
            filter(positions => (this.isUserScrollingDown(positions) && this.isScrollExpectedPercent(positions[1], 90))),
            startWith({ showLoader: false }),
            // debounceTime(200)
        )

        const requestNews = () => from(this.getQuotesAPI()).pipe(
            //故意设成800ms，以测试throttleTime 400的效果
            delay(800),
            //只会发送响应延迟在10秒内的数据， 超过10秒不以发送
            timeout(10000),
            //请求响应后， 设置spinner关闭的标记
            map(result => ({ result, showLoader: false })),
            catchError(error => (of({ error, showLoader: false })))
        )

        const requestOnScroll$ = userScrolledDown$.pipe(
            exhaustMap(() => {
                return of({ showLoader: false }, { showLoader: true }).pipe(
                    concat(requestNews()),
                    //默认一开始时先发出false，在延迟400ms后发出true，
                    throttleTime(400, asyncScheduler, { leading: true, trailing: true }),
                    tap((x) => {
                        console.log(x)
                    }),
                    //如果在响应的数据网络延迟在400ms内, 直接会返回响应数据, 否则会先返回true
                    concatMap(x => (x.showLoader ? EMPTY.pipe(delay(1000), startWith(x)) : of(x)))
                )
                // return from(this.getQuotesAPI()).pipe(
                //     finalize(() => {
                //         console.log(222)
                //         return this.toggleLoading()
                //     })
                // )
            }),
        )


        this.scrollSubscription = requestOnScroll$.subscribe(newsResponse => {
            let { currentPage: page, newsList } = this.state
            this.setState({ isLoading: newsResponse.showLoader })
            const results = newsResponse as IResp

            if (results.result && results.result.length) {
                this.setState({ currentPage: ++page, newsList: [...newsList, ...results.result] })
            }

            if (results.result && !results.result.length) {
                this.setState({ currentPage: ++page, noMoreNews: true })
            }
        })
    }

    componentWillUnmount() {
        this.scrollSubscription.unsubscribe()
    }


    public render() {
        const { newsList, isLoading, noMoreNews } = this.state
        return (
            <div className="scroll">
                {isLoading && <div className="scroll__loading">Loading...</div>}
                <ul className='scroll__list' ref={this.scrollElemRef}>
                    {
                        newsList.map(news => {
                            return <li key={news.id}>{news.id} -- {news.title}</li>
                        })
                    }
                </ul>
                {noMoreNews && <div className="scroll__noMoreInfo">没有更多了！</div>}
            </div>
        )
    }
}
