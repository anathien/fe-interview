/* @flow */
// Note: I had this component lying around from another project, it wasn't coded in the scope of
// this exercise.

import React from "react";

import styles from "./CollapsibleContainerStyles.css";

type Props = {
    domId: string,
    isOpen: boolean,
    expandedContent: Array<any>,
};

type State = {
    collapsibleContentHeight: number,
    applyOverflowVisible: boolean,
};

const ANIMATION_DURATION = 500;

export class CollapsibleContainer extends React.Component<Props, State> {
    props: Props;
    state: State = {
        collapsibleContentHeight: 0,
        applyOverflowVisible: false,
    };

    collapsibleContent: Object;
    overflowTimeout: any;

    componentWillMount() {
        if (this.props.isOpen) {
            this.setState({
                applyOverflowVisible: true,
            });
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        if (this.props.isOpen !== nextProps.isOpen) {
            this.handleOpenStateChange(nextProps.isOpen);
        }
    }

    componentWillUnmount = () => {
        this.clearOverflowTimeout();
    };

    handleOpenStateChange = (newOpenState: boolean) => {
        if (newOpenState === true) {
            this.handleOverflowToVisible();
        } else {
            this.clearOverflowTimeout();
            if (this.state.applyOverflowVisible) {
                this.setState({
                    applyOverflowVisible: false,
                });
            }
        }
    };

    handleOverflowToVisible = () => {
        this.clearOverflowTimeout();
        this.overflowTimeout = setTimeout(() => {
            this.setState({
                applyOverflowVisible: this.props.isOpen,
            });
        }, ANIMATION_DURATION);
    };

    clearOverflowTimeout = () => {
        if (this.overflowTimeout != null) {
            clearTimeout(this.overflowTimeout);
        }
    };

    render() {
        const { isOpen, domId, expandedContent } = this.props;
        const { collapsibleContentHeight, applyOverflowVisible } = this.state;

        // Note: Setting the max height explicitly is needed so that CSS transitions actually
        // animate the height when collapsing the content (auto or random values don't work
        // well).
        const contentHeight =
            collapsibleContentHeight > 0 ? `${collapsibleContentHeight}px` : "auto";
        const wrapperHeight = isOpen ? contentHeight : "0";

        let wrapperStyle = "";
        if (isOpen && applyOverflowVisible === true) {
            wrapperStyle = styles.open;
        } else if (!isOpen) {
            wrapperStyle = styles.collapsed;
        }
        return (
            <div
                id={`${domId}_container`}
                className={`${styles.collapsibleWrapper} ${wrapperStyle}`}
                style={{ maxHeight: wrapperHeight }}
            >
                <div
                    className={styles.collapsibleContent}
                    ref={element => {
                        if (element) {
                            this.collapsibleContent = element;
                            // TODO: check if this works in all browsers
                            if (
                                element != null &&
                                element.clientHeight !== collapsibleContentHeight
                            ) {
                                this.setState({
                                    collapsibleContentHeight: element.clientHeight,
                                });
                            }
                        }
                    }}
                >
                    <div id={`${domId}_content`} className={styles.expandedContentContainer}>
                        {expandedContent}
                    </div>
                </div>
            </div>
        );
    }
}
