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
            productData:{},
            invoice: "",
            invoiceNumber: "",
            date: "",
            address: "",
            terms: "",
            businessName: "",
            businessNumber: "",
            businessAddress: "",
            businessPostalCode: "",
            businessSignature: "",
            clientName: "",
            clientNumber: "",
            clientAddress: "",
            clientPostalCode: "",
            clientSignature: ""



        }
    }

    componentDidMount() {
      let el=  Object.values(this.props.myInvoiceData);
      console.log(el, "el");
            this.setState({
                invoice: el[0],
                invoiceNumber: el[1],
                date: el[2].format('YYYY-MM-DD').toString(),
                address: el[3],
                terms: el[4].format('YYYY-MM-DD').toString(),
                businessName: el[5],
                businessNumber: el[6],
                businessAddress: el[7],
                businessPostalCode: el[8],
                businessSignature: el[9],
                clientName: el[10],
                clientNumber: el[11],
                clientAddress: el[12],
                clientPostalCode: el[13],
                clientSignature: el[14],
                // subtotal:el[],
                // grossPrice:el[],
                mainSubtotal:el[22],
        mainGrossPrice:el[23]
            })
        console.log(el.address, "el address");

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
                            <Col sm={4} style={{textAlign: "left"}}>{this.state.invoice} nr: {this.state.invoiceNumber}</Col>
                            <Col sm={{span: 4, offset: 4}}>LOGO </Col>

                        </Row>
                        <Row>
                            <Col sm={5} style={{textAlign: "left"}}>
                                <ul style={{listStyleType: "none", textAlign: "left"}}>
                                    <li>Miejsce wystawienia:{this.state.address}</li>
                                    <li>Data wystawienia: {this.state.date}</li>
                                    <li>Data sprzedaży: {this.state.terms}</li>
                                </ul>
                            </Col>
                            <Col> </Col>
                        </Row>
                        <Row>
                            <Col sm={4} style={{textAlign: "left"}}>
                                <span>Sprzedawca:</span>
                                <ul style={{listStyleType: "none"}}>
                                    <li>Nazwa/Firma: ...</li>
                                    <li>Adres:... , Wraszawa
                                    </li>
                                    <li>NIP:</li>
                                </ul>


                            </Col>
                            <Col sm={{span: 4, offset: 2}} style={{textAlign: "left"}}>

                                <span>Nabywca: </span>
                                <ul style={{listStyleType: "none"}}>
                                    <li>Nazwa/Firma: {this.state.clientName}</li>
                                    <li>Adres: <p>{this.state.clientAddress}</p>
                                        <p>{this.state.clientPostalCode}</p>, Wraszawa
                                    </li>
                                    <li>NIP:  {this.state.clientNumber}</li>
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
                                <td colSpan="5"> </td>
                                <td>SUMA:</td>
                                <td>{this.state.mainGrossPrice}</td>
                            </tr>
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                        <Row>
                            <Col style={{textAlign: "left", backgroundColor: "grey"}}><p
                                style={{textDecoration: "underline", fontWeight: "bold"}}>Do zapłaty: <span
                                style={{textDecoration: "none"}}>{this.state.mainGrossPrice}</span></p></Col>

                        </Row>
                        <Row style={{marginTop: "50px"}}>
                            <Col lg={"3"}>
                                <hr style={{color: "black"}}/>
                            </Col>
                            <Col lg={{span: 3, offset: 6}}>
                                <hr style={{color: "black"}}/>
                            </Col>

                        </Row>
                        <Row>
                            <Col lg={"3"}> Osoba upoważniona do wystawiania </Col>
                            <Col lg={{span: 3, offset: 6}}> Osoba upoważniona do odbioru</Col>

                        </Row>
                    </Container>
                </div>
            </div>
        )

    }
}

export default InvoicePreview;