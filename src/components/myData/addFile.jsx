import * as React from "react";

export class FileSelector extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    selectorFiles = "ala.jpg";

    handleChange(selectorFiles) {
        console.log(selectorFiles);
    }

    render() {
        return <div>
            <input type="file" onChange={(e) => this.handleChange(e.target.files)}/>
        </div>;
    }
}