import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import {db} from "../../db/dbconfig";
import *  as firebase from 'firebase';
import moment from 'moment';





class InvoicePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            product: "jakis",
            rate: "",
            qty: "",
            unit: "",
            vat: "",
            subtotal: "",
            grossPrice: '',
            productData: {},
            invoice: "",
            invoiceNumber: "",
            date: "",
            address: "",
            terms: "",
            businessName: "",
            businessNumber: "",
            businessAddress: "",
            businessCity: "",
            businessPostalCode: "",
            businessSignature: "",
            businessLogo: "",

            clientName: "",
            clientNumber: "",
            clientAddress: "",
            clientCity: "",
            clientPostalCode: "",
            clientSignature: "",

            myCompAddress: "",
            myCompSignature: ""

        }
    }

    componentDidMount() {
        console.log("Invoice preview: myInvoiceData=", this.props.myInvoiceData);
        let el = this.props.myInvoiceData;
        console.log(el, "el");
        this.setState({
            ...el,
            date: el.date.format('YYYY-MM-DD').toString(),
            terms: el.terms.format('YYYY-MM-DD').toString()
        });
        console.log(el.address, "el address");

// wszystkie dane mojej firmy:
        db.collection('myCompData').doc("myCompanyDataRecord").get().then(
            doc => {
                console.log('myCompData: ', doc.data());
                this.setState(doc.data());
            }
        );

        // let personalInfo=Object.values(this.state.myCompData);


    }


    render() {

        return (
            <div className='popup'>
                <Button variant="dark" onClick={this.props.closePopup}>ZAMKNIJ</Button>
                <div className='popup_inner'>


                    <Container style={{
                        fontSize: "12px"
                    }}>
                        <Row style={{marginBottom: "50px"}}>
                            <Col sm={4}
                                 style={{
                                     textAlign: "left",
                                     fontSize: "18px",
                                     fontWeight: "bold"
                                 }}>{this.state.invoice} nr: {this.state.invoiceNumber}</Col>
                            <Col sm={{span: 4, offset: 4}}>{this.state.businessLogo}</Col>

                        </Row>
                        <Row>
                            <Col sm={5} style={{textAlign: "left"}}>
                                <ul style={{listStyleType: "none", textAlign: "left"}}>
                                    <li><span
                                        className={"invoiceHeader"}>Miejsce wystawienia:</span>{this.state.address}</li>
                                    <li><span className={"invoiceHeader"}>Data wystawienia:</span> {this.state.date}
                                    </li>
                                    <li><span className={"invoiceHeader"}>Data sprzedaży:</span> {this.state.terms}</li>
                                </ul>
                            </Col>
                            <Col> </Col>
                        </Row>
                        <Row>
                            <Col sm={4} style={{textAlign: "left"}}>
                                <span style={{textDecoration: "underline", fontWeight: "bold"}}>Sprzedawca </span>
                                <ul style={{listStyleType: "none"}}>
                                    <li><span className={"invoiceHeader"}>Nazwa/ Firma:</span> {this.state.businessName}
                                    </li>
                                    <li><span className={"invoiceHeader"}>Adres:</span>
                                        <ul style={{listStyleType: "none"}}>
                                            <li>{this.state.businessAddress}</li>
                                            <li>{this.state.businessCity}, {this.state.businessPostalCode}
                                            </li>
                                        </ul>
                                    </li>
                                    <li><span className={"invoiceHeader"}>NIP:</span> {this.state.businessNumber}</li>
                                    <li><span
                                        className={"invoiceHeader"}>Numer konta:</span> {this.state.businessBankAccountNum}
                                    </li>
                                </ul>


                            </Col>
                            <Col sm={{span: 4, offset: 2}} style={{textAlign: "left"}}>

                                <span style={{textDecoration: "underline", fontWeight: "bold"}}>Nabywca: </span>
                                <ul style={{listStyleType: "none"}}>
                                    <li><span className={"invoiceHeader"}>Nazwa/ Firma: </span>
                                        {this.state.clientName}</li>
                                    <li><span className={"invoiceHeader"}>Adres:</span>
                                        <ul style={{listStyleType: "none"}}>

                                            <li>{this.state.clientAddress}</li>
                                            <li>{this.state.clientCity}, {this.state.clientPostalCode}</li>
                                        </ul>
                                    </li>

                                    <li><span className={"invoiceHeader"}>NIP: </span>
                                        {this.state.clientNumber}</li>
                                </ul>
                            </Col>
                        </Row>
                        <Table style={{padding: "14px"}} bordered>


                            <thead style={{backgroundColor: "grey", color: "white"}}>

                            <tr>
                                <th>Nazwa usługi</th>
                                <th>Cena</th>
                                <th>Ilość</th>
                                <th>Jednostka miary</th>
                                <th>Stawka VAT</th>
                                <th>Kwota Netto</th>
                                <th>Kwota Brutto</th>
                            </tr>
                            </thead>

                            <tbody>

                            {this.props.productData.map((el, i) => {

                                return (
                                    <tr>
                                        <td>{el.product}</td>
                                        <td>{el.rate}</td>
                                        <td>{el.qty}</td>
                                        <td>{el.unit}</td>
                                        <td>{el.vat}</td>
                                        <td>{el.subtotal}</td>
                                        <td>{el.grossPrice}</td>
                                    </tr>
                                )
                            })}


                            <tr>
                                <td colSpan="5"></td>
                                <td>SUMA:</td>
                                <td>{this.state.mainGrossPrice}</td>
                            </tr>
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                        <Row style={{margin: "0"}}>
                            <Col style={{textAlign: "left", backgroundColor: "grey"}}><p
                                style={{textDecoration: "underline", fontWeight: "bold", padding: "0", margin: "0"}}>Do
                                zapłaty: <span
                                    style={{textDecoration: "none"}}>{this.state.mainGrossPrice}</span></p></Col>

                        </Row>

                        <Row style={{marginTop: "70px", marginLeft: "0", marginRight: "0"}}>
                            <Col lg={"3"}> {this.state.businessSignature}</Col>
                            <Col lg={{span: 3, offset: 6}}> {this.state.clientSignature}</Col>

                        </Row>
                        <Row style={{margin: "0"}}>
                            <Col lg={"3"} className={"underlineText"}>
                                <span className={"invoiceHeader"}>Osoba upoważniona do
                                wystawiania </span>
                            </Col>
                            <Col lg={{span: 3, offset: 6}} className={"underlineText"}><span
                                className={"invoiceHeader"}> Osoba upoważniona do
                                odbioru
                            </span>
                            </Col>

                        </Row>
                    </Container>
                </div>

            </div>
        )

    }
}

export default InvoicePreview;