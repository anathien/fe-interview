import React from "react";
import { BillGridRow } from "../components/BillGridRow/BillGridRow";
import { getAllBills, changeBillFlag } from "./../utils/queryUtils";

import styles from "./SectionStyles.css";

type Props = {
    viewType: string,
};

type State = {
    bills: Array<Object>,
};

export const BILL_VIEW = {
    BILLS_ONLY: "bills_only_view",
    POTENTIAL_BILLS_ONLY: "potential_bills_only",
};

export class BillSection extends React.Component<Props, State> {
    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            bills: [],
        };
    }

    componentDidMount() {
        let bills;

        // Note: as the utils always return an array, we don't need a catch
        getAllBills().then(result => {
            this.setState({
                bills: result || [],
            });
        });
    }

    filterForBills = item => {
        return item.isBill === true;
    };

    filterForPotentialBills = item => {
        return item.isBill !== true;
    };

    handleChangeBillFlag = bill => {
        // Note: Spinners could be added on top of the list here (and removed once the request came
        // back, but this local db update doesn't warrant it at the moment.
        changeBillFlag(bill).then(newBills => {
            this.setState({
                bills: newBills,
            });
        });
    };

    render() {
        let filterFunction;
        let buttonText;

        if (this.props.viewType === BILL_VIEW.BILLS_ONLY) {
            filterFunction = this.filterForBills;
            buttonText = "Remove bill";
        } else {
            filterFunction = this.filterForPotentialBills;
            buttonText = "Add as bill";
        }

        return (
            <div className={styles.gridList}>
                {this.state.bills.filter(filterFunction).map(bill => {
                    return (
                        <BillGridRow
                            key={bill.id}
                            bill={bill}
                            buttonText={buttonText}
                            onActionButtonClicked={this.handleChangeBillFlag}
                        />
                    );
                })}
            </div>
        );
    }
}
