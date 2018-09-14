import React from "react";
import idx from "idx";

import type { TabDescriptor } from "./TabContainer";

import styles from "./TabContainerStyles.css";

type Props = {
    descriptor: TabDescriptor,
    isSelected: boolean,
    onClick: Function,
};

export class TabIndicator extends React.Component<Props> {
    props: Props;

    handleClick = () => {
        if (this.props.isSelected !== true && this.props.onClick != null) {
            this.props.onClick(this.props.descriptor);
        }
    };

    render() {
        if (this.props.descriptor != null) {
            const selectedStyle = this.props.isSelected === true ? styles.selected : "";
            return (
                <button
                    className={`${styles.tabIndicator} ${selectedStyle}`}
                    onClick={this.handleClick}
                >
                    {idx(this.props, _ => _.descriptor.title)}
                </button>
            );
        }
        return null;
    }
}
