import React from "react";
import { render } from "react-dom";
import { BillView } from "./views/BillView";

import "./styles/styles.css";

// export class AlignedRowChart extends React.Component<Props, State> {

class App extends React.Component {
    render() {
        return <BillView />;
    }
}

render(<App />, document.getElementById("app"));
