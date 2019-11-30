import React from 'react';
import {db} from '../../db/dbconfig';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import Button from "react-bootstrap/Button";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class MyInvoiceData extends React.Component {
    constructor(props) {
        super(props);
        // this.fileInput = React.createRef();

    }

    passMyInvoiceData = (values) => {

        let el = {...values};
        console.error(el);
        db.collection("myCompData").doc("myCompanyDataRecord").set(el)
            .then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });

    };


    render() {

        return (
            <div  >
                <h1>Moje dane:</h1>
                <Formik
                    initialValues={{
                        businessName: '',
                        businessNumber: '',
                        businessAddress: "",
                        businessCity: "",
                        businessPostalCode: "",
                        businessSignature: "",
                        businessBankAccountNum: "",
                        businessLogo: ""
                    }}


                    validate={values => {
                        let errors = {};
                        if (!values.businessName) {
                            errors.businessName = 'Required';
                        }
                        // if (!values.businessLogo) {
                        //     errors.businessName = 'Proszę dodać logo';
                        // }
                        if (!values.businessNumber) {
                            errors.businessNumber = 'Required';
                        } else if (!/^[0-9]{10}$/g.test(values.businessNumber)) {
                            errors.businessNumber = 'Niepoprawny NIP';
                        }

                        if (!values.businessAddress) {
                            errors.businessAddress = 'Required';
                        } else if (values.businessAddress.length < 5) {
                            errors.businessAddress = 'Adres musi zawierać więcej niż 5 znaków';
                        }
                        if (!values.businessCity) {
                            errors.businessCity = 'Required';
                        } else if (values.businessCity.length < 1) {
                            errors.businessCity = 'Prosze wpisac nazwę miasta';
                        }

                        if (!values.businessPostalCode) {
                            errors.businessPostalCode = 'Required';
                        } else if (!/^[0-9]{2}-[0-9]{3}$/g.test(values.businessPostalCode)) {
                            errors.businessPostalCode = 'Nieprawidłowy kod pocztowy';
                        }
                        if (!values.businessBankAccountNum) {
                            errors.businessBankAccountNum = 'Required';
                        } else if (!/^[0-9]{26}$/g.test(values.businessBankAccountNum)) {
                            errors.businessBankAccountNum = 'Nice try!';
                        }

                        if (!values.businessSignature) {
                            errors.businessSignature = 'Required';
                        } else if (!/^[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}\s[a-zA-ZąĄćĆĘęŻżŹźŚśóÓŁłńŃ]{2,}$/ig.test(values.businessSignature)) {
                            errors.businessSignature = 'Proszę pwisać Imię i Nazwisko';
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
                            setSubmitting(false);


                        }, 400);

                        // console.log(' submitting', values)

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

                            <Container className={"myInvoiceData"}>
                                <h1 className={"myInvoiceDataStyle"}>Dane mojej firmy:</h1>
                                <Row >
                                    <Col lg={2} sm={2}></Col>

                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessName"}>Nazwa Firmy:</label>
                                    </Col>

                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessName}
                                            placeholder={"twoja nazwa"}
                                        />
                                        {errors.businessName && touched.businessName && errors.businessName}
                                    </Col>



                                    <Col lg={2} sm={2}></Col>
                                </Row>

                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessNumber"}>NIP:</label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessNumber"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessNumber}
                                            placeholder={"0000000000"}
                                        />
                                        {errors.businessNumber && touched.businessNumber && errors.businessNumber}
                                    </Col>
                                    <Col lg={2} sm={2}></Col>
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessAddress"}>Adres:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessAddress"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessAddress}
                                            placeholder={"ulica nr m"}
                                        />

                                        {errors.businessAddress && touched.businessAddress && errors.businessAddress}
                                    </Col>
                                    <Col lg={2} sm={2}></Col>
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessCity"}>Miasto:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessCity"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessCity}
                                            placeholder={"miasto"}
                                        />
                                        {errors.businessCity && touched.businessCity && errors.businessCity}
                                    </Col>
                                    <Col lg={2} sm={2}></Col>
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessPostalCode"}>Kod Pocztowy:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessPostalCode"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessPostalCode}
                                            placeholder={"00-123"}
                                        />
                                        {errors.businessPostalCode && touched.businessPostalCode && errors.businessPostalCode}
                                    </Col>
                                    <Col lg={2} sm={2}></Col>
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessLogo"}>Dodaj logo:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="file"
                                            name="businessLogo"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            ref={this.fileInput}

                                        />
                                        {errors.businessLogo && touched.businessLogo && errors.businessLogo}
                                    </Col>
                                    <Col lg={2} sm={2}></Col>
                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessSignature"}>Podpis:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessSignature"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessSignature}
                                            placeholder={"imię nazwisko"}
                                        />


                                        <span style={{
                                            color: "red",
                                            fontWeight: "bold"
                                        }}> {errors.businessSignature && touched.businessSignature && errors.businessSignature}</span>
                                    </Col>
                                    <Col lg={2} sm={2}></Col>

                                </Row>
                                <Row>
                                    <Col lg={2} sm={2}></Col>
                                    <Col lg={4} sm={4} className={"colStyle"}>
                                        <label htmlFor={"businessBankAccountNum"}>Numer konta:
                                        </label>
                                    </Col>
                                    <Col lg={4} sm={4} className={"mainFormInput"}>
                                        <input
                                            type="text"
                                            name="businessBankAccountNum"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.businessBankAccountNum}
                                            placeholder={"numer konta"}
                                        />
                                        {errors.businessBankAccountNum && touched.businessBankAccountNum && errors.businessBankAccountNum}
                                    </Col>
                                    <Col lg={2} sm={2}></Col>
                                </Row>
                                <Row>
                                    <Col md={12} xs={12} className={"alignSubmitBtn"} >
                                        <Button variant="secondary" type="submit" disabled={isSubmitting} className={"centeredBtn"}>
                                            Submit
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


export default MyInvoiceData