const express = require('express');
// const orm_registerPatient = require('../../ORM/ORM_registerPatient');
const cookie = require('../../authentication/cookie_checker');
require('dotenv').config();
const {createMedicalHistoryEntries} = require('../../controllers/intern_tab_controllers/createMedEntriesController'); // Import the patientRegisterController function


const router = express.Router({mergeParams : true});


router.post('/api/v0/add_medical_history', async (req, res) => { //post->get
    // console.log("Backend: requested-> /api/v0/search_patient");
    // req_json = req.body;
    console.log(req);
    const pseudo_view = await createMedicalHistoryEntries(req);
    if(pseudo_view) {
        console.log(pseudo_view);
        res.status(200).json({message : 'Success', data : pseudo_view});
    }
    else {
        res.status(404).json({error : 'Not Found'});
    }
});

module.exports = router;