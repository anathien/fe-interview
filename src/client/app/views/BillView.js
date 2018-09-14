import React from "react";
import { TabContainer } from "../components/TabContainer/TabContainer";

import type { TabDescriptor } from "./components/TabContainer/TabContainer";

// import styles from "./TabContainerStyles.css";

type Props = {};

type State = {
    selectedTabId: string,
};

export class BillView extends React.Component<Props, State> {
    props: Props;
    state: State;

    tabDescriptors: Array<TabDescriptor> = [
        {
            id: "tab_bills",
            title: "Bills",
            content: <div>alma</div>,
        },
        {
            id: "tab_potential_bills",
            title: "Potential bills",
            content: <div>korte</div>,
        },
    ];

    constructor(props: Props) {
        super(props);

        this.state = {
            selectedTabId: this.tabDescriptors[0].id,
        };
    }

    handleTabSelected = (descriptor: TabDescriptor) => {
        if (descriptor != null) {
            this.setState({
                selectedTabId: descriptor.id,
            });
        }
    };

    render() {
        return (
            <TabContainer
                tabs={this.tabDescriptors}
                selectedTabId={this.state.selectedTabId}
                onTabSelected={this.handleTabSelected}
            />
        );
    }
}
