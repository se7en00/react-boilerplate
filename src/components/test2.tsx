import * as React from "react"

/* eslint-disable-next-line */
export const requiresUser = <P, T extends { new (props: any): React.Component<P> }>(_component: T): T => {
    const Component = _component as React.ComponentType<P>
    class RequiresUser extends React.Component<P> {
        componentDidMount() {
            // console.log("requires user")
        }

        render() {
            return <Component {...this.props} />
        }
    }
    return RequiresUser as T
}
