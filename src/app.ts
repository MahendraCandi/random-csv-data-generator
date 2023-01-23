import { faker } from '@faker-js/faker';
import { unparse } from 'papaparse';
import Fs from 'fs';


const TOTAL_ROWS = 1000;
const PATH_FILE = "./";
const FILE_NAME = "random.csv";
const FULL_PATH = PATH_FILE + FILE_NAME;
faker.setLocale("id_ID"); // https://fakerjs.dev/guide/localization.html#available-locales

type resultType = {
    governmentId: string,
    firstMiddleLastName: string,
    fullName: string,
    phoneNumber: string,
    address: string
}

let mainProcess = (): resultType[]  => {
    console.log(`Start generate random csv data with total ${TOTAL_ROWS} rows\n`);

    // this object is only for printing the fields name (csv header)
    let printHeaderObject: resultType = {
        governmentId: "",
        firstMiddleLastName: "",
        fullName: "",
        phoneNumber: "",
        address: ""
    }
    console.log(`${Object.keys(printHeaderObject).join(",").replace("\"", "")}`); // print csv header

    let results: resultType[] = [];
    for (let i = 0; i < TOTAL_ROWS; i++) {

        // defined variables for csv values
        let governmentId = faker.phone.number('32##############');
        let firstMiddleLastName = `${faker.name.firstName()} ${faker.name.middleName()} ${faker.name.lastName()}`;
        let fullName = faker.name.fullName();
        let phoneNumber = faker.phone.number('08###########');
        let address = `${faker.address.street()} ${faker.address.cityName()}`;

        console.log(`${governmentId},${firstMiddleLastName},${fullName},${phoneNumber},${address}`); // print csv data

        let resultObject: resultType = {
            governmentId: governmentId,
            firstMiddleLastName: firstMiddleLastName,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address
        }

        results.push(resultObject);
    }
    return results;
}

let results = mainProcess();
let csvData = unparse(results);
Fs.writeFile(FULL_PATH, csvData, err => {
    if (err) {
        console.log(`\nError writing file to path ${FULL_PATH}`);
        console.log(err);
    } else {
        console.log(`\nSuccess writing file to path ${FULL_PATH}`)
    }
});
