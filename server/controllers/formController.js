import { mongoDBClient } from "../config/mongoConfig.js";

const createForm = async (req, res) => {
    try {
        //Get form details
        const { firstName, lastName, state, district, village, panNumber, adharNumber } = req.body;

        if(!firstName || !lastName || !state || !district || !village || !panNumber || !adharNumber)
            return res.status(400).json('enter required fields');

        //Get db to get collection
        const db = await mongoDBClient();
        const collection = db.collection('forms');

        //Insert a form details into DB
        const formDetails = {
            firstName: firstName,
            lastName: lastName,
            state: state,
            district: district,
            village: village,
            panNumber: panNumber,
            adharNumber: adharNumber
        };

        await collection.insertOne(formDetails);

        res.status(201).json({message: 'data inserted'});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error: " + error });
    }
}

export default {
    createForm
}