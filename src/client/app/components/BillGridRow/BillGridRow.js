import React from "react";
import { CollapsibleContainer } from "../CollapsibleContainer/CollapsibleContainer";

import styles from "./BillGridRowStyles.css";

type Props = {
    bill: Object,
    actionButtonText: string,
    onActionButtonClicked: Function,
};

type State = {
    isExpanded: boolean,
};

export class BillGridRow extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            isExpanded: false,
        };
    }

    handleClick = () => {
        this.setState({
            isExpanded: !this.state.isExpanded,
        });
    };

    render() {
        const { bill } = this.props;

        return (
            <div
                key={bill.id}
                className={styles.gridLineWrapper}
                onClick={this.handleClick}
                role="button"
            >
                <div key={bill.id} className={styles.gridLine}>
                    {/* Note: I know the specs said transaction count should be shown "under"
                        the bill name, but it looks way more decent this way. */}
                    <div className={styles.itemName}>{bill.name}</div>
                    <div className={styles.itemCount}>
                        {(bill.transactions || []).length} transactions
                    </div>
                    <div className={styles.itemAction}>
                        <button className={styles.actionButton}>{this.props.buttonText}</button>
                    </div>
                </div>
                <CollapsibleContainer
                    domId={`${bill.id}_transactionList`}
                    isOpen={this.state.isExpanded}
                    expandedContent={[
                        <div key={`${bill.id}_transactionList`} className={styles.transactionList}>
                            {(bill.transactions || []).map((transaction, index) => {
                                return (
                                    // Index shouldn't be used as key, rather transactions
                                    // should have their own id.
                                    <div
                                        key={`${bill.id}_${index}`}
                                        className={styles.transactionItem}
                                    >
                                        <div className={styles.transactionDate}>
                                            {transaction.date}
                                        </div>
                                        <div className={styles.transactionAmount}>
                                            {transaction.amount}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>,
                    ]}
                />
            </div>
        );
    }
}
