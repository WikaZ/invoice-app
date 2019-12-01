import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

class AddClientForm extends React.Component {
    constructor(props) {
        super(props);


    }

    passMyInvoiceData = (values) => {

        let el = {...values};
        console.error(el);
        db.collection("clients").doc(values.clientNumber).set(el)
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    };


    render() {

        return (
            <div className={"addClientForm"}>
                <h1>Dane nowego klienta:</h1>
                <Formik
                    initialValues={{
                        clientName: '',
                        clientNumber: '',
                        clientAddress: "",
                        clientCity: "",
                        clientPostalCode: "",
                        clientSignature: "",

                    }}


                    validate={values => {
                        let errors = {};
                        if (!values.clientName) {
                            errors.clientName = 'Proszę wpisac imię';
                        }

                        if (!values.clientNumber) {
                            errors.clientNumber = 'Required';
                        } else if (!/^[0-9]{10}$/g.test(values.clientNumber)) {
                            errors.clientNumber = 'Niepoprawny NIP';
                        }

                        if (!values.clientAddress) {
                            errors.clientAddress = 'Required';
                        } else if (values.clientAddress.length < 5) {
                            errors.clientAddress = 'Adres musi zawierać więcej niż 5 znaków';
                        }
                        if (!values.clientCity) {
                            errors.clientCity = 'Required';
                        } else if (values.clientCity.length < 1) {
                            errors.clientCity = 'Prosze wpisac nazwę miasta';
                        }

                        if (!values.clientPostalCode) {
                            errors.clientPostalCode = 'Required';
                        } else if (!/^[0-9]{2}-[0-9]{3}$/g.test(values.clientPostalCode)) {
                            errors.clientPostalCode = 'Nieprawidłowy kod pocztowy';
                        }

                        if (!values.clientSignature) {
                            errors.clientSignature = 'Required';
                        } else if (!/^[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}\s[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}$/ig.test(values.clientSignature)) {
                            errors.clientSignature = 'Proszę pwisać Imię i Nazwisko klienta';
                        }
                        console.log(errors, "errors");

                        return errors;


                    }

                    }

                    onSubmit={(values, {setSubmitting}) => {
                        setTimeout(() => {

                            alert(JSON.stringify(values, null, 2));
                            console.log(values, "values in onsubmit");
                            console.log(Object.keys(values), "keys");
                            Object.values(values).forEach((el) => {
                                console.log(el, "obj value");
                            });
                            this.passMyInvoiceData(values);
                            this.props.handleTogglePopup();
                            setSubmitting(false);


                        }, 400);

                    }
                    }
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          onImageChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <Container>

                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"clientName"}>Nazwa Firmy:</label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="clientName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.clientName}
                                            placeholder={"twoja nazwa"}
                                        />
                                    </Col>
                                    {errors.clientName && touched.clientName && errors.clientName}
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"clientNumber"}>NIP:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="clientNumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.clientNumber}
                                            placeholder={"000 000 00 00"}
                                        /></Col>
                                    {errors.clientNumber && touched.clientNumber && errors.clientNumber}
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"clientAddress"}>Adres:</label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="clientAddress"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.clientAddress}
                                            placeholder={"ulica nr m"}
                                        /></Col>
                                    {errors.clientAddress && touched.clientAddress && errors.clientAddress}
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"clientCity"}>Miasto:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="clientCity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.clientCity}
                                            placeholder={"miasto"}
                                        /></Col>
                                    {errors.clientCity && touched.clientCity && errors.clientCity}
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"clientPostalCode"}>Kod Pocztowy:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="clientPostalCode"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.clientPostalCode}
                                            placeholder={"00-123"}
                                        /></Col>
                                    {errors.clientPostalCode && touched.clientPostalCode && errors.clientPostalCode}
                                </Row>

                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"clientSignature"}>Podpis:</label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="clientSignature"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.clientSignature}
                                            placeholder={"imię nazwisko"}
                                        /></Col>


                                    <span style={{
                                        color: "red",
                                        fontWeight: "bold"
                                    }}> {errors.clientSignature && touched.clientSignature && errors.clientSignature}</span>

                                </Row>

                                <Row>
                                    <Col md={12} xs={12} className={"alignSubmitBtn"}>
                                        <Button variant="secondary" type="submit" disabled={isSubmitting}
                                                className={"centeredBtn"}>

                                            Zapisz
                                        </Button>


                                    </Col>
                                </Row>
                            </Container>

                        </form>

                    )}


                </Formik>
            </div>
        )
    }

}


export default AddClientForm