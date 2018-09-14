import React from "react";
import { BillGridRow } from "../components/BillGridRow/BillGridRow";
import { getAllBills } from "./../utils/queryUtils";

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
                    return <BillGridRow key={bill.id} bill={bill} buttonText={buttonText} />;
                })}
            </div>
        );
    }
}
