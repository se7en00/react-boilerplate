import React, { Component, ComponentClass } from "react"

class Badge extends React.Component<{ value: number }> {}

function withBadge(
    value: number,
    hidden: boolean = value === 0
): <P extends object>(WrappedComponent: ComponentClass<P>) => void {
    return <P extends object>(WrappedComponent: ComponentClass<P>) =>
        class BadgedComponent extends Component<P> {
            render(): JSX.Element {
                return (
                    <React.Fragment>
                        <WrappedComponent {...this.props} />
                        {!hidden && <Badge value={value} />}
                    </React.Fragment>
                )
            }
        }
}

@withBadge(1)
export default class BadgedCart extends React.PureComponent {
    render(): JSX.Element {
        return <div />
    }
}
