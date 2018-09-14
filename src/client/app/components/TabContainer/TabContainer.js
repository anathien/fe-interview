import React from "react";
import idx from "idx";

import { TabIndicator } from "./TabIndicator";

import styles from "./TabContainerStyles.css";

type TabDescriptor = {
    id: string,
    title: string,
    content: any,
};

type Props = {
    selectedTabId: string,
    tabs: Array<TabDescriptor>,
    onTabSelected: Function,
};

type State = {};

export class TabContainer extends React.Component<Props, State> {
    props: Props;
    state: State;

    handleIndicatorClick = (descriptor: TabDescriptor) => {
        if (descriptor != null && this.props.onTabSelected != null) {
            this.props.onTabSelected(descriptor);
        }
    };

    render() {
        const tabDescriptors = idx(this.props, _ => _.tabs) || [];
        const tabIndicators = tabDescriptors.map(descriptor => {
            return (
                <TabIndicator
                    key={descriptor.id}
                    descriptor={descriptor}
                    isSelected={descriptor.id === this.props.selectedTabId}
                    onClick={this.handleIndicatorClick}
                />
            );
        });

        const selectedTab = tabDescriptors.find(
            descriptor => descriptor.id === this.props.selectedTabId
        );
        const currentTabContent =
            selectedTab != null && selectedTab.content != null ? (
                selectedTab.content
            ) : (
                <div>No tab content found</div>
            );

        return (
            <div className={styles.container}>
                <div className={styles.tabHeader}>{tabIndicators}</div>
                <div className={styles.tabContent}>{currentTabContent}</div>
            </div>
        );
    }
}
