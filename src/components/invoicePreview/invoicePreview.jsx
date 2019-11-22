import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table'

class InvoicePreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // productInfo:{}
            product: "jakis",
            rate: "",
            qty: "",
            unit: "",
            vat: "",
            subtotal: "",
            grossPrice: ''
        }
    }


    render() {

        return (
            <div className='popup'>
                <div className='popup_inner'>

                    <button onClick={this.props.closePopup}>ZAMKNIJ</button>
                    {/*<button onClick={this.handleShowData}>open me</button>*/}

                    <div>

                        <table>
                            <tbody>
                            {this.props.rowData.map((el, i) => {
                                return (
                                    <tr style={{color: "blue"}}>
                                        <td>{el.product}</td>
                                        <td>{el.rate}</td>
                                        <td>{el.qty}</td>
                                        <td>{el.unit}</td>
                                        <td>{el.vat}</td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>

                    </div>
                    <Container style={{
                        fontSize: "12px"
                    }}>
                        <Row style={{marginBottom: "50px"}}>
                            <Col sm={4} style={{textAlign: "left"}}>Faktura VAT nr: 2019-11-11</Col>
                            <Col sm={{span: 4, offset: 4}}>LOGO </Col>

                        </Row>
                        <Row>
                            <Col sm={5} style={{textAlign: "left"}}>
                                <ul style={{listStyleType: "none", textAlign: "left"}}>
                                    <li>Miejsce wystawienia: Wraszawa</li>
                                    <li>Data wystawienia: 2019-12-12</li>
                                    <li>Data sprzedaży: 2019-12-01</li>
                                </ul>
                            </Col>
                            <Col> </Col>
                        </Row>
                        <Row>
                            <Col sm={4} style={{textAlign: "left"}}>
                                <span>Sprzedawca:</span>
                                <ul style={{listStyleType: "none"}}>
                                    <li>Nazwa/Firma: Nazwa</li>
                                    <li>Adres: ul.Jana Kazimierza 28
                                        01-248, Wraszawa
                                    </li>
                                    <li>NIP: 123-123-11-22</li>
                                </ul>


                            </Col>
                            <Col sm={{span: 4, offset: 2}} style={{textAlign: "left"}}>

                                <span>Nabywca: </span>
                                <ul style={{listStyleType: "none"}}>
                                    <li>Nazwa/Firma: Nazwa</li>
                                    <li>Adres: ul.Jana Kazimierza 28
                                        01-248, Wraszawa
                                    </li>
                                    <li>NIP: 123-123-11-22</li>
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
                            <tr>
                                <td>Pies</td>
                                <td>12</td>
                                <td>1</td>
                                <td>szt</td>
                                <td>23%</td>
                                <td>12</td>
                                <td>13.45</td>
                            </tr>


                            <tr>
                                <td colSpan="5"></td>
                                <td>SUMA NETTO:</td>
                                <td>123</td>
                            </tr>

                            <tr>
                                <td colSpan="5"></td>
                                <td>SUMA:</td>
                                <td>125</td>
                            </tr>
                            </tbody>
                            <tfoot>

                            </tfoot>
                        </Table>
                        <Row>
                            <Col style={{textAlign:"left", backgroundColor:"grey"}}> <p style={{textDecoration:"underline", fontWeight:"bold"}}>Do zapłaty: <span style={{textDecoration:"none"}}>1230zl</span></p> </Col>

                        </Row>
                        <Row style={{marginTop:"50px"}}>
                            <Col lg={"3"}> <hr style={{color:"black"}}/></Col>
                            <Col lg={{span:3, offset:6}}> <hr style={{color:"black"}}/></Col>

                        </Row>
                        <Row>
                        <Col lg={"3"}> Osoba upoważniona do wystawiania </Col>
                        <Col lg={{span:3, offset:6}}> Osoba upoważniona do odbioru</Col>

                    </Row>
                    </Container>
                </div>
            </div>
        )
            ;
    }
}

export default InvoicePreview;